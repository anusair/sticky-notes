import { Router } from "express";
import UsersController from "../controller/UsersController.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get('/me' , authenticate, UsersController.getUserById);
router.post('/login' , UsersController.login);

export default router;