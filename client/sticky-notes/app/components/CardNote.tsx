"use client";

import { useState, useRef, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import { setNewOffset, activeCard, formatDate } from "../utils";

import { deleteNote, updateNote } from "../services/notesApi";
import { CardNoteProps } from "../types/notes";

const cardThemes = {
  blue: "#aecce4",
  mint: "#ADEBB3",
  red: "#FF474C",
  yellow: "#FFFFC5",
};

function CardNote({
  x,
  y,
  id,
  content,
  title,
  theme,
  updated_at,
  updateNotePos,
  onDelete,
  onSelect,
  zIndex,
}: CardNoteProps) {
  const [cardPos, setCardPos] = useState({ x, y });
  const [titleValue, setTitleValue] = useState(title);
  const [defaultContent, setDefaultContent] = useState(content);

  const cardRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const timeout = useRef<number | null>(null);

  const mouseStartPos = useRef({ x: 0, y: 0 });
  const latestPosition = useRef({ x, y });
  const lastSaved = useRef({
    title,
    content,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartPos.current = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    activeCard(cardRef.current);
  };

  const mouseMove = (e: MouseEvent) => {
    const mouseMoveDir = {
      x: mouseStartPos.current.x - e.clientX,
      y: mouseStartPos.current.y - e.clientY,
    };

    mouseStartPos.current.x = e.clientX;
    mouseStartPos.current.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);
    latestPosition.current = newPosition;
    setCardPos(newPosition);
  };

  const mouseUp = async () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
    await updateNotePos(latestPosition.current, id);
  };

  const autoGrow = () => {
    const textarea = textAreaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  async function updateCard(
    id: number,
    { title, content }: { title: string; content: string }
  ) {
    if (
      title === lastSaved.current.title &&
      content === lastSaved.current.content
    )
      return;
    try {
      await updateNote(id, title, content);

      lastSaved.current = {
        title,
        content,
      };
    } catch (error) {
      console.log("error message: ", error);
    }
  }

  function scheduleSave(newTitle: string, newContent: string) {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = window.setTimeout(() => {
      updateCard(id, { title: newTitle, content: newContent });
    }, 1000);
  }

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitleValue(value);
    scheduleSave(value, defaultContent);
  }

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setDefaultContent(value);
    scheduleSave(titleValue, value);
  }

  async function handleDelete() {
    try {
      await deleteNote(id);
      onDelete(id);
    } catch (error) {
      console.log("error message ", error);
    }
  }

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  useEffect(() => {
    autoGrow();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        card-note
        absolute
        flex
        flex-col
        gap-2
    
      
        rounded-2xl
        

        shadow-lg
        overflow-hidden
        min-w-73
        w-fit
    
    
      
        select-none
        transition-shadow
      
        hover:shadow-xl
        duration-300
      `}
      style={{
        position: "absolute",
        left: cardPos.x,
        top: cardPos.y,
        background: cardThemes[theme],
      }}
      data-id={id}
      onClick={() => {
        onSelect();
        activeCard(cardRef.current);
      }}
    >
      {/* header */}
      <div
        className={`flex items-center justify-between px-5 py-1 cursor-grab`}
        onMouseDown={handleMouseDown}
      >
        <input
          className="text-lg font-bold outline-none flex-1"
          value={titleValue ?? ""}
          onChange={handleTitleChange}
        />
        {/* Delete button */}
        <button
          aria-label="Delete note"
          className="py-1 px-2 cursor-pointer shrink-0"
          onClick={handleDelete}
        >
          <span>
            <FaTrash />
          </span>
        </button>
      </div>

      {/* main content */}
      <div className="px-5 py-3">
        <textarea
          ref={textAreaRef}
          value={defaultContent}
          onInput={autoGrow}
          className="resize-none outline-none w-full overflow-hidden"
          onFocus={() => activeCard(cardRef.current)}
          onChange={handleContentChange}
        />

        <div className="flex items-center justify-between">
          <span className="text-sm font-normal">{formatDate(updated_at)}</span>
          <button>
            <span className="text-sm font-normal cursor-pointer">
              <FaPen />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardNote;
