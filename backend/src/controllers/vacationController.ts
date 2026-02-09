import { Request, Response } from "express"
import BaseController from "./baseController"
import {
    createVacation,
    getVacationsByDoctor,
    deleteVacation
} from "../services/vacationService"

class vacationController extends BaseController {

    static create(req: Request, res: Response) {
        return this.handle(res, () => createVacation(req))
    }

    static getByDoctor(req: Request, res: Response) {
        return this.handle(res, () => getVacationsByDoctor(req))
    }

    static delete(req: Request, res: Response) {
        return this.handle(res, () => deleteVacation(req))
    }

}

export default vacationController
