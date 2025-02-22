import express from "express";
import multer from "multer";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../controllers/courseController";
import { authenticate, authorize } from "../utils/authMiddleware";
// import upload from "../utils/upload";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/courses",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  createCourse
);
router.put(
  "/course/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  updateCourse
);
router.get("/courses", getAllCourses);
router.get("/course/:id", getCourseById);
router.delete("/course/:id", deleteCourse);

export default router;
