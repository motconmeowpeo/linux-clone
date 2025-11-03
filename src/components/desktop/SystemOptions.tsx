import { ROUTE_PATH } from "@/core/constants/route.constant";
import { Divider, MenuItem, Slider, Typography } from "@mui/material"; // Import MUI components
import Link from "next/link";
import { BsVolumeUpFill, BsWifi } from "react-icons/bs";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

interface Props {
  handleClose: () => void;
}
// --- Ubuntu Color Palette ---
const UBUNTU_ORANGE = "#E95420"; // Accent Color
const UBUNTU_LIGHT_GREY = "#AEA79F"; // Neutral/Text Color

// Custom style for MenuItem to remove default MUI hover/padding and apply Ubuntu look
const ubuntuMenuItemStyle = {
  padding: "8px 12px",
  "&:hover": {
    backgroundColor: "#4a4a4a", // Darker hover state
    borderRadius: 4,
  },
};

const SystemOptions = ({ handleClose }: Props) => (
  <div className="p-2">
    {/* User Status and Profile Link */}
    <MenuItem
      onClick={handleClose}
      sx={{
        ...ubuntuMenuItemStyle,
        marginBottom: "8px",
        padding: "12px",
        "&:hover": { backgroundColor: "transparent" },
      }}
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#E95420] rounded-full flex items-center justify-center text-lg text-white">
          U
        </div>
        <div className="flex flex-col">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Hien Nguyen
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: UBUNTU_LIGHT_GREY,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Account Settings
          </Typography>
        </div>
      </div>
    </MenuItem>

    {/* Separator */}
    <Divider sx={{ backgroundColor: "#5A5A5A", marginY: "4px" }} />

    {/* Quick Settings Toggles/Sliders */}
    <div className="py-2">
      {/* Volume Slider Mockup */}
      <div className="flex items-center space-x-3 px-3 py-2">
        <BsVolumeUpFill className="text-lg flex-shrink-0" />
        <Slider
          defaultValue={75}
          aria-label="Volume"
          sx={{
            color: "white", // White slider track for Ubuntu look
            "& .MuiSlider-thumb": {
              backgroundColor: "white",
              "&:hover, &.Mui-focusVisible": {
                boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)", // Subtle hover glow
              },
            },
            "& .MuiSlider-track": {
              backgroundColor: "white",
            },
            "& .MuiSlider-rail": {
              backgroundColor: UBUNTU_LIGHT_GREY,
            },
          }}
        />
      </div>

      {/* Network/Wi-Fi Status */}
      <MenuItem onClick={handleClose} sx={ubuntuMenuItemStyle}>
        <div className="flex justify-between items-center w-full">
          <span>Wi-Fi: Connected</span>
          <BsWifi className="text-lg" />
        </div>
      </MenuItem>
    </div>

    {/* Separator */}
    <Divider sx={{ backgroundColor: "#5A5A5A", marginY: "4px" }} />

    {/* Session Controls */}
    <div className="align-middle pt-1">
      <MenuItem
        onClick={() => {
          handleClose();
          alert("Launching Settings...");
        }}
        sx={ubuntuMenuItemStyle}
      >
        <FaCog className="text-lg mr-2" />
        <span>Settings</span>
      </MenuItem>
      <MenuItem sx={ubuntuMenuItemStyle}>
        <Link href={ROUTE_PATH.Login} className="flex w-full">
          <IoMdLock className="text-lg mr-2" />
          Lock
        </Link>
      </MenuItem>
      <MenuItem
        // Apply Ubuntu Orange to the Log Out button
        sx={{
          ...ubuntuMenuItemStyle,
          color: "white",
        }}
      >
        <Link href={ROUTE_PATH.Login} className="flex w-full">
          <FaSignOutAlt className="text-lg mr-2" />
          Log Out
        </Link>
      </MenuItem>
    </div>
  </div>
);

export default SystemOptions;
