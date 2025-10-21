"use client";
import SignUpForm from "@/components/(auth)/SignUpForm";
import { SignUpPassword } from "@/components/(auth)/SignUpPassword";
import { useState } from "react";

const RegisterPage = () => {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const StepComponents = [SignUpForm, SignUpPassword][step];
  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };
  return (
    <main>
      <StepComponents
        email={email}
        setEmail={setEmail}
        handleNextStep={handleNextStep}
        handlePrevStep={handlePrevStep}
      />
    </main>
  );
};

export default RegisterPage;
