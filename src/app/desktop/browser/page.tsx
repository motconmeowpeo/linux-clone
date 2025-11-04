// app/page.tsx
"use client";

import BrowserTab from "@/components/browser/BrowserTab";
import NavigationBar from "@/components/browser/NavigationTab";
import { ROUTE_PATH } from "@/core/constants/route.constant";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { FaMinus, FaPlus, FaSquare, FaTimes } from "react-icons/fa";

// Interface for tab state
interface BrowserTabState {
  id: number;
  title: string;
  url: string;
}

// Initial tabs
const initialTabs: BrowserTabState[] = [
  { id: 1, title: "New Tab", url: "https://example.com/" },
];
let nextId = 2;

export default function FirefoxClone() {
  const [isMaximized, setIsMaximized] = useState(true);
  const [tabs, setTabs] = useState<BrowserTabState[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState(initialTabs[0].id);
  const [reloadKey, setReloadKey] = useState(0); // Key for forced reload
  const navigate = useRouter(); // Key for forced reload

  // --- Derived State ---
  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeTabId) || tabs[0],
    [tabs, activeTabId]
  );

  // --- Actions ---
  const handleWindowAction = () => navigate.push(ROUTE_PATH.Desktop);
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const handleNavigate = useCallback(
    (newUrl: string) => {
      setTabs((currentTabs) =>
        currentTabs.map((t) =>
          t.id === activeTabId
            ? {
                ...t,
                url: newUrl,
                title: newUrl.replace(/https?:\/\//, "").split("/")[0],
              }
            : t
        )
      );
      setReloadKey((prev) => prev + 1); // Reset reload key after navigation
    },
    [activeTabId]
  );

  const handleReload = useCallback(() => {
    setReloadKey((prev) => prev + 1); // Increment key to force iframe remount/reload
  }, []);

  const handleCloseTab = useCallback(
    (idToClose: number) => {
      setTabs((currentTabs) => {
        const newTabs = currentTabs.filter((t) => t.id !== idToClose);
        if (newTabs.length === 0) {
          // If the last tab is closed, open a new default tab
          const newTab = {
            id: nextId++,
            title: "New Tab",
            url: "https://example.com/",
          };
          setActiveTabId(newTab.id);
          return [newTab];
        }

        // If the active tab was closed, switch to the last remaining tab
        if (idToClose === activeTabId) {
          setActiveTabId(newTabs[newTabs.length - 1].id);
        }
        return newTabs;
      });
    },
    [activeTabId]
  );

  return (
    <div
      className={`bg-gray-900 p-8 flex items-center justify-center ${isMaximized ? "h-[80vh] w-[80vw]" : "h-[40vh] w-[40vw]"}`}
    >
      <div
        className={`bg-white border border-gray-500 rounded-lg shadow-2xl flex flex-col w-full h-full transition-all duration-300 ${isMaximized ? "rounded-none" : ""}`}
      >
        {/* --- 1. Linux Window Title Bar --- */}
        <header className="flex justify-between items-center bg-gray-700 text-white p-1.5 shadow-md rounded-t-lg">
          <span className="text-sm font-medium ml-2">
            Firefox - {activeTab?.title}
          </span>
          <div className="flex space-x-1">
            <button
              className="p-1 rounded-full hover:bg-gray-500"
              onClick={handleWindowAction}
            >
              <FaMinus size={12} />
            </button>
            <button
              className="p-1 rounded-full hover:bg-gray-500"
              onClick={toggleMaximize}
            >
              <FaSquare size={12} className={isMaximized ? "opacity-75" : ""} />
            </button>
            <button
              className="p-1 rounded-full hover:bg-red-500"
              onClick={handleWindowAction}
            >
              <FaTimes size={12} />
            </button>
          </div>
        </header>

        {/* --- 2. Tab Bar --- */}
        <div className="flex bg-gray-300 px-2 pt-1 border-b border-gray-400">
          {tabs.map((tab) => (
            <BrowserTab
              key={tab.id}
              title={tab.title}
              isActive={tab.id === activeTabId}
              onSelect={() => setActiveTabId(tab.id)}
              onClose={() => handleCloseTab(tab.id)}
            />
          ))}
          <div
            className="flex items-center justify-center h-8 w-8 ml-1 rounded-full text-gray-700 hover:bg-gray-400 cursor-pointer"
            title="Add New Tab"
            onClick={() => {
              const newTab: BrowserTabState = {
                id: nextId++,
                title: "New Tab",
                url: "https://example.com/",
              };
              setTabs((currentTabs) => [...currentTabs, newTab]);
              setActiveTabId(newTab.id);
            }}
          >
            <FaPlus size={12} />
          </div>
        </div>

        {/* --- 3. Address and Navigation Bar --- */}
        <NavigationBar
          url={activeTab?.url || "about:home"}
          onNavigate={handleNavigate}
          onReload={handleReload}
        />

        {/* --- 4. Content Area (Real Iframe) --- */}
        <div className="flex-1 overflow-hidden bg-white">
          {activeTab?.url ? (
            // Key forces the iframe to reload/remount when the URL or reloadKey changes
            <iframe
              key={`${activeTab.url}-${reloadKey}`}
              src={activeTab.url}
              title={activeTab.title}
              className="w-full h-full border-0"
              allowFullScreen
              // Note: Some sites (like Google.com) may block embedding via X-Frame-Options or CSP.
              // If you encounter issues, try different URLs like 'https://example.com'
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <p className="text-gray-500">No URL loaded.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
