export const DAYS = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// lib/app-menu-data.ts

import { IconType } from "react-icons";
import {
  FaCalculator,
  FaCode,
  FaCog,
  FaFirefoxBrowser,
  FaFolder,
  FaMusic,
  FaPaintBrush,
  FaTerminal,
} from "react-icons/fa";

export interface AppItem {
  name: string;
  icon: IconType;
  action: string; // The command or file path to launch
}

export interface AppCategory {
  name: string;
  icon: IconType;
  apps: AppItem[];
}

export const applicationMenuData: AppCategory[] = [
  {
    name: "Development",
    icon: FaCode,
    apps: [
      { name: "VS Code", icon: FaCode, action: "code" },
      { name: "Terminal", icon: FaTerminal, action: "gnome-terminal" },
      { name: "GitKraken", icon: FaCode, action: "gitkraken" },
    ],
  },
  {
    name: "Internet",
    icon: FaFirefoxBrowser,
    apps: [
      {
        name: "Firefox Web Browser",
        icon: FaFirefoxBrowser,
        action: "firefox",
      },
      { name: "Chromium", icon: FaFirefoxBrowser, action: "chromium" },
      { name: "Thunderbird Mail", icon: FaMusic, action: "thunderbird" },
    ],
  },
  {
    name: "Accessories",
    icon: FaPaintBrush,
    apps: [
      { name: "Calculator", icon: FaCalculator, action: "gcalctool" },
      { name: "Files (Nautilus)", icon: FaFolder, action: "nautilus" },
      { name: "Image Viewer", icon: FaPaintBrush, action: "eog" },
    ],
  },
  {
    name: "Sound & Video",
    icon: FaMusic,
    apps: [
      { name: "VLC Media Player", icon: FaMusic, action: "vlc" },
      { name: "Spotify", icon: FaMusic, action: "spotify" },
    ],
  },
  {
    name: "Settings",
    icon: FaCog,
    apps: [
      { name: "System Settings", icon: FaCog, action: "settings" },
      { name: "Software Center", icon: FaCog, action: "software-center" },
    ],
  },
];
