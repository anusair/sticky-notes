"use client";

import { useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";

function BackButton() {
  const router = useRouter();

  function handleBackButton() {
    router.push("/login");
  }
  return (
    <button
      onClick={handleBackButton}
      className="text-white flex items-center gap-2 font-bold cursor-pointer hover:text-primary duration-300"
    >
      <IoMdArrowRoundBack />
      <span>Back</span>
    </button>
  );
}

export default BackButton;
