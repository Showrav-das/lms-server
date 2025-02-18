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
exports.getAdminDashboard = exports.getUserDashboard = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = "wendfe445fnkdf";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = new User_1.default({ username, email, password: hashedPassword, role });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        const isMatch = bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, {
            expiresIn: "30d",
        });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Error logging in" });
    }
});
exports.login = login;
const getUserDashboard = (req, // Changed from Request to AuthenticatedRequest
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }
        const user = yield User_1.default.findById(req.user.id).select("-password");
        console.log("user", user);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json({ message: "User Dashboard", user });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching user data" });
    }
});
exports.getUserDashboard = getUserDashboard;
// export const getUserDashboard = async (
//   req: AuthenticatedRequest,
//   res: Response
// ) => {
//   try {
//     if (!req.user) {
//       return res.status(401).json({ error: "User not authenticated" });
//     }
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     res.json({ message: "User Dashboard", user });
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching user data" });
//   }
// };
const getAdminDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find().select("-password");
        res.json({ message: "Admin Dashboard", users });
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching admin data" });
    }
});
exports.getAdminDashboard = getAdminDashboard;
