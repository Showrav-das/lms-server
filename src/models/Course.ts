import mongoose, { Document, Schema, Types } from "mongoose";

export interface ICourse extends Document {
  title: string;
  price: string;
  description: string;
  image?: string;
  modules: Types.ObjectId[];
}

const CourseSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  modules: [{ type: Schema.Types.ObjectId, ref: "Module" }],
});

export default mongoose.model<ICourse>("Course", CourseSchema);
