import { Request, Response } from "express";
import BaseController from "./baseController";
import {
    createService,
    getServicesByClinic,
    updateService,
    deleteService
} from "../services/serviceService";
import { Service } from "../generated/prisma";

class serviceController extends BaseController {

    static create(req: Request, res: Response) {
        return serviceController.handle<Service>(
            res,
            () => createService(req),
            "Servicio creado correctamente"
        );
    }


    static getByClinic(req: Request, res: Response) {
        return serviceController.handle(
            res,
            () => getServicesByClinic(req)
        );
    }


    static update(req: Request, res: Response) {
        return serviceController.handle<Service>(
            res,
            () => updateService(req),
            "Servicio actualizado correctamente"
        );
    }


    static delete(req: Request, res: Response) {
        return serviceController.handle<Service>(
            res,
            () => deleteService(req),
            "Servicio eliminado correctamente"
        );
    }

}

export default serviceController;
