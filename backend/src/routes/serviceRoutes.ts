import { Router } from "express";
import serviceController from "../controllers/serviceController";
import { authMiddleware } from "../middlewares";

const router = Router();
router.use(authMiddleware)
router.post("/", serviceController.create);
router.get("/", serviceController.getByClinic);
router.put("/:id", serviceController.update);
router.delete("/:id", serviceController.delete);

export default router;