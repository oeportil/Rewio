import { Request, Response } from "express";
import BaseController from "./baseController";
import { cancelAppointment, confirmAppointment, createAppointment, doneAppointment, getClinicAppointments, getDoctorAppointments, getMyAppointments, rescheduleAppointment } from "../services/appointmentService";

class appointmentController extends BaseController {

    //for clients
    static create(req: Request, res: Response) {
        appointmentController.handle(res, () => createAppointment(req))
    }


    static getDoctorAppointments(req: Request, res: Response) {


        return appointmentController.handle(res, () =>
            getDoctorAppointments(req)
        )
    }

    static getClinicAppointments(req: Request, res: Response) {


        return appointmentController.handle(res, () =>
            getClinicAppointments(req)
        )
    }

    static myAppointments(req: Request, res: Response) {
        return appointmentController.handle(res, () => getMyAppointments(req))
    }

    static confirm(req: Request, res: Response) {
        return appointmentController.handle(res, () =>
            confirmAppointment(req)
        )
    }

    static cancel(req: Request, res: Response) {
        return appointmentController.handle(res, () =>
            cancelAppointment(req)
        )
    }

    static done(req: Request, res: Response) {
        return appointmentController.handle(res, () =>
            doneAppointment(req)
        )
    }

    static reschedule(req: Request, res: Response) {
        return appointmentController.handle(res, () => rescheduleAppointment(req));
    }

}

export default appointmentController;