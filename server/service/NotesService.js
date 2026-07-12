import Notes from "../models/Notes.js";

export default class NotesService {
    static async createNote(title, content, x, y, theme) {
        const note = await Notes.create(title, content, x, y, theme);
        return note;
    }
}