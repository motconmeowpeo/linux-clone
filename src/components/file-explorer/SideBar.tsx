// components/SidebarUI.js
import {
  FaCompactDisc,
  FaDesktop,
  FaDownload,
  FaFolderOpen,
  FaHome,
  FaTrash,
} from "react-icons/fa";

const SidebarUI = () => {
  const navItems = [
    { name: "Home", icon: FaHome, path: "/" },
    { name: "Desktop", icon: FaDesktop, path: "/Desktop" },
    { name: "Documents", icon: FaFolderOpen, path: "/Documents" },
    { name: "Downloads", icon: FaDownload, path: "/Downloads", active: true },
  ];

  const devices = [
    { name: "OS Disk", icon: FaCompactDisc },
    { name: "Removable Drive", icon: FaCompactDisc },
  ];

  return (
    <div className="w-56 bg-gray-100 p-4 border-r h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Favorites</h3>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.name}
            // Use active class to show the selected/current folder
            className={`flex items-center p-2 mb-1 rounded-md cursor-pointer 
                       ${item.active ? "bg-blue-200 text-blue-800 font-medium" : "hover:bg-gray-200 text-gray-800"}`}
          >
            <item.icon className="mr-3" size={18} />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 pt-3 border-t">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Devices</h3>
        <ul>
          {devices.map((item) => (
            <li
              key={item.name}
              className="flex items-center p-2 mb-1 rounded-md text-gray-600"
            >
              <item.icon className="mr-3" size={18} />
              <span>{item.name}</span>
            </li>
          ))}
          <li className="flex items-center p-2 mt-2 rounded-md text-gray-600">
            <FaTrash className="mr-3" size={18} />
            <span>Trash</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarUI;
