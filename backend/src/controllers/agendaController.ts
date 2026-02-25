import { Request, Response } from "express"
import BaseController from "./baseController"
import {
    getDoctorAgenda,
    getClinicAgenda
} from "../services/agendaService"

class AgendaController extends BaseController {

    static doctorAgenda(req: Request, res: Response) {

        return AgendaController.handle(res, () =>
            getDoctorAgenda(req)
        )
    }

    static clinicAgenda(req: Request, res: Response) {


        return AgendaController.handle(res, () =>
            getClinicAgenda(req)
        )
    }

}

export default AgendaController
