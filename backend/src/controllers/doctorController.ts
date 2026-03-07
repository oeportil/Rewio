import { Request, Response } from "express";
import BaseController from "./baseController";
import { changeDoctorStatus, createDoctor, createScheduleDoctor, deleteDoctor, deleteDoctorSchedule, getDoctorById, getMyDoctors, getSchedulesByDoctorId, replaceDoctorSchedules, updateDoctor, updateSchedule } from "../services/doctorService";
import { Doctor, DoctorSchedule } from "../generated/prisma";
import { getDoctorAvailabilityHours, getDoctorAvailableDays } from "../services/availabilityService";

class doctorController extends BaseController {

    static create(req: Request, res: Response) {
        doctorController.handle<Doctor>(res, () => createDoctor(req))
    }

    static getMyDoctorsByClinic(req: Request, res: Response) {
        doctorController.handle(res, () => getMyDoctors(req))
    }
    static getDoctorById(req: Request, res: Response) {
        doctorController.handle<Doctor | null>(res, () => getDoctorById(req))
    }
    static update(req: Request, res: Response) {
        doctorController.handle<Doctor>(res, () => updateDoctor(req))
    }
    static changeStatus(req: Request, res: Response) {
        doctorController.handle<Doctor>(res, () => changeDoctorStatus(req))
    }
    static delete(req: Request, res: Response) {
        doctorController.handle<Doctor>(res, () => deleteDoctor(req))
    }


    static availabilityDays(req: Request, res: Response) {
        const { id } = req.params
        const { service, year, month } = req.query

        return doctorController.handle(res, () =>
            getDoctorAvailableDays(Number(id), Number(service), Number(year), Number(month))
        )
    }

    static availabilityHours(req: Request, res: Response) {
        const { id } = req.params
        const { service, date } = req.query

        return doctorController.handle(res, () =>
            getDoctorAvailabilityHours(Number(id), Number(service), date as string)
        )
    }


    //#region Schedules
    static createSchedule(req: Request, res: Response) {
        doctorController.handle(res, () => createScheduleDoctor(req))
    }

    static getSchedulesByDoctor(req: Request, res: Response) {
        doctorController.handle(res, () => getSchedulesByDoctorId(req))
    }

    static replaceSchedules(req: Request, res: Response) {
        doctorController.handle(res, () => replaceDoctorSchedules(req))
    }

    static editSchedule(req: Request, res: Response) {
        doctorController.handle(res, () => updateSchedule(req))
    }

    static deleteSchedules(req: Request, res: Response) {
        doctorController.handle(res, () => deleteDoctorSchedule(req))
    }
}

export default doctorController