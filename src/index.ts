import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes";
import courseRoutes from "./routes/courseRoutes";
import moduleRoutes from "./routes/moduleRoutes";
import lectureRoutes from "./routes/lectureRoutes";
import connectDB from "./utils/db";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
connectDB();
// Routes
app.use("/api", userRoutes);
app.use(express.urlencoded({ extended: true }));
app.use("/api", courseRoutes);
app.use("/api", moduleRoutes);
app.use("/api", lectureRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
