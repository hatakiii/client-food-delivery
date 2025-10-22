import React from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserLogout } from "./UserLogout";
import { UserCart } from "./UserCart";
import { UserLocation } from "./UserLocation";

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
        <UserLocation />

        <UserCart />
        <UserLogout userEmail={userEmail} onLogout={onLogout} />
      </div>
    </div>
  );
};
