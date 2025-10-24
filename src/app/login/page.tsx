"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";

let backendUrl = "";

const env = process.env.NODE_ENV;
if (env == "development") {
  backendUrl = "http://localhost:4000";
} else if (env == "production") {
  backendUrl = "https://backend-food-delivery-two.vercel.app";
}

const Page = () => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      const loggedInEmail = localStorage.getItem("userEmail");
      if (loggedInEmail) {
        router.push("/");
      }
    }
  }, [router]);

  const onLogin = async () => {
    const result = await fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await result.json();

    if (response.success) {
      const userData = response.data; // ✅ user info from backend
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userId", userData._id); // ✅ store userId for orders

      router.push("/");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-end h-screen gap-12">
      <div className="w-104 h-90 flex flex-col gap-4">
        <div className="w-9 h-9 flex justify-center items-center rounded-xl bg-white">
          <FaChevronLeft className="w-4 h-4" />
        </div>
        <div className="w-full h-15 flex flex-col gap-1">
          <div className="text-2xl font-semibold">Login</div>
          <div className="text-base font-normal leading-normal">
            Login to enjoy your favourite dishes
          </div>
        </div>
        <div className="w-full h-31 flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <h3 className="text-secondary-foreground text-sm font-normal underline leading-tight">
            Forgot password ?
          </h3>
        </div>

        <Button
          variant="outline"
          onClick={onLogin}
          className="w-full h-9 bg-black text-white"
        >
          Let's go
        </Button>
        <div className="w-full h-6 self-stretch flex justify-center items-center gap-3">
          <div className="justify-center text-muted-foreground text-base font-normal leading-normal">
            Don’t have an account?
          </div>
          <div className="justify-center text-blue-primary text-base font-normal leading-normal">
            Sign up
          </div>
        </div>
      </div>
      <div className="w-[60vw] h-[95vh] rounded-2xl overflow-hidden mr-5">
        <Image
          width={856}
          height={904}
          src={"/login.jpg"}
          alt="image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Page;
