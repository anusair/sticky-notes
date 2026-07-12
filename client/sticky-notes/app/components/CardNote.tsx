"use client";

import { useState, useRef, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";

import { setNewOffset, activeCard } from "../utils";

function CardNote({
  x,
  y,
  id,
  content,
  title,
}: {
  x: number;
  y: number;
  id: number;
  content: string;
  title: string;
}) {
  const [beingDragged, setBeingDragged] = useState(null);
  const [cardPos, setCardPos] = useState({ x, y });

  const cardRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLDivElement>(null);

  let mouseStartPos = { x: 0, y: 0 };
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartPos = { x: e.clientX, y: e.clientY };

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
    activeCard(cardRef.current);
  };

  const mouseMove = (e: React.MouseEvent) => {
    const mouseMoveDir = {
      x: mouseStartPos.x - e.clientX,
      y: mouseStartPos.y - e.clientY,
    };

    mouseStartPos.x = e.clientX;
    mouseStartPos.y = e.clientY;

    const newPosition = setNewOffset(cardRef.current, mouseMoveDir);

    setCardPos(newPosition);
  };

  const mouseUp = () => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  };

  const autoGrow = () => {
    const textarea = textAreaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

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
        
        bg-[#bdd5e7]
        shadow-lg
      
        overflow-hidden
        w-65
    
      
        select-none
        transition-shadow
      
        hover:shadow-xl
      `}
      style={{
        position: "absolute",
        left: cardPos.x,
        top: cardPos.y,
      }}
      data-id={id}
    >
      {/* header */}
      <div
        className={`flex items-center justify-between bg-[#aecce4] px-5 py-1 cursor-grab`}
        onMouseDown={handleMouseDown}
      >
        <h1 className="text-xl font-medium">{title}</h1>
        {/* Delete button */}
        <button className="cursor-pointer">
          <span>
            <FaTrash />
          </span>
        </button>
      </div>

      {/* main content */}
      <div className="px-5 py-3">
        <textarea
          ref={textAreaRef}
          onInput={autoGrow}
          className="resize-none outline-none w-full"
          onFocus={() => activeCard(cardRef.current)}
        >
          {content}
        </textarea>
        <div className="flex items-center justify-between">
          <span className="text-sm font-normal">June 7, 2026</span>
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
