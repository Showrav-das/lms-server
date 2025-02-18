import { Request, Response } from "express";
import Course from "../models/Course";
import Lecture from "../models/Lecture";
import Module from "../models/Module";

// create course
export const createCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, price, description } = req.body;
    // if (!req.file) {
    //   res.status(400).json({ error: "Image is required" });
    //   return;
    // }

    const newCourse = new Course({
      // image: req.file.path,
      title,
      price: Number(price),
      description,
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course uploaded successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Course
export const updateCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, price, description } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      {
        title,
        price: Number(price),
        description,
        image: req.file ? req.file.path : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Course
export const deleteCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    // Delete related modules and their lectures
    for (const moduleId of course.modules) {
      await Lecture.deleteMany({ module: moduleId });
      await Module.findByIdAndDelete(moduleId);
    }

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all courses
export const getAllCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await Course.find().populate("modules");
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single course by ID
export const getCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate({
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
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
