import { Router } from "express";
import blockController from "../controllers/blockController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();

router.use(authMiddleware)
router.post("/", idempotencyMiddleware, blockController.create)
router.get("/:id", blockController.getByDoctor)       // ?doctorId=&date=
router.delete("/:id", blockController.delete)

export default router;
