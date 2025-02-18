"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const moduleRoutes_1 = __importDefault(require("./routes/moduleRoutes"));
const lectureRoutes_1 = __importDefault(require("./routes/lectureRoutes"));
const db_1 = __importDefault(require("./utils/db"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/uploads", express_1.default.static("uploads"));
// Connect to MongoDB
(0, db_1.default)();
// Routes
app.use("/api", userRoutes_1.default);
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", courseRoutes_1.default);
app.use("/api", moduleRoutes_1.default);
app.use("/api", lectureRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
