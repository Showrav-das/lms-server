import mongoose, { Schema } from "mongoose";

export interface ILecture extends Document {
  title: string;
  videoUrl: string;
  notes: string[];
  moduleId: mongoose.Schema.Types.ObjectId;
}
const LectureSchema: Schema = new Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  notes: { type: [String], default: [] },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true,
  },
});

// Automatically update the Module when a new Lecture is added
LectureSchema.post("save", async function () {
  const Module = mongoose.model("Module");
  await Module.findByIdAndUpdate(this.moduleId, {
    $push: { lectures: this._id },
  });
});
export default mongoose.model<ILecture>("Lecture", LectureSchema);
