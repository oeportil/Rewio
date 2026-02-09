import { Request, Response } from "express"
import BaseController from "./baseController"
import { createBlock, deleteBlock, getBlocksByDoctor } from "../services/blockService"

class blockController extends BaseController {

    static create(req: Request, res: Response) {
        this.handle(res, () => createBlock(req))
    }

    static getByDoctor(req: Request, res: Response) {
        const { doctorId } = req.query
        const { date } = req.query

        this.handle(res, () =>
            getBlocksByDoctor(Number(doctorId), date as string)
        )
    }

    static delete(req: Request, res: Response) {
        const { id } = req.params
        this.handle(res, () => deleteBlock(Number(id), req))
    }
}

export default blockController
