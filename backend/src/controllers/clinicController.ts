import { Request, Response } from "express";
import { saveUser } from "../services/userServices.";
import BaseController from "./baseController";
import { changeClinicStatus, createClinic, getAllClinics, getClinicById, getClinicByOwner, getClinicBySlug, getClinicsByOwner, updateClinic } from "../services/clinicService";
import { Clinic } from "../generated/prisma";
import { CustomRequest } from "../middlewares";
import { getUserByToken } from "../utils";


class clinicController extends BaseController {

    static create(req: Request, res: Response) {
        return this.handle<Clinic>(res, () => createClinic(req.body));
    }

    static getAll(req: Request, res: Response) {
        return this.handle(
            res,
            () => getAllClinics(req)
        );
    }

    static getById(req: Request, res: Response) {
        const { id } = req.params
        return this.handle<Clinic>(
            res,
            () => getClinicById(id.toString()),
        );
    }

    static changeStatus(req: Request, res: Response) {
        const { id } = req.params
        const { status } = req.body
        return this.handle<Clinic>(
            res,
            () => changeClinicStatus(id, status)
        );
    }

    static update(req: Request, res: Response) {
        const { id } = req.params
        return this.handle<Clinic>(
            res,
            () => updateClinic(id, req.body),
            "Clinica modificada correctamente"
        );
    }

    static getBySlug(req: Request, res: Response) {
        const { slug } = req.params
        return this.handle<Clinic>(
            res,
            () => getClinicBySlug(slug)
        );
    }

    static getMyClinic(req: Request, res: Response) {
        return this.handle<Clinic>(res, () => {
            const user = getUserByToken(req);
            return getClinicByOwner(user.id);
        })
    }

    static getMyClinics(req: Request, res: Response) {
        return this.handle(res, () => {
            const user = getUserByToken(req);
            return getClinicsByOwner(user.id, req);
        })
    }

}

export default clinicController