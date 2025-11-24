// DeleteEdgeButton.js

import React, { useCallback } from "react";
import { useStore } from "../store";
import { BaseEdge, getBezierPath, EdgeLabelRenderer } from "reactflow";

export const DeleteEdgeButton = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  markerEnd,
}) => {
  // 1. Get the path coordinates
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // 2. Access the edge change handler from the store
  const onEdgesChange = useStore((state) => state.onEdgesChange);

  // 3. Define the deletion handler
  const onEdgeClick = useCallback(() => {
    // Send a 'remove' change event for this specific edge ID
    onEdgesChange([{ id: id, type: "remove" }]);
  }, [id, onEdgesChange]);

  return (
    <>
      {/* Standard Edge Path (Styling is based on your theme) */}
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        className="stroke-blue-500 stroke-2" // Tailwind stroke styling
      />

      {/* Renderer for the clickable button in the middle of the edge */}
      <EdgeLabelRenderer>
        <button
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="
            nodrag 
            nopan 
            w-5 
            h-5 
            rounded-full 
            bg-red-500 
            text-white 
            text-sm 
            leading-none 
            shadow-md 
            cursor-pointer 
            flex 
            items-center 
            justify-center
          "
          onClick={onEdgeClick}
          title="Delete Edge"
        >
          &times;
        </button>
      </EdgeLabelRenderer>
    </>
  );
};
