// SemanticSearchNode.js

import { useState } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import { NODE_TYPES, SEMANTIC_SEARCH_OPTIONS } from "../utils/constants";
import SelectBox from "../components/canvas/SelectBox";

export const SemanticSearchNode = ({ id, data }) => {
  const [inputType, setInputType] = useState(
    data.inputType || "openai-text-embedding-3-small"
  );

  const handleTypeChange = (value) => {
    setInputType(value);
  };

  return (
    <NodeContainer
      heading="Semantic Search"
      type={NODE_TYPES.semanticSearch}
      id={id}
      inputHandles={["query", "documents"]}
      outputHandles={["result"]}
      infoAvailable
    >
      <SelectBox
        label="Model"
        options={SEMANTIC_SEARCH_OPTIONS}
        value={inputType}
        onChange={handleTypeChange}
      />
    </NodeContainer>
  );
};