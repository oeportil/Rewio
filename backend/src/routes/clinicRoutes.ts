import { Router } from "express";
import clinicController from "../controllers/clinicController";
import { authMiddleware } from "../middlewares";

const router = Router();

router.use(authMiddleware)
router.post('/', clinicController.create)
router.get('/', clinicController.getAll)
router.get('/owner', clinicController.getMyClinics)
router.get('/my-clinic', clinicController.getMyClinic)
router.get('/:id', clinicController.getById)
router.put('/:id', clinicController.changeStatus)
router.patch('/:id', clinicController.update)
router.get('/slug/:slug', clinicController.getBySlug)



export default router;