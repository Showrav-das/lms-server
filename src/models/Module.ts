import mongoose from "mongoose";
const { Schema } = mongoose;

interface IModule {
  title: string;
  moduleNumber: number;
  course: mongoose.Types.ObjectId;
  lectures: mongoose.Types.ObjectId[];
}

const ModuleSchema = new Schema<IModule>({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  moduleNumber: {
    type: Number,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  lectures: [
    {
      type: Schema.Types.ObjectId,
      ref: "Lecture",
    },
  ],
});
ModuleSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const Module = mongoose.model<IModule>("Module");
      // Find the highest moduleNumber within the same course
      const highestModule = await Module.findOne(
        { course: this.course },
        "moduleNumber"
      )
        .sort({ moduleNumber: -1 })
        .limit(1);

      // If no modules exist for this course, start with 1, otherwise increment the highest number
      this.moduleNumber = highestModule ? highestModule.moduleNumber + 1 : 1;
      next();
    } catch (error) {
      return next(error as Error);
    }
  } else {
    next();
  }
});

// Add compound index to ensure uniqueness of moduleNumber within each course
ModuleSchema.index({ course: 1, moduleNumber: 1 }, { unique: true });

export default mongoose.model<IModule>("Module", ModuleSchema);
