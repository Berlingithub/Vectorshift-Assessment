// llmNode.js

import { useState } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import InputBox from "../components/canvas/InputBox";
import { NODE_TYPES } from "../utils/constants";

export const LLMNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };
  return (
    <NodeContainer
      heading="LLM"
      type={NODE_TYPES.llm}
      id={id}
      inputHandles={["system", "prompt"]}
      outputHandles={["response"]}
      infoAvailable
    >
      <InputBox
        label="Text"
        type={"Text"}
        value={currText}
        onChange={handleTextChange}
      />
    </NodeContainer>
  );
};