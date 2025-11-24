// /frontend/src/nodes/TextNode.js
import { useState, useEffect, useRef } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data, updateNodeField }) => {
  const initialText = data?.text || "{{input}}";

  const [currText, setCurrText] = useState(initialText);
  const [variables, setVariables] = useState(data?.variables || []);

  const textareaRef = useRef();
  const spanRef = useRef();

  const padding = 24; // extra width
  const updateNodeInternals = useUpdateNodeInternals(id);

  // EXTRACT VARIABLES LIKE {{input}}, {{name}}, {{x}}
  const extractVariables = (text) => {
    const regex = /{{(.*?)}}/g;
    const vars = [];
    let match;

    while ((match = regex.exec(text))) {
      vars.push(match[1].trim());
    }

    return [...new Set(vars)]; // no duplicates
  };

  // AUTOSIZE HEIGHT + WIDTH + UPDATE HANDLES
  useEffect(() => {
    const textarea = textareaRef.current;
    const span = spanRef.current;

    if (!textarea || !span) return;

    // auto-height
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";

    // auto-width using hidden span
    span.textContent = currText || " ";
    const width = Math.max(span.offsetWidth + padding, 120);
    textarea.style.width = width + "px";

    // notify React Flow to reposition handles
    updateNodeInternals(id);
  }, [currText, variables, id]);

  // ON TEXT CHANGE
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    updateNodeField(id, "text", newText);

    const extracted = extractVariables(newText);
    setVariables(extracted);
    updateNodeField(id, "variables", extracted);
  };

  return (
    <BaseNode id={id} title="Text Node" hasSource={true}>
      <div className="relative">
        {/* Dynamic Handles (one per variable) */}
        {variables.map((v, index) => (
          <Handle
            key={v}
            type="target"
            position={Position.Left}
            id={`${id}-${v}`}
            style={{
              top: `${((index + 1) * 100) / (variables.length + 1)}%`,
              left: -18,
              width: 10,
              height: 10,
              background: "#F97316",
            }}
          >
            <div className="absolute left-3 -top-2 text-[10px] text-gray-200 pointer-events-none">
              {v}
            </div>
          </Handle>
        ))}

        {/* Input Label */}
        <label className="block mb-1 text-xs ml-10 text-gray-300">
          Text Input:
        </label>

        {/* Textarea with auto-grow */}
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="
            nodrag 
            px-2 py-2 
            ml-10 
            rounded 
            border border-gray-700 
            bg-gray-700 text-gray-200 
            resize-none 
            overflow-hidden 
            box-border
          "
          style={{
            minHeight: "40px",
            minWidth: "120px",
          }}
        />

        {/* Hidden span to calculate width */}
        <span
          ref={spanRef}
          className="invisible absolute whitespace-pre font-sans text-sm"
        />
      </div>
    </BaseNode>
  );
};
