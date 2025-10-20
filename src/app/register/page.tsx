"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

const Page = () => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onCreateUser = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    }
    const result = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    alert("User created");
    console.log("User created:", result);
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-2 gap-12">
      {step == 1 && (
        <div className="w-104 h-90  border-2 flex flex-col gap-4">
          <div className="w-9 h-9 flex justify-center items-center rounded-xl bg-white">
            <FaChevronLeft className="w-4 h-4" />
          </div>
          <div className="w-full h-15 flex flex-col gap-1">
            <div className=" text-2xl font-semibold">Create your account</div>
            <div className=" text-base font-normal leading-normal">
              Sign up to explore your favorite dishes.
            </div>
          </div>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={() => setStep(2)}
            className="bg-black text-white"
          >
            Next
          </Button>
          <div className="w-full h-6 self-stretch flex justify-center items-center gap-3">
            <div className="justify-center text-muted-foreground text-base font-normal  leading-normal">
              Already have an account?
            </div>
            <div className="justify-center text-blue-primary text-base font-normal  leading-normal">
              Log in
            </div>
          </div>
        </div>
      )}
      {step == 2 && (
        <div className="w-104 h-90  border-2 flex flex-col gap-4">
          <div className="w-9 h-9 flex justify-center items-center rounded-xl bg-white">
            <FaChevronLeft className="w-4 h-4" />
          </div>
          <div className="w-full h-15 flex flex-col gap-1">
            <div className=" text-2xl font-semibold">
              Create a strong password
            </div>
            <div className=" text-base font-normal leading-normal">
              Create a strong password with letters, numbers.
            </div>
          </div>
          <div className="w-full h-30 flex flex-col gap-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Input
              type="password"
              placeholder="ConfirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="text-sm font-normal leading-none w-full h-16 flex gap-2">
              <Checkbox />
              <p>Show password</p>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <Button
            variant="outline"
            onClick={onCreateUser}
            className="bg-black text-white"
          >
            Lets Go
          </Button>
          <div className="w-full h-6 self-stretch flex justify-center items-center gap-3">
            <div className="justify-center text-muted-foreground text-base font-normal  leading-normal">
              Already have an account?
            </div>
            <div className="justify-center text-blue-primary text-base font-normal  leading-normal">
              Log in
            </div>
          </div>
        </div>
      )}
      <div className="w-214 h-226 rounded-2xl overflow-hidden ">
        <Image
          width={856}
          height={904}
          src="/login.jpg"
          alt="image"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Page;
