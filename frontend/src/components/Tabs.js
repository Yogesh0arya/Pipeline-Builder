import { Search } from "lucide-react";

function Tabs() {
  return (
    <div className="flex gap-4 p-2 items-center">
      <div className="border border-gray-500 rounded-lg px-2 py-1 flex items-center gap-1">
        <Search className="w-4" />
        <input
          placeholder="Search Node"
          type="text"
          className="bg-transparent text-white outline-none"
        />
      </div>
      <ul className="flex gap-3">
        <li className="hidden md:inline-block">Start</li>
        <li className="text-emerald-500 border-b-2 border-emerald-500">
          Nodes
        </li>
        <li className="hidden md:inline-block">Knowledge</li>
        <li className="hidden md:inline-block">AI</li>
        <li className="hidden md:inline-block">Integration</li>
        <li className="hidden md:inline-block">Logic</li>
        <li className="hidden md:inline-block">Data</li>
        <li className="hidden md:inline-block">Chat</li>
      </ul>
    </div>
  );
}

export default Tabs;
