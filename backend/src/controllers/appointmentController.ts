import { Request, Response } from "express";
import BaseController from "./baseController";
import { cancelAppointment, confirmAppointment, createAppointment, doneAppointment, getClinicAppointments, getDoctorAppointments, getMyAppointments, rescheduleAppointment } from "../services/appointmentService";

class appointmentController extends BaseController {

    //for clients
    static create(req: Request, res: Response) {
        this.handle(res, () => createAppointment(req))
    }


    static getDoctorAppointments(req: Request, res: Response) {
        const { id } = req.params
        const { date } = req.query

        return this.handle(res, () =>
            getDoctorAppointments(Number(id), date as string)
        )
    }

    static getClinicAppointments(req: Request, res: Response) {
        const { id } = req.params
        const { date } = req.query

        return this.handle(res, () =>
            getClinicAppointments(Number(id), date as string)
        )
    }

    static myAppointments(req: Request, res: Response) {
        return this.handle(res, () => getMyAppointments(req))
    }

    static confirm(req: Request, res: Response) {
        return this.handle(res, () =>
            confirmAppointment(req)
        )
    }

    static cancel(req: Request, res: Response) {
        return this.handle(res, () =>
            cancelAppointment(req)
        )
    }

    static done(req: Request, res: Response) {
        return this.handle(res, () =>
            doneAppointment(req)
        )
    }

    static reschedule(req: Request, res: Response) {
        return this.handle(res, () => rescheduleAppointment(req));
    }

}

export default appointmentController;