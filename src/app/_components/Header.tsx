import React from "react";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { FaChevronRight } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      router.push("/login");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const onLogout = () => {
    localStorage.removeItem("userEmail");
    router.push("/login");
  };
  return (
    <div className="bg-[#18181B] w-full h-17 px-22 flex items-center justify-between">
      <Image src="/NomNomSwift.svg" alt="icon" width={146} height={44} />
      <div className="flex gap-3">
        <p className="text-white">{userEmail}</p>
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Logout</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onLogout}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
