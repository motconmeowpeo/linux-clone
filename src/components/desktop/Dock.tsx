import { ROUTE_PATH } from "@/core/constants/route.constant";
import Link from "next/link";
import { FaFirefox, FaFolder, FaTerminal, FaTh, FaTrash } from "react-icons/fa";

const Dock = () => {
  return (
    <div className="fixed left-0 top-8 bottom-0 w-16 bg-[#000000] flex flex-col items-center py-4 space-y-3 shadow-2xl z-20">
      <Link href={ROUTE_PATH.Browser}>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl shadow-lg relative cursor-pointer"
          title="Firefox"
        >
          <FaFirefox />
          {/* Active App Indicator: Orange dot */}
          <div className="absolute right-0 w-1 h-1 bg-[#E95420] rounded-full"></div>
        </div>
      </Link>

      <Link href={ROUTE_PATH.Files}>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
          title="Files"
        >
          <FaFolder />
        </div>
      </Link>
      <Link href={ROUTE_PATH.Terminal}>
        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
          title="Terminal"
        >
          <FaTerminal />
        </div>
      </Link>

      <div
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
        title="Trash"
      >
        <FaTrash />
      </div>
      <div className="flex-grow"></div>

      {/* 4. Show Applications Button */}
      <div
        className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3C3C3C] text-white text-xl hover:bg-gray-500 cursor-pointer"
        title="Show Applications"
      >
        <FaTh />
      </div>
    </div>
  );
};
export default Dock;
