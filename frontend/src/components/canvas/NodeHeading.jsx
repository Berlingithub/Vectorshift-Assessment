import React from "react";

import { useStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import { CircleX, Info } from "lucide-react";
import { CardHeader, CardTitle } from "../ui/Card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/HoverCard";
import { ICONS } from "../../utils/constants";
import { cn } from "../../utils/styles";

const selector = (state) => ({
  removeNode: state.removeNode,
});

function NodeHeading({
  id = "",
  type = "customInput",
  heading = "Node",
  infoAvailable,
  infoContent = "Important Information",
  className = "",
}) {
  const { removeNode } = useStore(selector, shallow);

  const handleRemove = () => {
    if (!id) {
      return false;
    }

    removeNode(id);
  };

  return (
    <CardHeader className={cn("px-4", className)}>
      <CardTitle className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center space-x-1">
          {ICONS[type]}
          <p className="">{heading}</p>
        </div>

        <div className="flex space-x-2">
          {infoAvailable && (
            <HoverCard>
              <HoverCardTrigger>
                <Info className="cursor-pointer" size={18} />
              </HoverCardTrigger>
              <HoverCardContent>{infoContent}</HoverCardContent>
            </HoverCard>
          )}
          
          <button
            onClick={handleRemove}
            className="cursor-pointer rounded-lg hover:bg-secondary hover:shadow-[#f35d03_0px_0px_5px_2px] duration-100"
          >
            <CircleX size={18} />
          </button>
        </div>
      </CardTitle>
    </CardHeader>
  );
}

export default NodeHeading;