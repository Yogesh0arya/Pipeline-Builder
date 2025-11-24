// dataInputNode.js

import { BaseNode } from "./BaseNode";
import { Handle, Position } from "reactflow";

export const DataInputNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Data Source" hasSource={true}>
      <p className="text-xs">Input from a data source (e.g., CSV).</p>
    </BaseNode>
  );
};
