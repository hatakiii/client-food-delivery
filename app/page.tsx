"use client";

import { SignUpForm } from "@/components/auth/SignUpForm";
import { SignUpPassword } from "@/components/auth/SignUpPasswordForm";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(0);
  const StepComponents = [SignUpForm, SignUpPassword][step];

  const [email, setEmail] = useState("");

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <main>
      <StepComponents
        email={email}
        setEmail={setEmail}
        handleNextStep={handleNextStep}
      />
    </main>
  );
}
