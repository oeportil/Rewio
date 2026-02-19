import { Router } from "express";
import blockController from "../controllers/blockController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();

router.use(authMiddleware)
router.post("/blocks", idempotencyMiddleware, blockController.create)
router.get("/blocks", blockController.getByDoctor)       // ?doctorId=&date=
router.delete("/blocks/:id", blockController.delete)

export default router;
