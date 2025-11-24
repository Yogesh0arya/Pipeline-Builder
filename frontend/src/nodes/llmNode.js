import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      className: "top-[33.3333%]", // Converted from style top: 100/3%
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      className: "top-[66.6667%]", // Converted from style top: 200/3%
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      className: "top-1/2", // Optional default source handle
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
      className="llm-node"
    >
      <div className="text-gray-500 text-[11px]">
        Configure your language model settings
      </div>
    </BaseNode>
  );
};
