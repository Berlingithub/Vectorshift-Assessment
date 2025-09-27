import React from "react";
import { Handle, Position } from "reactflow";
import { Card, CardContent } from "../ui/Card";
import NodeHeading from "./NodeHeading";
import { cn } from "../../utils/styles";

const NodeContainer = ({
  className = "",
  heading,
  type,
  id,
  infoAvailable,
  inputHandles = [],
  outputHandles = [],
  children,
}) => {
  // Normalize handles to always be in object format
  const normalizeHandle = (handle) => {
    if (typeof handle === 'string') {
      return { id: handle, label: handle, type: 'target' };
    }
    return {
      id: handle.id || '',
      label: handle.label || handle.id || '',
      type: handle.type || 'target'
    };
  };

  const normalizedInputHandles = inputHandles.map(normalizeHandle);
  const normalizedOutputHandles = outputHandles.map(normalizeHandle);

  return (
    <Card
      className={cn(
        "min-w-[300px] relative transition-shadow duration-200 ease-in-out hover:shadow-[0_0_15px_RGBA(255,156,14,1)]",
        className
      )}
    >
      {/* Input Handles */}
      {normalizedInputHandles.map((input, index) => (
        <div
          key={`input-${input.id}-${index}`}
          className="absolute left-[-5px]"
          style={{
            top: `${((index + 1) / (normalizedInputHandles.length + 1)) * 100}%`,
            transform: "translateY(-50%)",
          }}
        >
          <Handle
            type={input.type === 'source' ? 'source' : 'target'}
            position={Position.Left}
            id={input.id}
          />
          <span className="z-10 absolute right-2 transform -translate-y-1/2 text-xs text-primary font-medium whitespace-nowrap">
            {input.label}
          </span>
        </div>
      ))}

      {/* Node Content */}
      <NodeHeading
        heading={heading}
        type={type}
        id={id}
        infoAvailable={infoAvailable}
      />
      <CardContent className="px-4 flex space-y-1 flex-col">
        {children}
      </CardContent>

      {/* Output Handles */}
      {normalizedOutputHandles.map((output, index) => (
        <div
          key={`output-${output.id}-${index}`}
          className="absolute right-[-5px]"
          style={{
            top: `${((index + 1) / (normalizedOutputHandles.length + 1)) * 100}%`,
            transform: "translateY(-50%)",
          }}
        >
          <Handle
            type={output.type === 'source' ? 'source' : 'target'}
            position={Position.Right}
            id={output.id}
          />
          <span className="z-10 absolute left-2 transform -translate-y-1/2 text-xs text-primary font-medium whitespace-nowrap">
            {output.label}
          </span>
        </div>
      ))}
    </Card>
  );
};

export default NodeContainer;