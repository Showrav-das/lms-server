"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLecture = exports.updateLecture = exports.getLecturesByModule = exports.createLecture = void 0;
const Lecture_1 = __importDefault(require("../models/Lecture"));
// import { upload } from '../utils/upload';
// Create a new lecture
const createLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, videoUrl, moduleId } = req.body;
        // const pdfNotes = req.files?.pdfNotes?.map((file: any) => file.path);
        const newLecture = new Lecture_1.default({ title, videoUrl, moduleId });
        yield newLecture.save();
        res.status(201).json(newLecture);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating lecture", error });
    }
});
exports.createLecture = createLecture;
// Get all lectures for a module
const getLecturesByModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { moduleId } = req.params;
        const lectures = yield Lecture_1.default.find({ moduleId });
        res.status(200).json(lectures);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching lectures", error });
    }
});
exports.getLecturesByModule = getLecturesByModule;
// Update a lecture
const updateLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, videoUrl } = req.body;
        //   const pdfNotes = req.files?.pdfNotes?.map((file: any) => file.path);
        const updatedData = { title, videoUrl };
        //   if (pdfNotes) updatedData.pdfNotes = pdfNotes;
        const updatedLecture = yield Lecture_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        if (!updatedLecture) {
            res.status(404).json({ message: "Lecture not found" });
            return;
        }
        res.status(200).json(updatedLecture);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating lecture", error });
    }
});
exports.updateLecture = updateLecture;
// Delete a lecture
const deleteLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedLecture = yield Lecture_1.default.findByIdAndDelete(id);
        if (!deletedLecture) {
            res.status(404).json({ message: "Lecture not found" });
        }
        res.status(200).json({ message: "Lecture deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting lecture", error });
    }
});
exports.deleteLecture = deleteLecture;
