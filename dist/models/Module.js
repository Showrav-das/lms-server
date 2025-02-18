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
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const ModuleSchema = new Schema({
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
ModuleSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            try {
                const Module = mongoose_1.default.model("Module");
                // Find the highest moduleNumber within the same course
                const highestModule = yield Module.findOne({ course: this.course }, "moduleNumber")
                    .sort({ moduleNumber: -1 })
                    .limit(1);
                // If no modules exist for this course, start with 1, otherwise increment the highest number
                this.moduleNumber = highestModule ? highestModule.moduleNumber + 1 : 1;
                next();
            }
            catch (error) {
                return next(error);
            }
        }
        else {
            next();
        }
    });
});
// Add compound index to ensure uniqueness of moduleNumber within each course
ModuleSchema.index({ course: 1, moduleNumber: 1 }, { unique: true });
exports.default = mongoose_1.default.model("Module", ModuleSchema);
