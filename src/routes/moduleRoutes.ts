import express from "express";
import {
  addModule,
  deleteModule,
  getAllModules,
  getModuleById,
  updateModule,
} from "../controllers/moduleController";

const router = express.Router();

router.get("/modules", getAllModules);
router.get("/module/:id", getModuleById);
router.post("/modules", addModule);
router.put("/modules/:id", updateModule);
router.delete("/modules/:id", deleteModule);

export default router;
