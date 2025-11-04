// components/BrowserTab.tsx
import { FC } from "react";
import { FaGlobe, FaTimes } from "react-icons/fa";

interface BrowserTabProps {
  title: string;
  isActive: boolean;
  onSelect: () => void; // Added for interactivity
  onClose: () => void;
}

const BrowserTab: FC<BrowserTabProps> = ({
  title,
  isActive,
  onSelect,
  onClose,
}) => {
  const tabClasses = isActive
    ? "bg-white text-gray-900 border-t-2 border-orange-500 shadow-md"
    : "bg-gray-300 text-gray-700 hover:bg-gray-400";

  return (
    <div
      className={`flex items-center justify-center h-8 px-4 py-1.5 cursor-pointer text-sm font-medium transition duration-150 relative top-px ${tabClasses}`}
      onClick={onSelect}
    >
      <span className="mr-2 text-gray-500">
        <FaGlobe size={12} />
      </span>

      <span className="truncate max-w-[150px]">{title}</span>

      <button
        className="ml-3 p-1 rounded-full hover:bg-gray-200 transition duration-100"
        title="Close Tab"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }} // Stop event from triggering onSelect
      >
        <FaTimes size={10} />
      </button>
    </div>
  );
};

export default BrowserTab;
