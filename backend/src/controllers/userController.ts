import { Request, Response } from "express";
import { changePassword, getMe, login, saveUser, updateMe } from "../services/userServices.";
import BaseController from "./baseController";


class userController extends BaseController {

    static login(req: Request, res: Response) {
        const { email, password } = req.body;

        return this.handle<{ token: string }>(res, () => login(email, password));
    }

    static saveUser(req: Request, res: Response) {
        return this.handle<Boolean>(
            res,
            () => saveUser(req.body),
            "Usuario creado correctamente"
        );
    }

    static getMe(req: Request, res: Response) {
        return this.handle(res, () => getMe(req))
    }

    static updateMe(req: Request, res: Response) {
        return this.handle(res, () => updateMe(req), "Perfil actualizado")
    }

    static changePassword(req: Request, res: Response) {
        return this.handle(res, () => changePassword(req), "Contraseña actualizada")
    }

}

export default userController