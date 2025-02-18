"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lectureController_1 = require("../controllers/lectureController");
const router = express_1.default.Router();
router.post("/lecture", lectureController_1.createLecture);
// router.post('/', upload.array('pdfNotes'), createLecture);
// Get all lectures for a module
router.get("/lectures/:moduleId", lectureController_1.getLecturesByModule);
// Update a lecture
// router.put('/:id', upload.array('pdfNotes'), updateLecture);
router.put("/lecture/:id", lectureController_1.updateLecture);
// Delete a lecture
router.delete("/lecture/:id", lectureController_1.deleteLecture);
exports.default = router;
