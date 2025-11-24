import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import Navigation from "./components/Navigation";
import Tabs from "./components/Tabs";

function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-gray-200 font-sans">
      {/* Header */}
      <header className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
        <h1 className="font-bold text-xl">
          VectorShift{" "}
          <span className="text-emerald-500 text-base">Pipeline Builder</span>
        </h1>
      </header>

      <Navigation />
      <Tabs />

      <PipelineToolbar />
      {/* Main Layout */}
      <div className="flex h-[calc(60vh)] md:h-[calc(50vh)] lg:h-[calc(65vh)]">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
