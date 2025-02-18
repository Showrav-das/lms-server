"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moduleController_1 = require("../controllers/moduleController");
const router = express_1.default.Router();
router.get("/modules", moduleController_1.getAllModules);
router.get("/module/:id", moduleController_1.getModuleById);
router.post("/modules", moduleController_1.addModule);
router.put("/modules/:id", moduleController_1.updateModule);
router.delete("/modules/:id", moduleController_1.deleteModule);
exports.default = router;
