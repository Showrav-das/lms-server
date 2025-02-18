import { Request, Response } from "express";
import Lecture from "../models/Lecture";
// import { upload } from '../utils/upload';

// Create a new lecture
export const createLecture = async (req: Request, res: Response) => {
  try {
    const { title, videoUrl, moduleId } = req.body;
    // const pdfNotes = req.files?.pdfNotes?.map((file: any) => file.path);

    const newLecture = new Lecture({ title, videoUrl, moduleId });
    await newLecture.save();

    res.status(201).json(newLecture);
  } catch (error) {
    res.status(500).json({ message: "Error creating lecture", error });
  }
};

// Get all lectures for a module
export const getLecturesByModule = async (req: Request, res: Response) => {
  try {
    const { moduleId } = req.params;
    const lectures = await Lecture.find({ moduleId });
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: "Error fetching lectures", error });
  }
};

// Update a lecture
export const updateLecture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, videoUrl } = req.body;
    //   const pdfNotes = req.files?.pdfNotes?.map((file: any) => file.path);

    const updatedData: any = { title, videoUrl };
    //   if (pdfNotes) updatedData.pdfNotes = pdfNotes;

    const updatedLecture = await Lecture.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedLecture) {
      res.status(404).json({ message: "Lecture not found" });
      return;
    }

    res.status(200).json(updatedLecture);
  } catch (error) {
    res.status(500).json({ message: "Error updating lecture", error });
  }
};

// Delete a lecture
export const deleteLecture = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedLecture = await Lecture.findByIdAndDelete(id);

    if (!deletedLecture) {
      res.status(404).json({ message: "Lecture not found" });
    }

    res.status(200).json({ message: "Lecture deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting lecture", error });
  }
};
