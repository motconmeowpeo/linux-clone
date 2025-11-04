// components/NavigationBar.tsx
import { FC, KeyboardEvent, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEllipsisV,
  FaHome,
  FaLock,
  FaPlus,
  FaRedo,
  FaSearch,
} from "react-icons/fa";

interface NavigationBarProps {
  url: string;
  onNavigate: (newUrl: string) => void;
  onReload: () => void;
}

const NavigationBar: FC<NavigationBarProps> = ({
  url,
  onNavigate,
  onReload,
}) => {
  // Local state to manage the text typed by the user in the input field
  const [inputUrl, setInputUrl] = useState(url);

  // Keep the input field synced with the current URL state when it changes externally
  if (inputUrl !== url) {
    setInputUrl(url);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Ensure the URL has a protocol for the iframe to load correctly
      const safeUrl = inputUrl.startsWith("http")
        ? inputUrl
        : `https://${inputUrl}`;
      onNavigate(safeUrl);
    }
  };

  return (
    <div className="flex items-center p-2 bg-gray-200 border-b border-gray-300">
      {/* 1. Navigation Buttons */}
      <div className="flex space-x-1 mr-3">
        <button
          className="p-1 rounded-md hover:bg-gray-300 text-gray-700"
          title="Back"
        >
          <FaArrowLeft size={16} />
        </button>
        <button
          className="p-1 rounded-md hover:bg-gray-300 text-gray-700"
          title="Forward"
          disabled
        >
          <FaArrowRight size={16} className="opacity-50" />
        </button>
        <button
          className="p-1 rounded-md hover:bg-gray-300 text-gray-700"
          title="Reload"
          onClick={onReload}
        >
          <FaRedo size={14} />
        </button>
      </div>

      {/* 2. Address Bar (Interactive) */}
      <div className="flex flex-1 items-center bg-white border border-gray-400 rounded-full h-8 shadow-inner">
        <div className="px-3 text-green-600">
          <FaLock size={12} />
        </div>

        {/* --- Interactive URL Input --- */}
        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-sm text-gray-800 focus:outline-none placeholder-gray-500"
          placeholder="Search or enter address"
        />

        <div className="px-3 text-gray-500 hover:text-gray-700 cursor-pointer">
          <FaSearch size={14} />
        </div>
      </div>

      {/* 3. Right Side Buttons */}
      <div className="flex space-x-1 ml-3">
        <button
          className="p-1 rounded-md hover:bg-gray-300 text-gray-700"
          title="Home"
          onClick={() => onNavigate("https://example.com/")}
        >
          <FaHome size={16} />
        </button>
        <button
          className="p-1 rounded-md hover:bg-gray-300 text-gray-700"
          title="New Tab"
        >
          <FaPlus size={14} />
        </button>
        <button
          className="p-1 rounded-md hover:bg-gray-300 text-gray-700"
          title="Menu"
        >
          <FaEllipsisV size={16} />
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
