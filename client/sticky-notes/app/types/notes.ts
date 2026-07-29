export type Note = {
  id: number;
  x: number;
  y: number;
  title: string;
  content: string;
  theme: NoteTheme;
  updated_at: Date;
  zIndex: number;
};

export type NoteTheme = "blue" | "mint" | "red" | "yellow";

export type CardNoteProps = {
  x: number;
  y: number;
  id: number;
  title: string;
  content: string;
  theme: NoteTheme;
  updated_at: Date;
  onSelect: () => void;
  onDelete: (id: number) => void;
  updateNotePos: (
    position: { x: number; y: number },
    id: number
  ) => Promise<void>;
  zIndex: number;
};

export type CreateNoteInput = {
  x: number;
  y: number;
  title: string;
  content: string;
  theme: NoteTheme;
};
