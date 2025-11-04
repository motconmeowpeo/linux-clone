"use client";
// pages/index.js (The Main UI Screen with Window Controls)
import { uiItems } from "@/core/constants/file.constant";
import { ROUTE_PATH } from "@/core/constants/route.constant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaEllipsisV,
  FaHome,
  FaList,
  FaMinus,
  FaSearch,
  FaSquare,
  FaTh,
  FaTimes, // Icons for Minimize, Maximize/Restore, Close
} from "react-icons/fa";
import FileIconUI from "./FileIcon";
import SidebarUI from "./SideBar";

export default function FileManagerUI() {
  const currentFolderName = "Downloads";
  const currentPathDisplay = "/home/user/Downloads";
  const [viewMode, setViewMode] = useState("grid");
  const [isMaximized, setIsMaximized] = useState(false); // Track window state for UI change
  const navigate = useRouter();
  // --- UI-ONLY ACTIONS ---
  const toggleMaximize = () => setIsMaximized(!isMaximized);
  const handleClose = () => navigate.push(ROUTE_PATH.Desktop);
  const handleMinimize = () => navigate.push(ROUTE_PATH.Desktop);
  // -----------------------

  return (
    // Outer container mimics the application window frame
    <div
      className={`bg-gray-200 p-2 ${isMaximized ? "h-[40vh] w-[40vw]" : "h-[80vh] w-[80vw] rounded-lg shadow-2xl"}`}
    >
      <div className="flex h-full w-full bg-white flex-col border border-gray-400 rounded-md overflow-hidden">
        {/* --- NEW: Window Title Bar (Mimics GNOME/Linux Top Bar) --- */}
        <header className="flex justify-between items-center bg-gray-600 text-white p-1.5 shadow-md">
          <span className="text-sm font-medium ml-2">
            Files - {currentFolderName}
          </span>

          {/* Window Control Buttons */}
          <div className="flex space-x-1">
            {/* Minimize */}
            <button
              className="p-1 rounded-full hover:bg-gray-500 transition duration-150"
              onClick={handleMinimize}
              title="Minimize"
            >
              <FaMinus size={12} />
            </button>

            {/* Maximize / Restore */}
            <button
              className="p-1 rounded-full hover:bg-gray-500 transition duration-150"
              onClick={toggleMaximize}
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <FaSquare size={12} className={isMaximized ? "opacity-75" : ""} />
            </button>

            {/* Close */}
            <button
              className="p-1 rounded-full hover:bg-red-500 transition duration-150"
              onClick={handleClose}
              title="Close"
            >
              <FaTimes size={12} />
            </button>
          </div>
        </header>
        {/* -------------------------------------------------------- */}

        {/* Application Content (Sidebar + File Area) */}
        <div className="flex flex-1 overflow-hidden">
          {/* 1. Sidebar */}
          <SidebarUI />

          {/* 2. Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="p-3 border-b flex items-center bg-gray-50">
              {/* ... (Existing Toolbar Content) ... */}
              <div className="flex items-center space-x-2 mr-4">
                <button
                  className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                  title="Back"
                >
                  <FaArrowLeft size={16} />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                  title="Forward"
                  disabled
                >
                  <FaArrowRight size={16} />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                  title="Home"
                >
                  <FaHome size={16} />
                </button>
              </div>

              {/* Main Path and Search Bar (Ubuntu/GNOME Style) */}
              <div className="flex-1 flex items-center bg-gray-100 border border-gray-300 rounded-full p-2 h-10 shadow-inner">
                <span className="text-sm font-medium text-gray-700 ml-2 mr-4 flex-1 truncate">
                  {currentPathDisplay}
                </span>
                <div className="flex items-center space-x-2">
                  <FaSearch className="text-gray-500" size={14} />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent text-sm w-32 focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full ${viewMode === "grid" ? "bg-gray-300" : "hover:bg-gray-200"} text-gray-700`}
                  title="Grid View"
                >
                  <FaTh size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full ${viewMode === "list" ? "bg-gray-300" : "hover:bg-gray-200"} text-gray-700`}
                  title="List View"
                >
                  <FaList size={16} />
                </button>
                <button
                  className="p-2 rounded-full hover:bg-gray-200 text-gray-700"
                  title="More Options"
                >
                  <FaEllipsisV size={16} />
                </button>
              </div>
            </div>

            {/* File Display Area */}
            <div className="flex-1 p-6 overflow-auto">
              <h2 className="text-2xl font-light mb-4 text-gray-900">
                {currentFolderName}
              </h2>
              <div className="flex flex-wrap gap-6">
                {uiItems.map((item, index) => (
                  <FileIconUI
                    key={index}
                    item={item}
                    isSelected={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
