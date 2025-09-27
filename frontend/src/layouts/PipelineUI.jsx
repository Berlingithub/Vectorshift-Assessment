import React, { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import { InputNode } from "../nodes/InputNode";
import { LLMNode } from "../nodes/LLMNode";
import { OutputNode } from "../nodes/OutputNode";
import { TextNode } from "../nodes/TextNode";
import { UrlLoaderNode } from "../nodes/UrlLoaderNode";
import { GitLoaderNode } from "../nodes/GitLoaderNode";
import { TextToFileNode } from "../nodes/TextToFileNode";
import { ConcatenateNode } from "../nodes/ConcatenateNode";
import { OpenAINode } from "../nodes/OpenAINode";
import CustomEdge from "../components/canvas/CustomEdge";
import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  urlLoader: UrlLoaderNode,
  gitLoader: GitLoaderNode,
  textToFile: TextToFileNode,
  concatenate: ConcatenateNode,
  openAI: OpenAINode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateNodeField: state.updateNodeField,
});

const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeField,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    // Initialize default data based on node type
    const baseData = { id: nodeID, type, label: type };
    
    // Add type-specific default data
    switch (type) {
      case 'text':
        return { ...baseData, text: '{{input}}', variables: ['input'] };
      case 'llm':
        return { ...baseData, model: 'gpt-3.5-turbo', temperature: 0.7 };
      case 'customInput':
        return { ...baseData, inputName: 'input', value: '' };
      case 'customOutput':
        return { ...baseData, outputName: 'output' };
      case 'concatenate':
        return { ...baseData, separator: ', ', inputCount: 2 };
      default:
        return baseData;
    }
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = event?.dataTransfer?.getData("application/reactflow");
      
      if (!appData) return;
      
      try {
        const { nodeType } = JSON.parse(appData);
        if (!nodeType) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(nodeType);
        const newNode = {
          id: nodeID,
          type: nodeType,
          position,
          data: getInitNodeData(nodeID, nodeType),
        };

        addNode(newNode);
      } catch (error) {
        console.error("Error adding node:", error);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: "100%", height: "75vh" }}
      className="bg-gray-50 rounded-lg border"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        proOptions={proOptions}
        snapToGrid={true}
        snapGrid={[gridSize, gridSize]}
        fitView
        attributionPosition="bottom-right"
      >
        <Background color="#94a3b8" gap={gridSize} />
        <Controls />
        <MiniMap position="bottom-right" zoomable pannable />
      </ReactFlow>
    </div>
  );
};

export { PipelineUI };