"use client";
import React, { useState } from "react";
import { SignupEmailForm, SignupPasswordForm } from "../_components/auth";
import Image from "next/image";

const SignupPage = () => {
  const [step, setStep] = useState(0);
  const StepComponents = [SignupEmailForm, SignupPasswordForm, SignupEmailForm][
    step
  ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="w-360 h-256 flex m-auto py-5 pr-5 pl-25 gap-12">
      <div className="mt-[226px]">
        <StepComponents
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleNextStep={handleNextStep}
        />
      </div>
      <div className="rounded-2xl overflow-hidden">
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
export default SignupPage;
