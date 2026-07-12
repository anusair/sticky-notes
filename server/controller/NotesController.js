import NotesService from "../service/NotesService.js";

export default class NotesController {
    static async createNote(req, res) {
        try {
            const { title, content, x, y, theme } = req.body;

            console.log(title , content , x , y , theme);
            const note = NotesService.createNote(title, content, x, y, theme);
            res.status(201).json(note);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}