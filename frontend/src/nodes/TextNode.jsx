// textNode.js

import { useState, useRef, useEffect } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import { NODE_TYPES } from "../utils/constants";
import { Textarea } from "../components/ui/Textarea";
import { useUpdateNodeInternals } from "reactflow";
import { useStore } from "../store/store";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "{{input}}");
  const [handles, setHandles] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Extract variables from text
  const extractVariables = (inputText) => {
    const regex = /\{\{(.*?)\}\}/g;
    const matches = [];
    let match;
    
    while ((match = regex.exec(inputText)) !== null) {
      matches.push(match[1]);
    }
    
    return matches;
  };

  // Update handles when text changes
  useEffect(() => {
    const variables = extractVariables(text);
    setHandles(variables);
    updateNodeField(id, 'text', text);
    updateNodeField(id, 'variables', variables);
    updateNodeInternals(id);
  }, [text, id, updateNodeField, updateNodeInternals]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <NodeContainer
      heading="Text"
      type={NODE_TYPES.text}
      id={id}
      inputHandles={handles}
      outputHandles={["output"]}
      infoAvailable
    >
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        className="w-full min-h-[60px] resize-none"
        placeholder="Enter text here..."
        style={{ minHeight: '60px' }}
      />
      {handles.length > 0 && (
        <div className="text-xs text-muted-foreground mt-1">
          Variables: {handles.join(', ')}
        </div>
      )}
    </NodeContainer>
  );
};

export default TextNode;