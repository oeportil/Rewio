import { Request, Response } from "express";
import BaseController from "./baseController";
import { changeDoctorStatus, createDoctor, deleteDoctor, getDoctorById, getMyDoctors, updateDoctor } from "../services/doctorService";
import { Doctor } from "../generated/prisma";

class doctorController extends BaseController {

    static create(req: Request, res: Response) {
        this.handle<Doctor>(res, () => createDoctor(req))
    }

    static getMyDoctorsByClinic(req: Request, res: Response) {
        this.handle(res, () => getMyDoctors(req))
    }
    static getDoctorById(req: Request, res: Response) {
        this.handle<Doctor | null>(res, () => getDoctorById(req))
    }
    static update(req: Request, res: Response) {
        this.handle<Doctor>(res, () => updateDoctor(req))
    }
    static changeStatus(req: Request, res: Response) {
        this.handle<Doctor>(res, () => changeDoctorStatus(req))
    }
    static delete(req: Request, res: Response) {
        this.handle<Doctor>(res, () => deleteDoctor(req))
    }

}

export default doctorController