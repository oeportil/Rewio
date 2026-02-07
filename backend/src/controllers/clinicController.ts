import { Request, Response } from "express";
import { login, saveUser } from "../services/userServices.";
import BaseController from "./baseController";
import { createClinic } from "../services/clinicService";


class clinicController extends BaseController {

    static create(req: Request, res: Response) {
        return this.handle(res, () => createClinic(req.body));
    }

    static getAll(req: Request, res: Response) {
        return this.handle(
            res,
            () => saveUser(req.body),
            "Usuario creado correctamente"
        );
    }

    static getById(req: Request, res: Response) {
        return this.handle(
            res,
            () => saveUser(req.body),
            "Usuario creado correctamente"
        );
    }

    static changeStatus(req: Request, res: Response) {
        return this.handle(
            res,
            () => saveUser(req.body),
            "Usuario creado correctamente"
        );
    }

    static update(req: Request, res: Response) {
        return this.handle(
            res,
            () => saveUser(req.body),
            "Usuario creado correctamente"
        );
    }

}

export default clinicController