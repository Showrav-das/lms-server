import express from "express";
import {
  createLecture,
  deleteLecture,
  getLecturesByModule,
  updateLecture,
} from "../controllers/lectureController";
import upload from "../utils/upload";

const router = express.Router();

// router.post("/lecture", createLecture);

router.post("/lecture", upload.array("notes", 10), createLecture);

// Get all lectures for a module
router.get("/lectures/:moduleId", getLecturesByModule);

// Update a lecture
// router.put('/:id', upload.array('pdfNotes'), updateLecture);
router.put("/lecture/:id", updateLecture);
// Delete a lecture
router.delete("/lecture/:id", deleteLecture);

export default router;
