"use client";

import { IoSearch } from "react-icons/io5";
import ColorPallete from "./ColorPallete";

import { Note, NoteTheme } from "../types/notes";
import { useState } from "react";

import { FaSignOutAlt } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

function Menu({
  onAddNote,
  setOpenSearchModule,
  selectedCard,
  changeNoteTheme,
  opened,
}: {
  onAddNote: () => void;
  setOpenSearchModule: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCard: Note | undefined;
  changeNoteTheme: (id: number, theme: NoteTheme) => void;
  opened: boolean;
}) {
  const router = useRouter();
  const [openColors, setOpenColors] = useState<boolean>(opened);
  function setOpenColorpalette() {
    setOpenColors((prev) => !prev);
  }

  async function handleLogout() {
    await axios.post(
      `http://localhost:3000/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    router.push("/login");
  }

  return (
    <div
      className="bg-surface w-20 px-5 py-3 absolute top-1/2 -translate-y-1/2
    left-5 flex flex-col gap-5 rounded-xl"
    >
      {/* add button */}
      <button
        className="bg-primary hover:bg-hover duration-300 cursor-pointer 
        w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
        type="button"
        onClick={onAddNote}
      >
        <span className="text-white font-bold text-xl">+</span>
      </button>

      <button
        className="bg-primary hover:bg-hover duration-300 cursor-pointer 
        w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
        type="button"
        onClick={() => setOpenSearchModule((prev) => !prev)}
      >
        <IoSearch color="white" className="text-xl" />
      </button>

      <div className="relative">
        <button
          className="bg-[#bdd5e7] duration-300 cursor-pointer 
          w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold"
          type="button"
          onClick={setOpenColorpalette}
        ></button>
        <ColorPallete
          selectedCard={selectedCard}
          onChangeTheme={changeNoteTheme}
          opened={openColors}
        />
      </div>

      <div>
        <button
          className="bg-primary hover:bg-hover duration-300 cursor-pointer 
          w-10 h-10 rounded-full flex items-center justify-center font-bold
          text-white text-lg"
          type="button"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
        </button>
      </div>
    </div>
  );
}

export default Menu;
