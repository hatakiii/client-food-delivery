import Image from "next/image";
import React from "react";
import { Header } from "./_components";
import { FoodsMapped } from "@/components/ui/foods";

const Homepage = () => {
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
    </>
  );
};
export default Homepage;
