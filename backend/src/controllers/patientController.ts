import { Request, Response } from "express"
import BaseController from "./baseController"
import {
    createPatient,
    getPatientsByClinic,
    getPatientById,
    updatePatient,
    deletePatient,
    getPatientHistory
} from "../services/patientService"

class patientController extends BaseController {

    static create(req: Request, res: Response) {
        return patientController.handle(res, () => createPatient(req))
    }

    static getByClinic(req: Request, res: Response) {
        return patientController.handle(res, () => getPatientsByClinic(req))
    }

    static getById(req: Request, res: Response) {
        return patientController.handle(res, () => getPatientById(req))
    }

    static update(req: Request, res: Response) {
        return patientController.handle(res, () => updatePatient(req), "Paciente actualizado")
    }

    static delete(req: Request, res: Response) {
        return patientController.handle(res, () => deletePatient(req), "Paciente eliminado")
    }

    static history(req: Request, res: Response) {
        return patientController.handle(res, () => getPatientHistory(Number(req.params.id), req))
    }
}

export default patientController
