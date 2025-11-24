import { SubmitButton } from "../submit";
import {
  ChevronRight,
  CircleQuestionMark,
  PanelLeftOpen,
  Rocket,
  RotateCcw,
} from "lucide-react";

function Navigation() {
  return (
    <nav className="flex justify-between items-center p-2">
      <div className="flex gap-2">
        <PanelLeftOpen className="w-4" />
        <p className="hidden md:inline-block">Pipeline</p>
        <ChevronRight className="w-4" />
        <p>Untitled Pipeline 539</p>
        <button className="hidden md:inline-block border border-gray-500 text-gray-500 text-xs px-2 py-1 rounded-md">
          Edit
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <CircleQuestionMark className="hidden md:flex w-6 text-gray-500" />
        <button className="hidden md:flex md:items-center md:gap-1 border border-gray-500 text-gray-500 text-xs px-2 py-1 h-min rounded-md">
          <RotateCcw className="w-4" />
          Version history
        </button>
        <button className="cursor-not-allowed hidden md:flex md:items-center md:gap-1 text-white bg-blue-800 rounded-lg px-2 py-1">
          <Rocket className="w-4" />
          Deploy Changes
        </button>
        <SubmitButton />
      </div>
    </nav>
  );
}

export default Navigation;
