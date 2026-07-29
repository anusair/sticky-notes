"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import CardNote from "./CardNote";
import Menu from "./Menu";

import SearchModule from "./SearchModule";

import { Note } from "../types/notes";

import { getNotes, createNote, updateNotePosition } from "../services/notesApi";
import { activeCard } from "../utils";
import Header from "./Header";

function Board() {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSearchModule, setOpenSearchModule] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [openColorPalette, setColorPalette] = useState<boolean>(false);

  const [notes, setNotes] = useState<Note[]>([]);

  const highest = Math.max(...notes.map((n) => n.zIndex), 0);
  async function addNewNote() {
    const OFFSET = notes.length * 20;

    const note = {
      x: 100 + OFFSET,
      y: 100 + OFFSET,
      content: "New note",
      title: "New Note",
      theme: "blue" as const,
      zIndex: highest + 1,
    };

    try {
      const newNote = await createNote(note);

      setNotes((prev) => [...prev, newNote]);

      console.log(newNote);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  useEffect(() => {
    async function fetchNotes() {
      try {
        const notes = await getNotes();
        console.log("Fetched notes:", notes);
        setNotes(notes);
      } catch (error) {
        setNotes([]);
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title?.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  }, [notes, searchTerm]);

  async function updateMotePos(
    newPosition: { x: number; y: number },
    id: number
  ) {
    try {
      await updateNotePosition(id, newPosition);
    } catch (error) {
      console.log("Error updating card position:", error);
    }
  }

  function removeNote(id: number) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function changeNoteTheme(
    id: number,
    theme: "blue" | "mint" | "red" | "yellow"
  ) {
    console.log("changing theme", id, theme);
    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, theme } : note))
    );
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="relative min-h-screen w-full">
      <Header />
      <Menu
        onAddNote={addNewNote}
        setOpenSearchModule={setOpenSearchModule}
        changeNoteTheme={changeNoteTheme}
        selectedCard={selectedNote}
        opened={openColorPalette}
      />

      {filteredNotes.map((note) => (
        <CardNote
          key={note.id}
          x={Number(note.x)}
          y={Number(note.y)}
          id={note.id}
          content={note.content}
          title={note.title}
          theme={note.theme}
          updated_at={note.updated_at}
          updateNotePos={updateMotePos}
          onDelete={removeNote}
          onSelect={() => setSelectedNoteId(note.id)}
          zIndex={note.zIndex}
        />
      ))}
      <SearchModule
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        className={`duration-500 ${
          openSearchModule ? "opacity-100 top-10" : "-top-100 opacity-0"
        }`}
      />
    </div>
  );
}

export default Board;
