import { Play } from "lucide-react";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);

  const handleSubmit = async () => {
    // Prepare the pipeline data for the backend
    const pipelineData = {
      nodes: nodes,
      edges: edges,
    };

    try {
      // Using FormData for sending complex JSON to a FastAPI Form(...) endpoint
      const formData = new FormData();
      formData.append("pipeline", JSON.stringify(pipelineData));

      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST", // Use POST since we are sending data, and FastAPI's Form expects it
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Create a user-friendly alert
      const dagStatus = result.is_dag
        ? "Yes, it is a DAG."
        : "No, it is NOT a DAG.";
      const alertMessage =
        `Pipeline Parse Result:\n\n` +
        `Number of Nodes: ${result.num_nodes}\n` +
        `Number of Edges: ${result.num_edges}\n` +
        `Is Directed Acyclic Graph (DAG): ${dagStatus}`;

      alert(alertMessage);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      alert(`Error submitting pipeline: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleSubmit}
        className="flex items-center gap-1 px-2 py-1 text-xs sm:text-base sm:px-4 sm:py-1 border-2 border-emerald-500 bg-emerald-200 text-black rounded cursor-pointer  my-2 transition-colors hover:bg-emerald-600 active:bg-emerald-700
        "
      >
        <Play className="w-4 text-emerald-500 fill-emerald-500" />
        Run
      </button>
    </div>
  );
};
