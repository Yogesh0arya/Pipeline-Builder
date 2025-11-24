// /frontend/src/store.js (Updated with updateNodeField)

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {}, // Initialize nodeIDs map
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "deleteButtonEdge",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  // Function to update a field in a node's data
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // Special handling for dynamic handles in TextNode (Part 3)
          if (fieldName === "text") {
            const variables = (fieldValue.match(/{{(.*?)}}/g) || [])
              .map((v) => v.replace(/[{}]/g, "").trim())
              .filter((v, i, a) => a.indexOf(v) === i); // Extract and unique variables
            node.data = {
              ...node.data,
              [fieldName]: fieldValue,
              variables: variables,
            };
          } else {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
        }
        return node;
      }),
    });
  },
}));
