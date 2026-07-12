import { Router } from "express";
import NotesController from "../controller/NotesController.js";

const router = Router();

router.post('/' , NotesController.createNote);

export default router;
