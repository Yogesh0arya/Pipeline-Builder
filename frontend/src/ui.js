// Displays the drag-and-drop UI

import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
// Import all node components
import { InputNode } from "./nodes/inputNode";
import { LLMNode } from "./nodes/llmNode";
import { OutputNode } from "./nodes/outputNode";
import { TextNode } from "./nodes/textNode";
// Import new nodes
import { SplitNode } from "./nodes/splitNode";
import { JoinNode } from "./nodes/joinNode";
import { ImageNode } from "./nodes/imageNode";
import { FilterNode } from "./nodes/filterNode";
import { DataInputNode } from "./nodes/dataInputNode";
// Import the wrapper
import { NodeWrapper } from "./nodes/NodeWrapper";

import { DeleteEdgeButton } from "./edges/DeleteEdgeButton";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

// WRAP ALL NODES BEFORE REGISTERING THEM
const nodeTypes = {
  customInput: NodeWrapper(InputNode),
  llm: NodeWrapper(LLMNode),
  customOutput: NodeWrapper(OutputNode),
  text: NodeWrapper(TextNode),
  // Register new nodes (wrapped)
  split: NodeWrapper(SplitNode),
  join: NodeWrapper(JoinNode),
  image: NodeWrapper(ImageNode),
  filter: NodeWrapper(FilterNode),
  dataInput: NodeWrapper(DataInputNode),
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateNodeField: state.updateNodeField, // Added for Part 3 and state updates in nodes
});

const edgeTypes = {
  deleteButtonEdge: DeleteEdgeButton,
};

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    // Initialize text for the text node
    if (type === "text") {
      nodeData.text = "{{input}}";
    }
    return nodeData;
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(
          event.dataTransfer.getData("application/reactflow")
        );
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === "undefined" || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div
        ref={reactFlowWrapper}
        className="w-full h-full" // Replaced width/height 100%
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
          fitView
          // Canvas background color must stay as a ReactFlow style prop
          style={{ backgroundColor: "#1E293B" }}
        >
          {/* Background grid */}
          <Background gap={gridSize} />

          {/* Controls styling updated to tailwind */}
          <Controls
            className="
              !bg-slate-800 
              !border 
              !border-slate-700 
              !rounded-md
            "
          />

          {/* MiniMap styling */}
          <MiniMap
            nodeColor="#3B82F6"
            maskColor="#1F2937"
            className="!bg-slate-900"
          />
        </ReactFlow>
      </div>
    </>
  );
};
