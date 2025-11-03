// Simple Window Mimic
const Window = () => (
  <div className="fixed left-0 top-8 bottom-0 w-16 bg-[#000000] flex flex-col items-center py-4 space-y-3 shadow-2xl z-20">
    {/* Application Icons - Orange ring/dot for active/favorite apps */}
    <div
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl shadow-lg relative cursor-pointer"
      title="Firefox"
    >
      🌐
      {/* Active App Indicator: Small orange dot/line */}
      <div className="absolute right-0 w-1 h-1 bg-[#E95420] rounded-full"></div>
    </div>
    <div
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
      title="Files"
    >
      📁
    </div>
    <div
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
      title="Terminal"
    >
      💻
    </div>
    <div
      className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
      title="VS Code"
    >
      VS
    </div>

    {/* Spacer to push "Show Applications" to the bottom */}
    <div className="flex-grow"></div>

    {/* Show Applications Button at the bottom */}
    <div
      className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
      title="Show Applications"
    >
      •••
    </div>
  </div>
);
export default Window;
