export const DraggableNode = ({ type, label, onNodeClick, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (event) => {
    event.target.style.cursor = "grab";
  };

  return (
    <div
      className={`${type} 
        cursor-grab 
        md:w-24
        px-3 py-1.5 
        flex flex-col gap-2 items-center justify-center text-center
        rounded-md 
        bg-gray-700 border border-gray-600 
        text-gray-200 font-medium 
        shadow-sm 
        transition-colors 
        hover:bg-gray-600 active:bg-gray-500`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={handleDragEnd}
      onClick={() => onNodeClick(type)}
      draggable
    >
      <div className="hidden md:block text-white">{icon}</div>
      <span>{label}</span>
    </div>
  );
};
