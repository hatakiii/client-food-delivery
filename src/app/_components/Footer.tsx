"use client";

import { useEffect, useState } from "react";
import { CategoryType } from "@/lib/types";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

let backendUrl = "";

const env = process.env.NODE_ENV;
if (env == "development") {
  backendUrl = "http://localhost:4000";
} else if (env == "production") {
  backendUrl = "https://backend-food-delivery-two.vercel.app";
}

export const Footer = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const getCategories = async () => {
    const result = await fetch(`${backendUrl}/api/categories`);
    const responseData = await result.json();
    const { data } = responseData;
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <div className="bg-primary">
      <div>
        <div className="w-full h-15"></div>
        <div className="bg-red-500 flex mb-19 py-7 px-24.5 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="text-[30px] leading-9 text-white font-semibold whitespace-nowrap"
            >
              Fresh fast delivered
            </div>
          ))}
        </div>
        <div className="flex px-22 items-start justify-center mb-26">
          <img src={"./footerLogo.svg"} className="mr-55" />
          <div className="flex gap-28">
            <div className="flex flex-col gap-4">
              <p className="text-4 leading-7 text-muted-foreground font-[400]">
                NOMNOM
              </p>
              <p className="text-4 leading-6 text-primary-foreground font-[400]">
                Home
              </p>
              <p className="text-4 leading-6 text-primary-foreground font-[400]">
                Contact us
              </p>
              <p className="text-4 leading-6 text-primary-foreground font-[400]">
                Delivery zone
              </p>
            </div>
            <div className="flex flex-col gap-4 h-57 ">
              <p className="text-4 leading-7 text-muted-foreground font-[400]">
                MENU
              </p>
              <div className="flex-wrap flex flex-col gap-y-4 h-50 gap-x-12">
                {categories.map((category) => {
                  return (
                    <p
                      key={category._id}
                      className="text-4 leading-6 text-primary-foreground font-[400]"
                    >
                      {category.name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-4 leading-7 text-muted-foreground font-[400] mb-[21px]">
                FOLLOW US
              </p>
              <div className="flex gap-4">
                <FaFacebook className="text-white" />
                <FaInstagram className="text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="px-22 pb-36">
          <div className="border-[1px] border-toast-destructive opacity-40 mb-8"></div>
          <div className="flex gap-12">
            <div className="flex gap-1">
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                Copy right 2024
              </p>
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                ©
              </p>
              <p className="text-sm leading-5 font-normal text-muted-foreground">
                Nomnom LLC
              </p>
            </div>
            <p className="text-sm leading-5 font-normal text-muted-foreground">
              Privacy policy
            </p>
            <p className="text-sm leading-5 font-normal text-muted-foreground">
              Terms and condition
            </p>
            <p className="text-sm leading-5 font-normal text-muted-foreground">
              Cookie policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
