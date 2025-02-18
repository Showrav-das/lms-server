"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const courseController_1 = require("../controllers/courseController");
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/courses", upload.single("image"), courseController_1.createCourse);
router.put("/course/:id", courseController_1.updateCourse);
router.get("/courses", courseController_1.getAllCourses);
router.get("/course/:id", courseController_1.getCourseById);
router.delete("/course/:id", courseController_1.deleteCourse);
exports.default = router;
