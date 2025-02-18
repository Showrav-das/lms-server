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
exports.getCourseById = exports.getAllCourses = exports.deleteCourse = exports.updateCourse = exports.createCourse = void 0;
const Course_1 = __importDefault(require("../models/Course"));
const Lecture_1 = __importDefault(require("../models/Lecture"));
const Module_1 = __importDefault(require("../models/Module"));
// create course
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, price, description } = req.body;
        // if (!req.file) {
        //   res.status(400).json({ error: "Image is required" });
        //   return;
        // }
        const newCourse = new Course_1.default({
            // image: req.file.path,
            title,
            price: Number(price),
            description,
        });
        yield newCourse.save();
        res
            .status(201)
            .json({ message: "Course uploaded successfully", course: newCourse });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.createCourse = createCourse;
// Update Course
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, price, description } = req.body;
        const updatedCourse = yield Course_1.default.findByIdAndUpdate(id, {
            title,
            price: Number(price),
            description,
            image: req.file ? req.file.path : undefined,
        }, { new: true, runValidators: true });
        if (!updatedCourse) {
            res.status(404).json({ error: "Course not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Course updated successfully", course: updatedCourse });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.updateCourse = updateCourse;
// Delete Course
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield Course_1.default.findById(id);
        if (!course) {
            res.status(404).json({ error: "Course not found" });
            return;
        }
        // Delete related modules and their lectures
        for (const moduleId of course.modules) {
            yield Lecture_1.default.deleteMany({ module: moduleId });
            yield Module_1.default.findByIdAndDelete(moduleId);
        }
        const deletedCourse = yield Course_1.default.findByIdAndDelete(id);
        if (!deletedCourse) {
            res.status(404).json({ error: "Course not found" });
            return;
        }
        res.status(200).json({ message: "Course deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.deleteCourse = deleteCourse;
// Get all courses
const getAllCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_1.default.find().populate("modules");
        res.status(200).json({ courses });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getAllCourses = getAllCourses;
// Get a single course by ID
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield Course_1.default.findById(id).populate({
            path: "modules",
            populate: {
                path: "lectures",
                model: "Lecture",
            },
        });
        if (!course) {
            res.status(404).json({ error: "Course not found" });
            return;
        }
        res.status(200).json({ course });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCourseById = getCourseById;
