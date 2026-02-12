import bcrypt from "bcryptjs";
import { User } from "../generated/prisma";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, UNEXPECTED_ERROR } from "../consts";
import { prisma } from "../config/client";
import { getUserByToken, paginateAdvanced } from "../utils";
import { Request } from "express";

export const login = async (email: string, password: string) => {

    //buscar usuario si no existe
    const findUser = await prisma.user.findFirst({
        where: { email: email.toLowerCase(), status: true, logicDel: false }, select: {
            password: true,
            id: true,
            email: true,
            name: true,
            role: true
        }
    });
    if (!findUser) {
        throw new Error("No hay un usuario registrado con este email");
    }
    //comparar contraseñas
    const hashed = bcrypt.compareSync(password, findUser.password);
    if (!hashed) {
        throw new Error("Email y/o contraseña incorrectas");
    }
    //generar jwt
    const token = jwt.sign({ id: findUser.id, email: findUser.email, name: findUser.name, role: findUser.role }, SECRET_KEY, {
        expiresIn: '15 days',
    })
    //retornar jwt 
    return { token };
}

export const saveUser = async (user: User) => {
    //verificar que el objeto tenga los siguientes campos que son necesarios dentro del objeto
    if (!user.password || !user.email || !user.name || !user.role) {
        throw new Error("Faltan campos obligatorios");
    }
    //buscar si ya existe un usuario con ese email
    const findUser = await prisma.user.findFirst({ where: { email: user.email.toLowerCase(), logicDel: false, status: true } })
    if (findUser) throw new Error("Ya existe un usuario creado con este email");
    //hashear contraseña
    const hashedPassword = bcrypt.hashSync(user.password);
    //armar objeto a guardar dentro de la base de datos
    const newUser = {
        password: hashedPassword,
        name: user.name,
        email: user.email,
        role: user.role,
        status: true
    }
    //guardando el usuario dentro de la base de datos
    const success = await prisma.user.create({ data: newUser });
    //validando que no hubo errores en la inserción
    if (!success) throw new Error(UNEXPECTED_ERROR);
    //generar jwt
    const token = jwt.sign({ id: success.id, email: success.email, name: success.name, role: success.role }, SECRET_KEY, {
        expiresIn: '15 days',
    })
    //retornar jwt 
    return { token };
}

export const getMe = async (req: Request) => {
    const { id } = getUserByToken(req);
    const user = await prisma.user.findFirst({
        where: { id: id, logicDel: false },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true
        }
    })

    if (!user) throw new Error("Usuario no existe")
    return user
}

export const updateMe = async (req: Request) => {
    const { name, email } = req.body
    const { id } = getUserByToken(req);
    const exists = await prisma.user.findFirst({
        where: {
            email,
            id: { not: id },
            logicDel: false
        }
    })

    if (exists) throw new Error("Email ya está en uso")

    const updated = await prisma.user.update({
        where: { id: id },
        data: { name, email }
    })

    if (!updated) throw new Error(UNEXPECTED_ERROR)
    return true
}

export const changePassword = async (req: Request) => {
    const { id } = getUserByToken(req);
    const { oldPass, newPass } = req.body
    const user = await prisma.user.findUnique({ where: { id: id } })
    if (!user) throw new Error("Usuario no existe")

    const valid = bcrypt.compareSync(oldPass, user.password)
    if (!valid) throw new Error("Contraseña actual incorrecta")

    const hashed = bcrypt.hashSync(newPass)

    await prisma.user.update({
        where: { id: id },
        data: { password: hashed }
    })

    return true
}

export const getAllUsers = async (req: Request) => {

    //retornar los doctores
    return paginateAdvanced("user", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["name", "slug", "email", "phone"],
        filters: {
            status: req.query.status,
            logicDel: false
        }
    })

}

export const changeUserStatus = async (id: number, status: boolean) => {
    return prisma.user.update({
        where: { id },
        data: { status }
    })
}

export const deleteUser = async (id: number) => {
    return prisma.user.update({
        where: { id },
        data: { logicDel: true, status: false }
    })
}

export const clinicOwners = async (req: Request) => {
    return paginateAdvanced("user", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["name", "slug", "email", "phone"],
        filters: {
            status: req.query.status,
            logicDel: false,
            role: "clinic"
        }
    })
}