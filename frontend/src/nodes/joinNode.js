// joinNode.js

import { Handle, Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const JoinNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Join Text" hasSource={true}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input-1`}
        style={{ top: "30%", background: "#F97316", width: 10, height: 10 }}
      />

      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input-2`}
        style={{ top: "70%", background: "#F97316", width: 10, height: 10 }}
      />

      <p className="text-xs">Joins two text inputs.</p>
    </BaseNode>
  );
};
