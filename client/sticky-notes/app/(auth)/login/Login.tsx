"use client";

import axios from "axios";

import Link from "next/link";
import Image from "next/image";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleShowPassword = () => {
    setShow((prev) => !prev);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.email.trim() == "" || form.password.trim() == "") {
      setError(400);
      setMessage("Email and password are required.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/login", form, {
        withCredentials: true,
      });

      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.status ?? 500);
        setMessage(error.response?.data?.message ?? "Something went wrong.");
      } else {
        setError(500);
        setMessage("Unexpected error.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center h-full">
        <div className="flex flex-col flex-1">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary">Login</h1>
            <p className="text-white mt-2">
              Sign in to continue to Sticky Notes 👋
            </p>
          </div>

          {/* Login form */}
          <form
            className="flex flex-col gap-5 mt-10"
            onSubmit={handleSubmitForm}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/20
                            text-white
                            ${
                              (error == 400 && form.email.trim() == "") ||
                              error == 401
                                ? "border-red-600"
                                : ""
                            }`}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                value={form.email}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-white">
                Password:
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`w-full
                            rounded-lg
                            border
                            border-gray-300
                            px-4
                            py-3
                            outline-none
                            transition
                            focus:border-primary
                            focus:ring-2
                            focus:ring-primary/20
                            text-white
                            ${
                              (error == 400 && form.password.trim() == "") ||
                              error == 401
                                ? "border-red-600"
                                : ""
                            }`}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                  onClick={handleShowPassword}
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {error && (
                <p className="text-red-600 font-light text-sm">{message}</p>
              )}
            </div>

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
            >
              Login
            </button>
          </form>

          <div className="flex justify-between mt-2">
            <Link
              href="/register"
              className="text-primary hover:text-hover duration-300"
            >
              don&apos;t have an account?
            </Link>
            <Link
              href="/forgot-password"
              className="text-primary hover:text-hover duration-300"
            >
              Forgot password
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

export default Login;
