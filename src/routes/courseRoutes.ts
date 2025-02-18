import express from "express";
import multer from "multer";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controllers/courseController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/courses", upload.single("image"), createCourse);
router.put("/course/:id", updateCourse);
router.get("/courses", getAllCourses);
router.get("/course/:id", getCourseById);
router.delete("/course/:id", deleteCourse);

export default router;
