// OpenAINode.js

import { useState } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import InputBox from "../components/canvas/InputBox";
import { NODE_TYPES, OPEN_AI_MODELS } from "../utils/constants";
import SelectBox from "../components/canvas/SelectBox";

export const OpenAINode = ({ id, data }) => {
  const [systemName, setSystemName] = useState("");
  const [promptName, setPromptName] = useState("");
  const [inputType, setInputType] = useState(
    data.inputType || "gpt_4_turbo_preview"
  );

  const handleSystemChange = (e) => {
    setSystemName(e.target.value);
  };

  const handlePromptChange = (e) => {
    setPromptName(e.target.value);
  };

  const handleTypeChange = (value) => {
    setInputType(value);
  };

  return (
    <NodeContainer
      heading="OpenAI LLM"
      type={NODE_TYPES.openAI}
      id={id}
      inputHandles={["system", "prompt"]}
      outputHandles={["response"]}
      infoAvailable
    >
      <InputBox
        label="System"
        type={inputType}
        value={systemName}
        onChange={handleSystemChange}
      />
      <InputBox
        label="Prompt"
        type={inputType}
        value={promptName}
        onChange={handlePromptChange}
      />
      <SelectBox
        label="Model"
        options={OPEN_AI_MODELS}
        value={inputType}
        onChange={handleTypeChange}
      />
    </NodeContainer>
  );
};