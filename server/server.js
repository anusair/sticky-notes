import express from "express";
import cors from "cors";

import NoteRoutes from "./routes/NoteRoutes.js";

const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());

app.use("/api/notes", NoteRoutes);

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
