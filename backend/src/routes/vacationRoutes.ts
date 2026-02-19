import { Router } from "express";
import vacationController from "../controllers/vacationController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();
router.use(authMiddleware)
router.post("/", idempotencyMiddleware, vacationController.create)
router.get("/:id", vacationController.getByDoctor) // ?doctorId=
router.delete("/:id", vacationController.delete)

export default router;