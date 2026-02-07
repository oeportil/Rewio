import { Response } from "express";
import { IResponse } from "../types/Response";

export default abstract class BaseController {

    protected static async handle<T>(
        res: Response,
        action: () => Promise<T>,
        successMsg = ""
    ) {
        const response: IResponse<T | null> = {
            status: false,
            msg: "",
            value: null
        };

        try {
            response.value = await action();
            response.status = true;
            response.msg = successMsg;
        } catch (error: any) {
            response.status = false;
            response.msg = error.message || "Internal server error";
            console.error(error);
        }

        res.send(response);
    }
}
