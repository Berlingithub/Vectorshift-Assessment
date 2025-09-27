// GitLoaderNode.js

import { useState } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import { NODE_TYPES } from "../utils/constants";
import InputBox from "../components/canvas/InputBox";
import CardInfo from "../components/canvas/CardInfo";

export const GitLoaderNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <NodeContainer
      heading="Git Loader"
      type={NODE_TYPES.gitLoader}
      id={id}
      inputHandles={["repo"]}
      outputHandles={["output"]}
      infoAvailable
    >
      <InputBox
        label="Repository"
        type={"url"}
        value={currText}
        onChange={handleTextChange}
      />
      <CardInfo text={"Pulls code from a Git repository."} />
    </NodeContainer>
  );
};