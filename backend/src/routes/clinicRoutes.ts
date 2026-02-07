import { Router } from "express";
import clinicController from "../controllers/clinicController";

const router = Router();

router.post('/', clinicController.create)
router.get('/', clinicController.getAll)
router.get('/my-clinic', clinicController.getMyClinic)
router.get('/:id', clinicController.getById)
router.put('/:id', clinicController.changeStatus)
router.patch('/:id', clinicController.update)
router.get('/slug/:slug', clinicController.getBySlug)



export default router;