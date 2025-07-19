import express from "express";
import { verifyToken } from "../middleware/authenticateToken.js";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  searchNote,
  updateNotePinned,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/add", verifyToken, addNote);
router.post("/edit/:noteId", verifyToken, editNote);
router.get("/all", verifyToken, getAllNotes);
router.delete("/delete/:noteId", verifyToken, deleteNote);
router.put("/update-note-pinned/:noteId", verifyToken, updateNotePinned);
router.get("/search", verifyToken, searchNote);

export default router;
