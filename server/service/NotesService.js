import Notes from "../models/Notes.js";

export default class NotesService {
  static async createNote(title, content, x, y, theme, user_id) {
    const note = await Notes.create(title, content, x, y, theme, user_id);
    return note;
  }

  static async getAllNotes(user_id) {
    const notes = await Notes.getAll(user_id);
    return notes;
  }

  static async updateNote(id, title, content, theme) {
    const note = await Notes.updateNote(id, title, content, theme);
    console.log("updated note from service!!", title, content, theme);
    return note;
  }

  static async updatePosition(id, x, y) {
    const note = await Notes.updatePosition(id, x, y);
    return note;
  }

  static async deleteNote(id) {
    await Notes.deleteNote(id);
  }

  static async updateNoteTheme(id, theme) {
    return await Notes.updateNoteTheme(id, theme);
  }
}
