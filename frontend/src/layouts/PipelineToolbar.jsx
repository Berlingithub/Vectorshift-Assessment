// toolbar.js

import { Search } from "lucide-react";
import { DraggableNode } from "../components/toolbar/DraggableNode";
import { SubmitButton } from "../components/toolbar/Submit";
import { useState, useMemo } from "react";

const nodeTypes = [
  { type: "customInput", label: "Input" },
  { type: "llm", label: "LLM" },
  { type: "customOutput", label: "Output" },
  { type: "text", label: "Text" },
  { type: "urlLoader", label: "URL" },
  { type: "gitLoader", label: "Git" },
  { type: "textToFile", label: "Text to File" },
  { type: "concatenate", label: "Concatenate" },
  { type: "openAI", label: "OpenAI" },
];

export const PipelineToolbar = () => {
  const [searchValue, setSearchValue] = useState("");

  const filteredNodes = useMemo(() => {
    if (!searchValue.trim()) return nodeTypes;
    return nodeTypes.filter((node) =>
      node.label.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue]);

  return (
    <div className="mx-auto max-w-screen-xl w-full flex justify-between gap-10 px-5 py-5 shadow overflow-auto rounded-lg">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <input
            className="w-full h-10 flex rounded-md bg-transparent py-3 text-sm outline-none border-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search Nodes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2.5 mt-5">
          {filteredNodes.map((node) => (
            <DraggableNode
              key={node.type}
              type={node.type}
              label={node.label}
            />
          ))}
        </div>
      </div>

      <SubmitButton />
    </div>
  );
};