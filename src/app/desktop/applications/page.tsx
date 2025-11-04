// app/page.tsx
"use client";

import ApplicationGrid from "@/components/applications/ApplicationMenu";
import { useState } from "react";

export default function GnomeShellClone() {
  const [isGridOpen, setIsGridOpen] = useState(true); // Default to open for demonstration
  const [launchMessage, setLaunchMessage] = useState<string>(
    "Full-screen GNOME Application Grid Demo"
  );

  const handleAppLaunch = (appName: string, action: string) => {
    setLaunchMessage(`🚀 Launched application: ${appName} (Action: ${action})`);
    setIsGridOpen(false); // Close the grid on launch
  };

  return (
    // Set a background that mimics a Linux wallpaper for visual context
    <div className=" h-[80vh] w-[80vw] bg-cover bg-center bg-[url('/images/logo.webp')] bg-cover bg-center overflow-hidden">
      {/* The Application Grid (Full Screen) */}
      <ApplicationGrid
        onAppLaunch={handleAppLaunch}
        onClose={() => setIsGridOpen(false)}
      />
    </div>
  );
}
// Note: You would need to provide an actual background image like "linux-wallpaper.jpg"
// in your Next.js public directory for the full visual effect.
