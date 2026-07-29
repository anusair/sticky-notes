import NotesService from "../service/NotesService.js";

export default class NotesController {
  static async createNote(req, res) {
    try {
      const user_id = req.user.id;
      const { title, content, x, y, theme } = req.body;

      console.log("creating new note for a specific user: ", title, content, x, y, theme, user_id);
      const note = await NotesService.createNote(title, content, x, y, theme , user_id);
      res.status(201).json(note);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllNotes(req, res) {
    try {
      const user_id = req.user.id;
      const notes = await NotesService.getAllNotes(user_id);

      return res
        .status(200)
        .json({ message: "Notes retrieved successfully", notes: notes || [] });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updateNote(req, res) {
    try {
      const { id } = req.params;
      const { title, content, theme } = req.body;

      console.log("updated note from controller!!", req.body);
      const note = await NotesService.updateNote(id, title, content, theme);
      return res
        .status(200)
        .json({ message: "Note update successfully", note });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async updatePosition(req, res) {
    try {
      const { id } = req.params;
      const { x, y } = req.body;

      const note = await NotesService.updatePosition(id, x, y);

      return res
        .status(200)
        .json({ message: "Note position updated successfully", note });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  static async deleteNote(req, res) {
    try {
      const { id } = req.params;

      await NotesService.deleteNote(id);

      return res.status(200).json({ messaeg: "note deleted successfully!" });
    } catch (error) {
      return res.status(500).json({ error: "Error occurs: " + error });
    }
  }

  static async updateNoteTheme(req, res) {
    try {
      const { id } = req.params;

      const { theme } = req.body;

      console.log("recieved color theme: " + theme);

      await NotesService.updateNoteTheme(id, theme);

      return res
        .status(200)
        .json({ message: "message theme updated successfully. " });
    } catch (error) {
      return res
        .status(500)
        .json({
          error: "Error occurs when changing note's color theme, ",
          error,
        });
    }
  }
}
