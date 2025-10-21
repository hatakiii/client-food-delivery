"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Footer, Header } from "./_components";
import { FoodsMapped } from "@/components/foods/FoodsMapped";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const route = useRouter();
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      route.push("/login");
    }
  }, [route]);

  return (
    <>
      <Header />
      <Image
        src="/hero.png"
        width={1440}
        height={570}
        alt="hero image"
        className="w-full"
      />
      <FoodsMapped />
      <Footer />
    </>
  );
};
export default Homepage;
