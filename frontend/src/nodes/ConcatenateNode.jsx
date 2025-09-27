import { useState, useEffect } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import { NODE_TYPES } from "../utils/constants";

export const ConcatenateNode = ({ id, data, onDataChange }) => {
  const [separator, setSeparator] = useState(data?.separator || ", ");
  const [inputCount, setInputCount] = useState(data?.inputCount || 2);

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        ...data,
        separator,
        inputCount: parseInt(inputCount, 10) || 2
      });
    }
  }, [separator, inputCount, data, onDataChange]);

  const handleSeparatorChange = (e) => {
    setSeparator(e.target.value);
  };

  const handleInputCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 2;
    setInputCount(Math.max(2, Math.min(10, count))); // Limit between 2-10 inputs
  };

  const inputHandles = Array.from({ length: inputCount }, (_, i) => ({
    id: `input${i + 1}`,
    label: `Input ${i + 1}`,
    type: 'target'
  }));

  const outputHandles = [
    {
      id: 'output',
      label: 'Output',
      type: 'source'
    }
  ];

  return (
    <NodeContainer
      heading="Concatenate"
      type={NODE_TYPES.concatenate}
      id={id}
      data={data}
      inputHandles={inputHandles}
      outputHandles={outputHandles}
      infoAvailable
    >
      <div className="space-y-2 p-2">
        <div>
          <label 
            htmlFor={`${id}-separator`} 
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Separator
          </label>
          <input
            id={`${id}-separator`}
            type="text"
            value={separator}
            onChange={handleSeparatorChange}
            className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter separator (e.g., , or |)"
          />
        </div>
        <div>
          <label 
            htmlFor={`${id}-inputCount`} 
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            Number of Inputs (2-10)
          </label>
          <input
            id={`${id}-inputCount`}
            type="number"
            min="2"
            max="10"
            value={inputCount}
            onChange={handleInputCountChange}
            className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </NodeContainer>
  );
};
