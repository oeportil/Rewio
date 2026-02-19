import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../consts";
import { IResponse } from "../types/Response";
import { isAdmin } from "../utils";
import { Itoken } from "../types";
import { prisma } from "../config/client";


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


//para la idempotencia en post mas que todo
export const idempotencyMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const key = req.header("Idempotency-Key");

    if (!key) return next();

    const existing = await prisma.idempotencyKey.findUnique({
        where: { key },
    });

    if (existing) {
        return res.send({
            status: false,
            value: null,
            msg: "Operación en curso"
        })

    }

    const originalJson = res.json.bind(res);

    res.json = (body: any) => {
        prisma.idempotencyKey
            .create({
                data: {
                    key,
                    response: body,
                    status_code: res.statusCode,
                },
            })
            .catch(console.error);

        return originalJson(body);
    };

    next();
};