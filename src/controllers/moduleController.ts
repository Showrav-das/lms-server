import Module from "../models/Module";
import Course from "../models/Course";
import { Request, Response } from "express";
import Lecture from "../models/Lecture";

// Get all modules
export const getAllModules = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const modules = await Module.find().populate("lectures");
    res.status(200).json({ modules });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving modules", error });
  }
};

// Get a single module by ID
export const getModuleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const module = await Module.findById(id).populate("lectures");
    if (!module) {
      res.status(404).json({ message: "Module not found" });
      return;
    }

    res.status(200).json({ module });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving module", error });
  }
};

// crete module
export const addModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, selectedValue } = req.body;
    console.log("module", req.body);

    const course = await Course.findById(selectedValue);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    const newModule = await Module.create({ title, course: selectedValue });

    course.modules.push(newModule._id);
    await course.save();

    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ message: "Error adding module", error });
  }
};

/**
 * Update a module
 */
export const updateModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { moduleId } = req.params;
    const { title } = req.body;

    const updatedModule = await Module.findByIdAndUpdate(
      moduleId,
      { title },
      { new: true, runValidators: true }
    );

    if (!updatedModule) {
      res.status(404).json({ message: "Module not found" });
      return;
    }

    res.status(200).json(updatedModule);
  } catch (error) {
    res.status(500).json({ message: "Error updating module", error });
  }
};

/**
 * Delete a module
 */
export const deleteModule = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    console.log("id", id);
    await Lecture.deleteMany({ module: id });
    const module = await Module.findById(id);
    if (!module) {
      res.status(404).json({ message: "Module not found" });
      return;
    }

    // Remove the module reference from the course
    await Course.findByIdAndUpdate(module.course, {
      $pull: { modules: id },
    });

    await Module.findByIdAndDelete(id);

    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting module", error });
  }
};
