import React from "react";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";

export const Header = () => {
  return (
    <div className="bg-[#18181B] w-full h-17 px-22 flex items-center justify-between">
      <Image src="/NomNomSwift.svg" alt="icon" width={146} height={44} />
      <div className="flex gap-3">
        <div className="w-63 h-9 bg-white flex items-center justify-center text-xs font-normal leading-4 gap-1 rounded-full px-3">
          <CiLocationOn className="w-5 h-5 text-[#EF4444]" />
          <span className="text-red-500 whitespace-nowrap">
            Delivery address:
          </span>
          <span className="text-muted-foreground whitespace-nowrap">
            Add Location
          </span>
          <FaChevronRight className="w-5 h-5 text-[#18181B80]" />
        </div>
        <div className="w-9 h-9 bg-[#F4F4F5] flex items-center justify-center rounded-full">
          <CiShoppingCart className="w-4 h-4" />
        </div>
        <div className="w-9 h-9 bg-[#EF4444] flex items-center justify-center rounded-full">
          <FiUser className="w-4 h-4 text-white" />
        </div>
      </div>
    </div>
  );
};
