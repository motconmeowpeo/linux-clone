"use client";
import { DAYS, MONTHS } from "@/core/constants/common.constant";
import { Menu } from "@mui/material"; // Import MUI components
import { useEffect, useState } from "react";
import { BsBatteryFull, BsVolumeUpFill, BsWifi } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import SystemOptions from "./SystemOptions";

// Top Bar Mimic
const TopBar = () => {
  // Anchor element state for MUI Menu positioning
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const inter = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(inter);
  }, []);

  return (
    <div className="relative">
      <div className="flex justify-between items-center w-full h-8 bg-[#000000] px-4 text-sm text-white shadow-md z-20">
        {/* Left (Activities/App Menu) */}
        <div className="font-semibold cursor-pointer hover:text-[#E95420]">
          Activities
        </div>

        {/* Center (Clock) */}
        <div className="font-medium">
          {`${DAYS[now.getDay()]} ${now.getDate()} ${
            MONTHS[now.getMonth()]
          }, ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`}{" "}
        </div>
        {/* Right (System Indicators) - Clickable Area */}
        <div
          id="system-indicator-button"
          className="flex space-x-3 text-lg items-center p-1 rounded-sm cursor-pointer hover:bg-[#3C3C3C] transition duration-150"
          onClick={handleClick}
          aria-controls={open ? "system-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <BsVolumeUpFill />
          <BsWifi />
          <BsBatteryFull />
          <span
            className={`cursor-pointer text-sm transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
          >
            <FaChevronDown />
          </span>
        </div>
      </div>

      {/* MUI Menu Component */}
      <Menu
        id="system-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // Positioning to align with the right side of the screen/button
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // Custom PaperProps to apply Ubuntu Yaru dark styling
        PaperProps={{
          style: {
            backgroundColor: "#3C3C3C", // Dark grey background
            color: "white",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
            marginTop: "4px", // Space below the top bar
            width: "256px", // Fixed width for Ubuntu look
          },
        }}
      >
        {/* The content of the dropdown is a separate component */}
        <SystemOptions handleClose={handleClose} />
      </Menu>
    </div>
  );
};

export default TopBar;
