import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import NoteRoutes from "./routes/NoteRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";

import errorHandler from "./middleware/ErrorHandler.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);
app.use(express.json());

app.use(cookieParser());

app.use("/api/notes", NoteRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.use(errorHandler); // should be included at the end of the app.

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
