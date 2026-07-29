import axios from "axios";
import { CreateNoteInput, Note } from "../types/notes";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getNotes() {
  const response = await axios.get(`${API_URL}/api/notes`, {
    withCredentials: true,
  });

  return response.data.notes;
}

export async function createNote(note: CreateNoteInput) {
  console.log("sending request");
  const response = await axios.post<Note>(`${API_URL}/api/notes`, note, {
    withCredentials: true,
  });
  console.log("response: ", response);
  return response.data;
}

export async function updateNotePosition(
  id: number,
  position: Pick<Note, "x" | "y">
) {
  const response = await axios.put<Note>(
    `${API_URL}/api/notes/${id}/position`,
    position
  );

  return response.data;
}

export async function updateNoteTheme(id: number, theme: string) {
  const response = await axios.put<Note>(`${API_URL}/api/notes/${id}/theme`, {
    theme,
  });

  return response.data;
}

export async function updateNote(id: number, title: string, content: string) {
  await axios.patch(`${API_URL}/api/notes/${id}`, {
    title,
    content,
  });
}

export async function deleteNote(id: number) {
  await axios.delete(`${API_URL}/api/notes/${id}`);
}
