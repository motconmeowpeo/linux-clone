"use client";
import React, { useCallback, useState } from "react";
// Assuming the FileEntry interface is defined as before

// --- Top-Level Component ---
const FileExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>("/home/user");
  const [fileList, setFileList] = useState<any[]>(
    // Dummy Data to render the list view
    [
      { name: "Documents", isDirectory: true, type: "Folder", size: 0 },
      { name: "image.png", isDirectory: false, type: "Image", size: 120000 },
      {
        name: "budget.xlsx",
        isDirectory: false,
        type: "Spreadsheet",
        size: 45000,
      },
    ]
  );
  const [viewMode, setViewMode] = useState<"icons" | "list">("list");

  const handleNavigate = useCallback((newPath: string) => {
    setCurrentPath(newPath);
    // In a real app, logic to fetch files for the newPath would go here
  }, []);

  return (
    // Outer container: Fixed size for demo, white background, shadow for "window" effect
    <div className="file-explorer-window w-[1000px] h-[600px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200">
      {/* 1. Header and Controls */}
      <Header
        currentPath={currentPath}
        onSearch={() => alert("Search initiated")}
        onBack={() => handleNavigate("..")}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* 2. Main Content Area: Flex row for SideBar and ContentPane */}
      <div className="main-content-area flex flex-grow overflow-hidden">
        {/* 3. Left Sidebar (Navigation) */}
        <Sidebar onSelectLocation={handleNavigate} activePath={currentPath} />

        {/* 4. Main File View */}
        <ContentPane
          files={fileList}
          path={currentPath}
          viewMode={viewMode}
          onFileClick={handleNavigate}
          onNewFolder={() => console.log("New Folder")}
        />
      </div>
    </div>
  );
};

// --- Sub-Components with Tailwind ---

// 1. Header Component
interface HeaderProps {
  currentPath: string;
  onSearch: () => void;
  onBack: () => void;
  viewMode: string;
  setViewMode: (mode: "icons" | "list") => void;
}
const Header: React.FC<HeaderProps> = ({
  currentPath,
  onSearch,
  onBack,
  viewMode,
  setViewMode,
}) => (
  <header className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
    {/* Navigation Controls and Breadcrumbs */}
    <div className="flex items-center space-x-3">
      <button
        onClick={onBack}
        className="text-gray-600 hover:text-indigo-600 p-2 rounded-full transition duration-150"
      >
        {/* Replace with an actual SVG icon like ChevronLeft */}
        <span className="font-bold">{"<"}</span>
      </button>

      {/* Breadcrumb Path - simplified with Tailwind classes */}
      <div className="text-sm text-gray-700 font-medium">
        {currentPath.split("/").map((segment, index, arr) => (
          <React.Fragment key={index}>
            <span className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
              {segment}
            </span>
            {index < arr.length - 1 && (
              <span className="mx-1 text-gray-400">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>

    {/* Action Buttons & Search */}
    <div className="flex items-center space-x-2">
      {/* View Toggle */}
      <button
        onClick={() => setViewMode(viewMode === "list" ? "icons" : "list")}
        className={`p-2 rounded-lg text-sm transition ${viewMode === "list" ? "bg-indigo-100 text-indigo-700" : "text-gray-500 hover:bg-gray-200"}`}
      >
        {viewMode === "list" ? "List View" : "Icon View"}
      </button>

      {/* Search Input/Button */}
      <button
        onClick={onSearch}
        className="text-gray-600 hover:text-indigo-600 p-2 rounded-full transition"
      >
        {/* Replace with actual Search SVG icon */}
        🔍
      </button>

      <button className="text-gray-600 hover:text-indigo-600 p-2 rounded-full transition">
        {/* Menu button (three dots) */}⋮
      </button>
    </div>
  </header>
);

// 2. Sidebar Component
interface SidebarProps {
  onSelectLocation: (path: string) => void;
  activePath: string;
}
const Sidebar: React.FC<SidebarProps> = ({ onSelectLocation, activePath }) => {
  const locations = [
    "Home",
    "Desktop",
    "Documents",
    "Downloads",
    "Music",
    "Trash",
    "Network",
  ];

  // Helper to determine if a path is active
  const isActive = (loc: string) => activePath.includes(loc);

  return (
    <nav className="sidebar-pane w-60 p-4 bg-gray-100 border-r border-gray-200 overflow-y-auto">
      <p className="text-xs font-semibold uppercase text-gray-500 mb-2">
        Favorites
      </p>
      {locations.slice(0, 5).map((loc) => (
        <div
          key={loc}
          onClick={() => onSelectLocation(`/home/user/${loc}`)}
          className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition ${
            isActive(loc)
              ? "bg-indigo-200 text-indigo-800 font-semibold"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          {/* Icon placeholder (e.g., Folder SVG) */}
          <span className="mr-2">📁</span> {loc}
        </div>
      ))}

      <p className="mt-4 text-xs font-semibold uppercase text-gray-500 mb-2">
        Devices
      </p>
      {locations.slice(5).map((loc) => (
        <div
          key={loc}
          onClick={() => onSelectLocation(`/devices/${loc}`)}
          className={`px-3 py-2 text-sm rounded-lg cursor-pointer transition text-gray-700 hover:bg-gray-200`}
        >
          <span className="mr-2">🗑️</span> {loc}
        </div>
      ))}
    </nav>
  );
};

// 3. Content Pane (File Listing)
interface ContentPaneProps {
  files: any[];
  path: string;
  viewMode: "icons" | "list";
  onFileClick: (path: string) => void;
  onNewFolder: () => void;
}
const ContentPane: React.FC<ContentPaneProps> = ({
  files,
  path,
  viewMode,
  onFileClick,
  onNewFolder,
}) => (
  <main className="content-pane flex-grow p-4 bg-white overflow-y-auto">
    <div className="toolbar mb-4 flex justify-between items-center">
      <button
        onClick={onNewFolder}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
      >
        + New Folder
      </button>
    </div>

    {/* List View Table */}
    {viewMode === "list" && (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Size
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {files.map((file, index) => (
            <tr
              key={index}
              onClick={() => onFileClick(file.path)}
              className="hover:bg-indigo-50 cursor-pointer transition duration-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <span className="mr-2">{file.isDirectory ? "📁" : "📄"}</span>{" "}
                {file.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {file.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {file.size > 0 ? `${(file.size / 1024).toFixed(1)} KB` : "--"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    {/* Icon View (Simplified Grid) */}
    {viewMode === "icons" && (
      <div className="grid grid-cols-6 gap-4">
        {files.map((file, index) => (
          <div
            key={index}
            onClick={() => onFileClick(file.path)}
            className="flex flex-col items-center p-3 hover:bg-indigo-50 rounded-lg cursor-pointer transition duration-100"
          >
            <span className="text-4xl mb-1">
              {file.isDirectory ? "📁" : "📄"}
            </span>
            <span className="text-xs text-center truncate w-full">
              {file.name}
            </span>
          </div>
        ))}
      </div>
    )}
  </main>
);

export default FileExplorer;
