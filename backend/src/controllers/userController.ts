import { Request, Response } from "express";
import { login, saveUser } from "../services/userServices.";
import { IResponse } from "../types/Response";


class userController {
    static async login(req: Request, res: Response) {
        const response: IResponse<string | undefined> = { msg: '', status: false, value: '' }
        const { email, password } = req.body
        try {
            response.status = true;
            response.value = await login(email, password);
        } catch (error: Error | any) {
            response.status = false;
            response.msg = error.message;
            console.error(error)
        }
        res.send(response);
        return;
    }

    static async saveUser(req: Request, res: Response) {
        const response: IResponse<boolean> = { msg: '', status: false, value: false }
        try {
            response.status = true;
            response.value = await saveUser(req.body);
            response.msg = "Usuario creado correctamente"
        } catch (error: Error | any) {
            response.status = false;
            response.msg = error.message;
            console.error(error)
        }
        res.send(response);
        return;
    }

}

export default userController