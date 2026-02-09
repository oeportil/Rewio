import { Router } from "express"
import AgendaController from "../controllers/agendaController"
import { authMiddleware } from "../middlewares"

const router = Router()

router.use(authMiddleware)
router.get("/doctor/:doctorId", AgendaController.doctorAgenda)
router.get("/clinic/:clinicId", AgendaController.clinicAgenda)

export default router
