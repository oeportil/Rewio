import { Router } from "express";
import appointmentController from "../controllers/appointmentController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();

router.use(authMiddleware)
router.post('/', idempotencyMiddleware, appointmentController.create);
router.get('/my', appointmentController.myAppointments);
router.get('/:id/doctor', appointmentController.getDoctorAppointments);
router.get('/:id/clinic', appointmentController.getClinicAppointments);
router.put('/:id/cancel', appointmentController.cancel);
router.put('/:id/done', appointmentController.done);
router.put('/:id/confirm', appointmentController.confirm);
router.patch("/reschedule/:id", appointmentController.reschedule);

export default router;
