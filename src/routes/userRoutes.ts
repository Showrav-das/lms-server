import express from "express";
import {
  getAdminDashboard,
  getUserDashboard,
  login,
  register,
} from "../controllers/userController";
import { authenticate, authorize } from "../utils/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/user/dashboard",
  authenticate,
  authorize("user"),
  getUserDashboard
);
router.get(
  "/admin/dashboard",
  authenticate,
  authorize("admin"),
  getAdminDashboard
);
// router.get("/profile", authenticate, getProfile);

export default router;
