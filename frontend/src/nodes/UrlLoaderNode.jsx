// UrlLoaderNode.js

import { useState } from "react";
import NodeContainer from "../components/canvas/NodeContainer";
import { NODE_TYPES } from "../utils/constants";
import InputBox from "../components/canvas/InputBox";
import CardInfo from "../components/canvas/CardInfo";

export const UrlLoaderNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "");

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <NodeContainer
      heading="URL Loader"
      type={NODE_TYPES.urlLoader}
      id={id}
      inputHandles={["url"]}
      outputHandles={["output"]}
      infoAvailable
    >
      <InputBox
        label="URL"
        type={"url"}
        value={currText}
        onChange={handleTextChange}
      />
      <CardInfo text={"Reads data from a URL."} />
    </NodeContainer>
  );
};