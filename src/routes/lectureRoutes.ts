import express from "express";
import {
  createLecture,
  deleteLecture,
  getLecturesByModule,
  updateLecture,
} from "../controllers/lectureController";

const router = express.Router();

router.post("/lecture", createLecture);

// router.post('/', upload.array('pdfNotes'), createLecture);

// Get all lectures for a module
router.get("/lectures/:moduleId", getLecturesByModule);

// Update a lecture
// router.put('/:id', upload.array('pdfNotes'), updateLecture);
router.put("/lecture/:id", updateLecture);
// Delete a lecture
router.delete("/lecture/:id", deleteLecture);

export default router;
