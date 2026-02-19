import { Router } from "express";
import patientController from "../controllers/patientController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();
router.use(authMiddleware)
router.post('/', idempotencyMiddleware, patientController.create);
router.get('/', patientController.getByClinic);
router.get('/:id', patientController.getById);
router.patch('/:id', patientController.update);
router.delete('/:id', patientController.delete);
router.get('/:id/history', patientController.history);

export default router;