import Dock from "@/components/desktop/Dock";
import TopBar from "@/components/desktop/Topbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desktop",
  description: "",
};

export default function DesktopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Mimic the Ubuntu 20.04 default wallpaper: a deep purple/aubergine gradient
    <div className="relative h-screen w-full bg-[url('/images/logo.webp')] bg-cover bg-center overflow-hidden">
      {/* 1. Top Bar */}
      <TopBar />

      <div className="relative h-[calc(100vh-2rem)] flex justify-center items-center">
        {/* 2. Dock (Dash) */}
        <Dock />

        {/* 3. Central Window */}
        {children}
      </div>
    </div>
  );
}
