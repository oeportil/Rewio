import { Router } from "express";
import blockController from "../controllers/blockController";
import { authMiddleware } from "../middlewares";

const router = Router();

router.use(authMiddleware)
router.post("/blocks", blockController.create)
router.get("/blocks", blockController.getByDoctor)       // ?doctorId=&date=
router.delete("/blocks/:id", blockController.delete)

export default router;
