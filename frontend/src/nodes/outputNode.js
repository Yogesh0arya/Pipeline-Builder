import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-value`,
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      handles={handles}
      className="output-node"
    >
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{ background: "#F97316", width: 10, height: 10 }}
      />

      <div className="flex flex-col gap-2">
        <div>
          <label className="block mb-1 text-[11px] font-medium">Name:</label>
          <input
            type="text"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="
              min-w-[200px] 
              px-2 
              py-1 
              border 
              border-gray-300 
              rounded 
              text-[11px]
              text-black
            "
          />
        </div>

        <div>
          <label className="block mb-1 text-[11px] font-medium">Type:</label>
          <select
            value={outputType}
            onChange={(e) => setOutputType(e.target.value)}
            className="
              w-full 
              px-2 
              py-1 
              border 
              border-gray-300 
              rounded 
              text-[11px]
              text-black
            "
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
