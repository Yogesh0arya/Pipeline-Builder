// /frontend/src/nodes/inputNode.js (Updated)

import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./BaseNode"; // Import the BaseNode

export const InputNode = ({ id, data, updateNodeField }) => {
  // Use a sensible default or data property
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, "inputName", e.target.value); // Persist change
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, "inputType", e.target.value); // Persist change
  };

  return (
    <BaseNode id={id} title="Input Node" hasSource={true}>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="
              nodrag 
              ml-1 
              w-[90%] 
              px-1 
              py-0.5 
              rounded 
              border 
              border-gray-700 
              bg-gray-700 
              text-gray-200
            "
          />
        </label>

        <label className="text-xs">
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="
              nodrag 
              ml-1 
              px-1 
              py-0.5 
              rounded 
              border 
              border-gray-700 
              bg-gray-700 
              text-gray-200
            "
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>

      {/* Additional source handle for the output value (uses the default one provided by BaseNode) */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
        className="bg-green-500 top-1/2"
      />
    </BaseNode>
  );
};
