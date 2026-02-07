import { Router } from "express";
import doctorController from "../controllers/doctorController";

const router = Router();

router.post('/', doctorController.create)
router.get('/:clinicId', doctorController.getMyDoctorsByClinic)
router.get('/:clinicId/:doctorId', doctorController.getDoctorById)
router.patch('/:clinicId', doctorController.update)
router.put('/:clinicId', doctorController.changeStatus)
router.delete('/:clinicId/:doctorId', doctorController.delete)

export default router;