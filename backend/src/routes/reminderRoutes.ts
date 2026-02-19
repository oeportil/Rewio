import { Router } from "express";
import reminderController from "../controllers/reminderController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();
router.use(authMiddleware)
router.post("/send", idempotencyMiddleware, reminderController.send);
export default router;
