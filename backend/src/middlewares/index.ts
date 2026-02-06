import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../consts";
import { IResponse } from "../types/Response";
import { isAdmin } from "../utils";
import { Itoken } from "../types";


export interface CustomRequest extends Request {
    token: string
}


//middleware para token de jwt 
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error('Usuario no admitido')
        }
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as CustomRequest).token = JSON.stringify(decoded);
        next();
    } catch (error: Error | any) {
        const response: IResponse<null> = {
            status: false,
            value: null,
            msg: error.message
        }
        res.send(response)
    }
}

//Para verificar si es administrador o no
export const AdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const { id }: Itoken = JSON.parse((req as CustomRequest).token);
    const admin = await isAdmin(id);
    if (admin) {
        next();
    } else {
        const response: IResponse<null> = { msg: "No tienes permisos suficientes", value: null, status: false };
        res.send(response)
    }
}