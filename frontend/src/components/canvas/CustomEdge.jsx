import {
  BaseEdge,
  EdgeLabelRenderer,
  Position,
  getSmoothStepPath,
} from "reactflow";
import { useStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import { CircleX } from "lucide-react";

const selector = (state) => ({
  removeEdge: state.removeEdge,
});

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Right,
    targetX,
    targetY,
    targetPosition: Position.Left,
  });
  const { removeEdge } = useStore(selector, shallow);

  const handleRemove = () => {
    removeEdge(id);
  };

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <CircleX
          size={16}
          onClick={handleRemove}
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
          className={`absolute cursor-pointer pointer-events-auto rounded-lg hover:bg-secondary hover:shadow-[#f35d03_0px_0px_5px_2px]`}
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;