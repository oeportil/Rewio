import { Request, Response } from "express"
import BaseController from "./baseController"
import { createBlock, deleteBlock, getBlocksByDoctor } from "../services/blockService"

class blockController extends BaseController {

    static create(req: Request, res: Response) {
        blockController.handle(res, () => createBlock(req))
    }

    static getByDoctor(req: Request, res: Response) {
        const { id } = req.params
        const { date } = req.query

        blockController.handle(res, () =>
            getBlocksByDoctor(Number(id), date as string)
        )
    }

    static delete(req: Request, res: Response) {
        const { id } = req.params
        blockController.handle(res, () => deleteBlock(Number(id), req))
    }
}

export default blockController
