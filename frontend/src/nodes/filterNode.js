// filterNode.js

import { Handle, Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const FilterNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Filter List">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-list`}
        style={{ top: "30%", background: "#F97316", width: 10, height: 10 }}
      />

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-condition`}
        style={{ top: "70%", background: "#F97316", width: 10, height: 10 }}
      />

      <p className="text-xs">Filters a list based on a condition.</p>
    </BaseNode>
  );
};
