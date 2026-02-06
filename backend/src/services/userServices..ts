import bcrypt from "bcryptjs";
import { PrismaClient, User } from "../generated/prisma";
import jwt from 'jsonwebtoken';
import { SECRET_KEY, UNEXPECTED_ERROR } from "../consts";

const prisma = new PrismaClient();

export const login = async (email: string, password: string) => {
    //buscar usuario si no existe
    const findUser = await prisma.user.findFirst({ where: { email: email.toLowerCase(), status: true, logicDel: false } });
    if (!findUser) {
        throw new Error("No hay un usuario registrado con este email");
    }

    //comparar contraseñas
    const hashed = bcrypt.compareSync(password, findUser.password);
    if (!hashed) {
        throw new Error("Email y/o contraseña incorrectas");
    }
    //generar jwt
    const token = jwt.sign({ id: findUser.id, email: findUser.email, name: findUser.name, }, SECRET_KEY, {
        expiresIn: '15 days',
    })
    //retornar jwt 
    return token;
}

export const saveUser = async (user: User) => {
    //verificar que el objeto tenga los siguientes campos que son necesarios dentro del objeto
    if (!user.password || !user.email || !user.name) {
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
    }
    //guardando el usuario dentro de la base de datos
    const success = await prisma.user.create({ data: newUser });
    //validando que no hubo errores en la inserción
    if (!success) throw new Error(UNEXPECTED_ERROR);
    return true;
}