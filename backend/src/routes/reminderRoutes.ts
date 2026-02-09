import { Router } from "express";
import reminderController from "../controllers/reminderController";
import { authMiddleware } from "../middlewares";

const router = Router();
router.use(authMiddleware)
router.post("/send", reminderController.send);
export default router;
