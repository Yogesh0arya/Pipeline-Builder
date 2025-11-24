//BaseNode.js

import React from "react";
import { Handle, Position, useStore } from "reactflow";

// Base styling for all nodes
const nodeStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "2px solid #3B82F6", // Unified blue border
  backgroundColor: "#1F2937", // Dark background for the node
  color: "#E5E7EB", // Light text color
  minWidth: "200px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const useDeleteNode = () => {
  // When using React Flow hooks outside of a React Flow context,
  // it's safest to rely on the global state change handler from your store.
  const onNodesChange = useStore((state) => state.onNodesChange);
  return (nodeId) => {
    // Trigger a 'remove' change event for the specified node
    onNodesChange([{ id: nodeId, type: "remove" }]);
  };
};

// Base component for all nodes
export const BaseNode = ({ id, title, children, hasSource = true }) => {
  const deleteNode = useDeleteNode(); // Get the delete function

  const handleDelete = (e) => {
    e.stopPropagation(); // Prevent drag events when clicking the button
    deleteNode(id);
  };

  return (
    <div
      className="
        p-3 rounded-lg border-2 border-blue-500 
        bg-gray-800 text-gray-200 min-w-[200px]
        shadow-md active:border-green-400
      "
    >
      <button
        className="absolute top-3 right-3 border-2 rounded-full w-7 h-7 text-xs border-blue-500 hover:bg-red-500"
        onClick={handleDelete}
      >
        X
      </button>
      <div
        className="
          font-bold mb-2 border-b border-gray-700 pb-1
        "
      >
        {title}
      </div>

      {/* Content specific to the node type */}
      <div className="min-h-[50px]">{children}</div>

      {/* Default Source Handle (Output) */}
      {hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          id={`${id}-output`}
          style={{ background: "#4CAF50", width: 10, height: 10 }}
        />
      )}
    </div>
  );
};
