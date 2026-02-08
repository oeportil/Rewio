import { Router } from "express";
import doctorController from "../controllers/doctorController";

const router = Router();

router.post('/', doctorController.create)
router.get('/:clinicId', doctorController.getMyDoctorsByClinic)
router.get('/:clinicId/:doctorId', doctorController.getDoctorById)
router.patch('/:clinicId', doctorController.update)
router.put('/:clinicId', doctorController.changeStatus)
router.delete('/:clinicId/:doctorId', doctorController.delete)


router.use('/schedules', (() => {
    const sche = Router()
    sche.post('/:clinicId/:doctorId', doctorController.createSchedule)
    sche.get('/:clinicId/:doctorId', doctorController.getSchedulesByDoctor)
    sche.put('/:clinicId/:doctorId', doctorController.replaceSchedules)
    sche.post('/:id', doctorController.deleteSchedules)
    return sche
})())

router.get('/schedules')


export default router;