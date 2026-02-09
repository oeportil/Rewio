import BaseController from "./baseController";
import { sendAppointmentReminders } from "../services/reminderService";
import { Request, Response } from "express";

class reminderController extends BaseController {
    static send(req: Request, res: Response) {
        return this.handle(res, () => sendAppointmentReminders());
    }
}

export default reminderController;
