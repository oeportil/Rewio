import { Request, Response } from "express";
import { login, saveUser } from "../services/userServices.";
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

}

export default userController