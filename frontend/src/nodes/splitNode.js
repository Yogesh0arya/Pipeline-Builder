// splitNode.js

import { Handle, Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const SplitNode = ({ id }) => {
  return (
    <BaseNode id={id} hasSource={false} title="Split Text">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{ top: "70%", background: "#F97316", width: 10, height: 10 }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-ouput21`}
        style={{ top: "30%", background: "#4CAF50", width: 10, height: 10 }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-ouput2`}
        style={{ top: "70%", background: "#4CAF50", width: 10, height: 10 }}
      />

      <p className="text-xs">Splits text by a delimiter.</p>
    </BaseNode>
  );
};
