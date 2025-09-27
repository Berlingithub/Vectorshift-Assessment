from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from fastapi.middleware.cors import CORSMiddleware
from enum import Enum

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NodeType(str, Enum):
    TEXT = "text"
    LLM = "llm"
    CUSTOM_INPUT = "customInput"
    CUSTOM_OUTPUT = "customOutput"
    URL_LOADER = "urlLoader"
    GIT_LOADER = "gitLoader"
    TEXT_TO_FILE = "textToFile"
    CONCATENATE = "concatenate"
    OPEN_AI = "openAI"

class NodeData(BaseModel):
    text: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = None
    inputName: Optional[str] = None
    outputName: Optional[str] = None
    separator: Optional[str] = ", "
    inputCount: Optional[int] = 2
    variables: Optional[List[str]] = None
    value: Optional[Any] = None

class Node(BaseModel):
    id: str
    type: str
    data: NodeData

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    values: Optional[Dict[str, Any]] = {}

class PipelineExecutionRequest(Pipeline):
    inputs: Optional[Dict[str, Any]] = {}

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
async def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    
    graph = {node.id: [] for node in pipeline.nodes}
    inDegree = {node.id: 0 for node in pipeline.nodes}
    
    for edge in pipeline.edges:
        graph[edge.source].append(edge.target)
        inDegree[edge.target] += 1
    
    zero_inDegree_queue = [node_id for node_id in inDegree if inDegree[node_id] == 0]
    topo_sorted = []

    while zero_inDegree_queue:
        current = zero_inDegree_queue.pop(0)
        topo_sorted.append(current)

        for neighbor in graph[current]:
            inDegree[neighbor] -= 1
            if inDegree[neighbor] == 0:
                zero_inDegree_queue.append(neighbor)

    is_dag = len(topo_sorted) == num_nodes
    
    return {
        "num_nodes": num_nodes, 
        "num_edges": num_edges, 
        "is_dag": is_dag,
        "topological_sort": topo_sorted if is_dag else []
    }

async def process_node(node: Node, node_inputs: Dict[str, Any], node_outputs: Dict[str, Any]) -> Any:
    """Process a single node based on its type."""
    node_type = node.type
    node_id = node.id
    data = node.data.dict() if node.data else {}
    
    try:
        if node_type == NodeType.TEXT:
            # Simple text node
            text = data.get('text', '')
            # Replace variables in the text with their values
            if data.get('variables'):
                for var in data['variables']:
                    if var in node_inputs:
                        text = text.replace(f'{{{{{var}}}}}', str(node_inputs[var]))
            return text
            
        elif node_type == NodeType.CONCATENATE:
            # Concatenate node - combine all inputs with the specified separator
            separator = data.get('separator', ', ')
            input_count = data.get('inputCount', 2)
            
            # Get all inputs (input1, input2, etc.)
            inputs = []
            for i in range(1, input_count + 1):
                input_key = f'input{i}'
                if input_key in node_inputs:
                    inputs.append(str(node_inputs[input_key]))
            
            return separator.join(inputs)
            
        # Add other node type handlers here
        
        return None
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing node {node_id} (type: {node_type}): {str(e)}"
        )

@app.post('/pipelines/execute')
async def execute_pipeline(request: PipelineExecutionRequest):
    # First, validate the pipeline
    parse_result = await parse_pipeline(request)
    if not parse_result["is_dag"]:
        raise HTTPException(status_code=400, detail="Pipeline is not a valid DAG")
    
    # Initialize node outputs
    node_outputs = {}
    
    # Process nodes in topological order
    for node_id in parse_result["topological_sort"]:
        # Find the node in the request
        node = next((n for n in request.nodes if n.id == node_id), None)
        if not node:
            continue
        
        # Get inputs for this node
        node_inputs = {}
        for edge in request.edges:
            if edge.target == node_id:
                # Get the output from the source node
                source_output = node_outputs.get(edge.source, {})
                
                # If there's a sourceHandle, it means we need to get a specific output
                if edge.sourceHandle and isinstance(source_output, dict):
                    node_inputs[edge.targetHandle or 'input'] = source_output.get(edge.sourceHandle, '')
                else:
                    # Otherwise, use the entire output
                    node_inputs[edge.targetHandle or 'input'] = source_output
        
        # Add any explicit inputs from the request
        if request.inputs and node_id in request.inputs:
            node_inputs.update(request.inputs[node_id])
        
        # Process the node
        try:
            output = await process_node(node, node_inputs, node_outputs)
            node_outputs[node_id] = output
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error executing node {node_id}: {str(e)}"
            )
    
    # Find the output node(s) - nodes with no outgoing edges
    output_nodes = [
        node for node in request.nodes 
        if not any(edge.source == node.id for edge in request.edges)
    ]
    
    # Prepare the result
    result = {
        "outputs": {},
        "intermediate": {}
    }
    
    # Add outputs from output nodes
    for node in output_nodes:
        if node.id in node_outputs:
            result["outputs"][node.id] = node_outputs[node.id]
    
    # Add all intermediate results if needed
    if request.values.get("debug", False):
        result["intermediate"] = node_outputs
    
    return result