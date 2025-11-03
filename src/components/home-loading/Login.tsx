"use client";

import { ROUTE_PATH } from "@/core/constants/route.constant";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginScreen = () => {
  const navigate = useRouter();

  return (
    // Background closer to the 20.04 default login screen color (often a deep grey-purple/aubergine)
    <div className="flex items-center justify-center h-screen bg-[#381F33] text-white">
      <div className="w-full max-w-sm p-10 space-y-6 bg-gray-800 rounded-xl shadow-2xl backdrop-blur-sm bg-opacity-70 border border-[#AEA79F]">
        {/* User Avatar */}
        <div className="text-center">
          {/* Avatar background in a neutral grey, ring in Orange accent */}
          <div className="mx-auto w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-4xl text-white border-2 border-[#E95420]">
            👤
          </div>
          {/* User Name in White */}
          <h2 className="mt-4 text-2xl font-light text-white">Hien Nguyen</h2>
        </div>

        {/* Sign In Button - Ubuntu Orange accent */}
        <Link href={ROUTE_PATH.Desktop}>
          <button className="w-full cursor-pointer px-4 py-3 text-lg font-medium text-white bg-[#E95420] rounded-md hover:bg-[#DD4814] transition duration-300 shadow-lg hover:shadow-xl">
            Sign In
          </button>
        </Link>

        {/* Secondary Links - Warm Grey text */}
        <div className="flex justify-between text-sm text-[#AEA79F] pt-2">
          <a href="#" className="hover:text-white transition duration-200">
            Accessibility
          </a>
          <Link
            href={ROUTE_PATH.Loading}
            className="hover:text-white transition duration-200"
          >
            Restart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
