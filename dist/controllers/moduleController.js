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
exports.deleteModule = exports.updateModule = exports.addModule = exports.getModuleById = exports.getAllModules = void 0;
const Module_1 = __importDefault(require("../models/Module"));
const Course_1 = __importDefault(require("../models/Course"));
const Lecture_1 = __importDefault(require("../models/Lecture"));
// Get all modules
const getAllModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modules = yield Module_1.default.find().populate("lectures");
        res.status(200).json({ modules });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving modules", error });
    }
});
exports.getAllModules = getAllModules;
// Get a single module by ID
const getModuleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const module = yield Module_1.default.findById(id).populate("lectures");
        if (!module) {
            res.status(404).json({ message: "Module not found" });
            return;
        }
        res.status(200).json({ module });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving module", error });
    }
});
exports.getModuleById = getModuleById;
// crete module
const addModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, courseId } = req.body;
        const course = yield Course_1.default.findById(courseId);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        const newModule = yield Module_1.default.create({ title, course: courseId });
        course.modules.push(newModule._id);
        yield course.save();
        res.status(201).json(newModule);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding module", error });
    }
});
exports.addModule = addModule;
/**
 * Update a module
 */
const updateModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { moduleId } = req.params;
        const { title } = req.body;
        const updatedModule = yield Module_1.default.findByIdAndUpdate(moduleId, { title }, { new: true, runValidators: true });
        if (!updatedModule) {
            res.status(404).json({ message: "Module not found" });
            return;
        }
        res.status(200).json(updatedModule);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating module", error });
    }
});
exports.updateModule = updateModule;
/**
 * Delete a module
 */
const deleteModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log("id", id);
        yield Lecture_1.default.deleteMany({ module: id });
        const module = yield Module_1.default.findById(id);
        if (!module) {
            res.status(404).json({ message: "Module not found" });
            return;
        }
        // Remove the module reference from the course
        yield Course_1.default.findByIdAndUpdate(module.course, {
            $pull: { modules: id },
        });
        yield Module_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Module deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting module", error });
    }
});
exports.deleteModule = deleteModule;
