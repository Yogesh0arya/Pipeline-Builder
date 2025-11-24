import {
  BrainCircuit,
  Cable,
  Database,
  Funnel,
  Image,
  PlusCircle,
  Split,
  Ticket,
  Type,
} from "lucide-react";
import { DraggableNode } from "./draggableNode";
import { useStore } from "./store"; // <-- Import useStore
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  getNodeID: state.getNodeID,
  addNode: state.addNode,
});

// Helper function to initialize node data (copied from ui.js for toolbar use)
const getInitNodeData = (nodeID, type) => {
  let nodeData = { id: nodeID, nodeType: `${type}` };
  if (type === "text") {
    nodeData.text = "{{input}}";
  }
  return nodeData;
};

export const PipelineToolbar = () => {
  const { getNodeID, addNode } = useStore(selector, shallow);

  const onNodeClick = (type) => {
    const nodeID = getNodeID(type);
    const newNode = {
      id: nodeID,
      type,
      // Give it a default, visible position
      position: { x: 50, y: 50 },
      data: getInitNodeData(nodeID, type),
    };
    addNode(newNode);
  };
  return (
    // Sidebar styling
    <div className="p-5 border-r border-slate-800 bg-slate-900 flex-shrink-0">
      <div className="flex gap-3 md:gap-5 flex-wrap">
        <DraggableNode
          type="customInput"
          label="Input"
          onNodeClick={onNodeClick}
          icon={<Ticket />}
        />
        <DraggableNode
          type="llm"
          label="LLM"
          onNodeClick={onNodeClick}
          icon={<BrainCircuit />}
        />
        <DraggableNode
          type="customOutput"
          label="Output"
          onNodeClick={onNodeClick}
          icon={<Cable />}
        />
        <DraggableNode
          type="text"
          label="Text"
          onNodeClick={onNodeClick}
          icon={<Type />}
        />

        {/* Added new nodes to the toolbar */}
        <DraggableNode
          type="split"
          label="Split Text"
          onNodeClick={onNodeClick}
          icon={<Split />}
        />
        <DraggableNode
          type="join"
          label="Join Text"
          onNodeClick={onNodeClick}
          icon={<PlusCircle />}
        />
        <DraggableNode
          type="image"
          label="Image Gen"
          onNodeClick={onNodeClick}
          icon={<Image />}
        />
        <DraggableNode
          type="filter"
          label="Filter List"
          onNodeClick={onNodeClick}
          icon={<Funnel />}
        />
        <DraggableNode
          type="dataInput"
          label="Data Source"
          onNodeClick={onNodeClick}
          icon={<Database />}
        />
      </div>
    </div>
  );
};
