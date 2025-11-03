"use client";

import { ROUTE_PATH } from "@/core/constants/route.constant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoadingScreen = () => {
  const navigate = useRouter();
  useEffect(() => {
    // Set a timeout to switch from loading to login screen after 3000ms (3s)
    const timer = setTimeout(() => {
      navigate.push(ROUTE_PATH.Login);
    }, 3000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  return (
    // Use the Aubergine hex code for the background
    <div className="flex flex-col items-center justify-center h-screen bg-[#5E2750]">
      {/* Ubuntu Logo Placeholder - Use Orange for the accent */}
      <div className="animate-pulse">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
          {/* 'U' in Aubergine, circle border in Orange */}
          <span className="text-4xl font-bold text-[#5E2750] border-4 border-[#E95420] rounded-full p-2">
            U
          </span>
        </div>
      </div>

      {/* Simple Loading Dots - Use White */}
      <div className="mt-12 flex space-x-3">
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-3 h-3 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.3s" }}
        ></div>
      </div>

      {/* Boot Text Imitation - Use Warm Grey */}
      <p className="absolute bottom-4 left-4 text-xs font-mono text-[#AEA79F]">
        Starting kernel... [ OK ] <br />
        Mounting file systems... [ OK ]
      </p>
    </div>
  );
};

export default LoadingScreen;
