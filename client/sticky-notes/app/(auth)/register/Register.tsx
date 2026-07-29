"use client";

import Link from "next/link";
import Image from "next/image";

import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";

import InputField from "@/app/components/InputField";
import { register } from "@/app/services/usersApi";

type Form = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleShowPassword = (field: "password" | "confirmPassword") => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmitForm = async () => {
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (
      form.password &&
      form.confirmPassword &&
      form.password !== form.confirmPassword
    ) {
      newErrors.confirmPassword = "Password don't match";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      await register(form);

      router.push("/login");
    } catch (error) {
      // handle errors from the backend
      if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        console.log(data);

        switch (data?.code) {
          case "USERNAME_ALREADY_EXISTS":
            setErrors((prev) => ({
              ...prev,
              name: data.message,
            }));

            break;
          case "EMAIL_ALREADY_EXISTS":
            setErrors((prev) => ({
              ...prev,
              email: data.message,
            }));
            break;
          case "PASSWORD_TOO_SHORT":
            setErrors((prev) => ({
              ...prev,
              password: data.message,
            }));
            break;
          case "PASSWORD_TOO_WEAK":
            setErrors((prev) => ({
              ...prev,
              password: data.message,
            }));
          default:
            console.error(data.message);
        }
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center h-full">
        <div className="flex flex-col flex-1">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">Register</h1>
            <p className="text-white mt-2">
              Sign up to continue to Sticky Notes 👋
            </p>
          </div>

          {/* Register form */}
          <form
            className="flex flex-col gap-1 mt-10"
            onSubmit={handleSubmitForm}
          >
            <InputField
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              errorMessage={errors.name}
            />
            <InputField
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              errorMessage={errors.email}
            />

            <InputField
              name="password"
              type="password"
              show={showPassword.password}
              onTogglePassword={() => handleShowPassword("password")}
              value={form.password}
              onChange={handleChange}
              errorMessage={errors.password}
            />

            <InputField
              name="confirmPassword"
              type="password"
              show={showPassword.confirmPassword}
              onTogglePassword={() => handleShowPassword("confirmPassword")}
              value={form.confirmPassword}
              onChange={handleChange}
              errorMessage={errors.confirmPassword}
            />

            <button
              className="
              w-full
              bg-primary
              text-white
              rounded-lg
              py-3
              font-medium
              hover:opacity-90
              transition
              cursor-pointer
              "
              type="button"
              onClick={handleSubmitForm}
            >
              Register
            </button>
          </form>

          <div className="flex justify-between mt-2">
            <Link
              href="/login"
              className="text-primary hover:text-hover duration-300"
            >
              already have an account?
            </Link>
          </div>
        </div>

        <div className="relative w-1/2 h-full">
          <Image
            src="/assets/images/login.png"
            alt=""
            fill
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Register;
