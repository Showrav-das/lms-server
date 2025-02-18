"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "wendfe445fnkdf";
const authenticate = (req, res, next) => {
    var _a;
    const token = (_a = req.header("authentication")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log("decode", decoded);
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.authenticate = authenticate;
const authorize = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized - No user found" });
            return;
        }
        if (req.user.role !== role) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
