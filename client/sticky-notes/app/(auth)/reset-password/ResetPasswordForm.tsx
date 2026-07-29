"use client";

import InputField from "@/app/components/InputField";
import { useState } from "react";

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [resetForm, setResetForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleShowPassword = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResetForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmitChangePassword = async () => {
    if (!resetForm.password) {
      setError((prev) => ({
        ...prev,
        password: "Password is required.",
      }));
      return;
    }

    if (resetForm.confirmPassword === "") {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password ",
      }));

      return;
    }

    if (resetForm.password !== resetForm.confirmPassword) {
      setError((prev) => ({
        password: "password don't match",
        confirmPassword: "Passoword don't match.",
      }));
      return;
    }
    
    // here a request to the backend should be sent.
  };
  return (
    <div className="relative flex h-full items-center justify-center w-full">
      <div className="absolute top-15 left-0 right-0">
        <h1 className="text-center text-4xl font-bold text-primary">
          Reset your password
        </h1>
      </div>
      {/* two input fields with a reset button */}
      <div className="w-1/2">
        <InputField
          name="password"
          type="password"
          show={showPassword.password}
          onTogglePassword={() => handleShowPassword("password")}
          value={resetForm.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <InputField
          name="confirmPassword"
          type="password"
          show={showPassword.confirmPassword}
          onTogglePassword={() => handleShowPassword("confirmPassword")}
          value={resetForm.confirmPassword}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
        />

        <button
          type="button"
          className="text-white bg-primary hover:bg-hover duration-300 py-2 px-5 rounded-xl cursor-pointer w-full"
          onClick={handleSubmitChangePassword}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
