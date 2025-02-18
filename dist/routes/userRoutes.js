"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../utils/authMiddleware");
const router = express_1.default.Router();
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.get("/user/dashboard", authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)("user"), userController_1.getUserDashboard);
router.get("/admin/dashboard", authMiddleware_1.authenticate, (0, authMiddleware_1.authorize)("admin"), userController_1.getAdminDashboard);
// router.get("/profile", authenticate, getProfile);
exports.default = router;
