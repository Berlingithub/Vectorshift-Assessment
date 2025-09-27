// TextToFileNode.js

import { useState } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import { FILE_INPUT_OPTIONS, NODE_TYPES } from "../utils/constants";
import SelectBox from "../components/canvas/SelectBox";

export const TextToFileNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(data.inputType || "pdf");

  const handleTypeChange = (value) => {
    setInputType(value);
  };

  return (
    <NodeContainer
      heading="Text To File"
      type={NODE_TYPES.textToFile}
      id={id}
      inputHandles={["Text"]}
      outputHandles={["File"]}
      infoAvailable
    >
      <SelectBox
        label="File Type"
        options={FILE_INPUT_OPTIONS}
        value={inputType}
        onChange={handleTypeChange}
      />
    </NodeContainer>
  );
};