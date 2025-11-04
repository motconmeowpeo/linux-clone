// components/ApplicationGrid.tsx
import { AppItem, applicationMenuData } from "@/core/constants/common.constant";
import { FC, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

interface ApplicationGridProps {
  onAppLaunch: (appName: string, action: string) => void;
  onClose: () => void;
}

const ApplicationGrid: FC<ApplicationGridProps> = ({
  onAppLaunch,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"frequent" | "all">("all"); // Simulating the bottom tabs

  // Combine all apps into a single flat list
  const allApps: AppItem[] = useMemo(() => {
    return applicationMenuData
      .flatMap((cat) => cat.apps)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filter apps based on search term
  const filteredApps: AppItem[] = useMemo(() => {
    if (!searchTerm) {
      // In a real app, 'frequent' would filter the list here
      return allApps;
    }
    const lowerCaseSearch = searchTerm.toLowerCase();
    return allApps.filter((app) =>
      app.name.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchTerm, allApps]);

  const handleAppClick = (appName: string, action: string) => {
    onAppLaunch(appName, action);
    onClose();
  };

  const renderAppIcon = (app: AppItem) => (
    <div
      key={app.name}
      // Size adjusted to match the large icons in the provided image
      className="flex flex-col items-center p-4 rounded-lg hover:bg-white/10 transition duration-150 cursor-pointer w-40 h-36"
      onClick={() => handleAppClick(app.name, app.action)}
      title={app.name}
    >
      {/* Icon Area: Large padding to simulate the GNOME spacing */}
      <div className="p-4 bg-transparent rounded-xl">
        {/* Note: In the image, icons have their own colors/shapes, which we simulate with size here. */}
        <app.icon size={48} className="text-white shadow-lg" />
      </div>
      <span className="mt-2 text-sm font-medium text-white text-center truncate w-full">
        {app.name}
      </span>
    </div>
  );

  return (
    // Full screen overlay with semi-transparent background and blur (using a custom class)
    // NOTE: For true desktop blur, you might need desktop-specific libraries (Electron/Tauri).
    // This uses a deep, semi-transparent black for the visual effect.
    <div className="flex flex-col items-center pt-8 pb-4" onClick={onClose}>
      {/* Click handler on the outer div allows clicking outside the app grid to close it */}
      <div
        className="w-full h-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar (Centered and prominent) */}
        <div className="w-full max-w-lg mb-8 relative">
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full pl-16 pr-6 py-3 text-lg bg-white/20 text-white border-none rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <FaSearch
            size={20}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white/70"
          />
        </div>

        {/* Application Grid Content Area */}
        <div className="flex-1 overflow-hidden">
          {filteredApps.length > 0 ? (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-x-2 gap-y-6 justify-items-center">
              {filteredApps.map(renderAppIcon)}
            </div>
          ) : (
            <div className="mt-20 text-center">
              <p className="text-2xl text-gray-400">
                No results found for **"{searchTerm}"**
              </p>
            </div>
          )}
        </div>

        {/* Bottom Tabs (Frequent / All) */}
        {!searchTerm && (
          <div className="mt-auto pt-6 flex justify-center space-x-4">
            <button
              className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-200 ${activeTab === "frequent" ? "bg-white text-gray-900" : "text-white hover:bg-white/20"}`}
              onClick={() => setActiveTab("frequent")}
            >
              Frequent
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-200 ${activeTab === "all" ? "bg-white text-gray-900" : "text-white hover:bg-white/20"}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationGrid;
