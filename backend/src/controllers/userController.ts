import { Request, Response } from "express";
import { changePassword, clinicOwners, deleteUser, getAllUsers, getMe, login, saveUser, updateMe } from "../services/userServices.";
import BaseController from "./baseController";


class userController extends BaseController {

    static login(req: Request, res: Response) {
        const { email, password } = req.body;

        return userController.handle<{ token: string }>(res, () => login(email, password));
    }

    static saveUser(req: Request, res: Response) {
        return userController.handle<{ token: string }>(
            res,
            () => saveUser(req.body),
            "Usuario creado correctamente"
        );
    }

    static getMe(req: Request, res: Response) {
        return userController.handle(res, () => getMe(req))
    }

    static updateMe(req: Request, res: Response) {
        return userController.handle(res, () => updateMe(req), "Perfil actualizado")
    }

    static changePassword(req: Request, res: Response) {
        return userController.handle(res, () => changePassword(req), "Contraseña actualizada")
    }

    static getAll(req: Request, res: Response) {
        return userController.handle(res, () => getAllUsers(req))
    }

    static getAllClinicOwners(req: Request, res: Response) {
        return userController.handle(res, () => clinicOwners(req))
    }

    static deleteUser(req: Request, res: Response) {
        return userController.handle(res, () => deleteUser(req))
    }

}

export default userController