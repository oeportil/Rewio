import { Router } from "express";
import vacationController from "../controllers/vacationController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();
router.use(authMiddleware)
router.post("/vacations", idempotencyMiddleware, vacationController.create)
router.get("/vacations", vacationController.getByDoctor) // ?doctorId=
router.delete("/vacations/:id", vacationController.delete)

export default router;