"use client";
import InputField from "@/app/components/InputField";
import { useState } from "react";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");

  function handleSubmitForm() {
    if (email.trim() === "") {
      setErrors("The email field is empty!");
      return;
    }
  }

  return (
    <div className="relative flex h-full items-center justify-center w-full">
      <div className="absolute top-20 left-0 right-0">
        <h1 className="text-center text-4xl font-bold text-primary">
          Forgot password?
        </h1>
        <p className="text-white text-center mt-2">
          Enter your email to receive a password reset link.
        </p>
      </div>

      <div className="w-1/2 ">
        <InputField
          name="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={errors}
        />

        <button
          type="button"
          className="text-white bg-primary py-2 px-5 rounded-xl cursor-pointer w-full"
          onClick={handleSubmitForm}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
