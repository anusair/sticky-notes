"use client";

import { useState } from "react";
import CardNote from "./CardNote";

// represens the container for the sticky notes.
function Board() {
  const [cards, setCards] = useState([
    {
      id: 1,
      x: 10,
      y: 12,
      content: "First note on this project for real!",
      title: "First Note",
    },
    {
      id: 2,
      x: 100,
      y: 200,
      content: "Second note on this project for real!",
      title: "Second Note",
    },
  ]);

  return (
    <div
      className="relative min-h-screen w-full"
    >

      {cards.map((card) => (
        <CardNote
          key={card.id}
          x={card.x}
          y={card.y}
          id={card.id}
          content={card.content}
          title={card.title}
        />
      ))}
    </div>
  );
}

export default Board;
