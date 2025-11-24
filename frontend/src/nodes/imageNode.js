// imageNode.js

import { BaseNode } from "./BaseNode";
import { Handle, Position } from "reactflow";

export const ImageNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Image Generator">
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-image`}
        style={{ top: "30%", background: "#F97316", width: 10, height: 10 }}
      />

      <p className="text-xs">Generates an image from a prompt.</p>

      {/* Overriding default source with a custom image handle */}
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-source`}
        style={{ top: "70%", background: "#F97316", width: 10, height: 10 }}
      />
    </BaseNode>
  );
};
