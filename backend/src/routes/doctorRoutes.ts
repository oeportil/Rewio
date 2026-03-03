import { Router } from "express";
import doctorController from "../controllers/doctorController";
import { authMiddleware, idempotencyMiddleware } from "../middlewares";

const router = Router();

router.use(authMiddleware)
router.post('/', idempotencyMiddleware, doctorController.create)
router.get('/:clinicId', doctorController.getMyDoctorsByClinic)
router.get('/:id/availability/days', doctorController.availabilityDays)
router.get('/:id/availability/hours', doctorController.availabilityHours)
router.get('/:clinicId/:doctorId', doctorController.getDoctorById)
router.patch('/:clinicId/:doctorId', doctorController.update)
router.put('/:clinicId', doctorController.changeStatus)
router.delete('/:clinicId/:doctorId', doctorController.delete)


router.use('/schedules', (() => {
    const sche = Router()
    sche.post('/:clinicId/:doctorId', idempotencyMiddleware, doctorController.createSchedule)
    sche.get('/:clinicId/:doctorId', doctorController.getSchedulesByDoctor)
    sche.put('/:clinicId/:doctorId', doctorController.replaceSchedules)
    sche.delete('/:id', idempotencyMiddleware, doctorController.deleteSchedules)
    return sche
})())



export default router;