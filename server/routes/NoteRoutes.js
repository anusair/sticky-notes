import { Router } from "express";
import NotesController from "../controller/NotesController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get("/", authenticate, NotesController.getAllNotes);
router.post("/", authenticate, NotesController.createNote);
router.delete("/:id", NotesController.deleteNote);
router.patch("/:id", NotesController.updateNote);
router.put("/:id/position", NotesController.updatePosition);
router.put("/:id/theme", NotesController.updateNoteTheme);

export default router;
