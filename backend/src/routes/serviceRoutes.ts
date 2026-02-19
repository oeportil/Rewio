import { Router } from "express";
import serviceController from "../controllers/serviceController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();
router.use(authMiddleware)
router.post("/", idempotencyMiddleware, serviceController.create);
router.get("/:id", serviceController.getByClinic);
router.put("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);

export default router;