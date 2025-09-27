// useFetchPipeline.js
import { useState } from "react";

export const useFetchPipelineData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPipeline = async (nodes, edges, inputs = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      // Transform nodes and edges to match the expected backend format
      const transformedNodes = nodes.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data || {}
      }));

      const transformedEdges = edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        targetHandle: edge.targetHandle
      }));

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/pipelines/execute`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            nodes: transformedNodes, 
            edges: transformedEdges,
            inputs: inputs,
            values: { debug: true } // Enable debug to get intermediate results
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in fetchPipeline:", error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchPipeline, isLoading, error };
};