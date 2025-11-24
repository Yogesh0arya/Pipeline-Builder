// /frontend/src/nodes/NodeWrapper.js

import React from "react";
import { useStore } from "../store";
import { shallow } from "zustand/shallow";

// Define the component selector once
const selector = (state) => state.updateNodeField;

// This wrapper intercepts the node data and injects the store function
export const NodeWrapper = (NodeComponent) => {
  // The inner component receives all standard React Flow props (id, data, etc.)
  const WrappedNode = (props) => {
    // Access the function from the global store
    const updateNodeField = useStore(selector, shallow);

    // Render the actual node component, injecting the function
    return (
      <NodeComponent
        {...props}
        updateNodeField={updateNodeField} // <-- Inject the function here
      />
    );
  };

  // Give it a recognizable name for debugging
  WrappedNode.displayName = `Wrapped${
    NodeComponent.displayName || NodeComponent.name
  }`;

  return WrappedNode;
};
