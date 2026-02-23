import e, { Request } from "express";
import { getUserByToken, paginateAdvanced } from "../utils";
import { Doctor, DoctorSchedule } from "../generated/prisma";
import { prisma } from "../config/client";
import { UNEXPECTED_ERROR } from "../consts";

const findMyClinic = async (id: number, clinicId: number): Promise<Boolean> => {
    const foundClinic = await prisma.clinic.count({ where: { ownerId: id, id: clinicId } });
    return foundClinic <= 0 ? false : true
}

export const createDoctor = async (req: Request) => {
    const obj = getUserByToken(req);
    const doctor: Doctor = req.body
    //ver si la clinica existe o es propietario
    if (!findMyClinic(obj.id, doctor.clinicId)) throw new Error("La clinica no existe o no eres propietario")

    if (!doctor.specialty || !doctor.color || !doctor.userId) throw new Error("Faltan campos necesarios");
    //buscar el id del usuario a asociar con el doctor
    const foundUser = await prisma.user.count({ where: { id: doctor.userId } })
    if (foundUser <= 0) throw new Error("El usuario seleccionado no existe")

    try {
        const newDoctor = await prisma.doctor.create({
            data: doctor
        })

        if (!newDoctor) throw new Error(UNEXPECTED_ERROR)

        return newDoctor

    } catch (error: any) {

        // Prisma UNIQUE constraint
        if (error.code === "P2002") {
            const field = error.meta?.target?.[0]

            if (field === "email") {
                throw new Error("Ya existe un doctor con este correo en tu clinica")
            }

            if (field === "dui") {
                throw new Error("Ya existe un doctor con este DUI en tu clinica")
            }

            throw new Error("Este doctor ya existe en tu clinica")
        }

        // Otros errores reales
        throw error
    }
}

export const getMyDoctors = async (req: Request) => {
    const obj = getUserByToken(req);
    const { clinicId } = req.params
    //buscar la clinica
    if (!findMyClinic(obj.id, +clinicId)) throw new Error("La clinica no existe o no eres propietario")

    //retornar los doctores
    return paginateAdvanced("doctor", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["name", "slug", "email", "phone"],
        filters: {
            status: req.query.status,
            clinicId: +clinicId
        },
        include: {
            user: true
        }
    })
}

export const getDoctorById = async (req: Request) => {
    const obj = getUserByToken(req);
    const { clinicId, doctorId } = req.params
    //buscar la clinica
    if (!findMyClinic(obj.id, +clinicId)) throw new Error("La clinica no existe o no eres propietario")
    const foundDoctor = await prisma.doctor.findFirst({
        where: { id: +doctorId, clinicId: +clinicId }, include: {
            user: true
        }
    });

    //retornar el doctor
    if (!foundDoctor) throw new Error("Doctor no encontrado");
    return foundDoctor;
}
export const updateDoctor = async (req: Request) => {
    const obj = getUserByToken(req);
    const { clinicId, doctorId } = req.params
    const doctor: Doctor = req.body
    //buscar la clinica
    if (!findMyClinic(obj.id, +clinicId)) throw new Error("La clinica no existe o no eres propietario")
    const foundDoctor = await prisma.doctor.findFirst({ where: { id: +doctorId, clinicId: +clinicId } });

    //actualizar el doctor
    if (!foundDoctor) throw new Error("Doctor no encontrado");
    const objUp = {
        specialty: doctor.specialty,
        color: doctor.color,
    }
    const updatedDoctor = await prisma.doctor.update({ where: { id: +doctorId, clinicId: +clinicId }, data: objUp })
    if (!updatedDoctor) throw new Error(UNEXPECTED_ERROR);

    //retornar Doctor Actualizado
    return updatedDoctor;
}

export const changeDoctorStatus = async (req: Request) => {
    const obj = getUserByToken(req);
    const { clinicId } = req.params
    const { doctor } = req.body
    //buscar la clinica y el doctor
    if (!findMyClinic(obj.id, +clinicId)) throw new Error("La clinica no existe o no eres propietario")
    const foundDoctor = await prisma.doctor.findFirst({ where: { id: doctor.id, clinicId: +clinicId } });
    if (!foundDoctor) throw new Error("Doctor no encontrado");

    //cambiar status del doctor
    const updatedDoctor = await prisma.doctor.update({
        where: { id: doctor.id, clinicId: +clinicId }, data: {
            active: doctor.active
        }
    })
    if (!updatedDoctor) throw new Error(UNEXPECTED_ERROR);
    //retornar Doctor Actualizado
    return updatedDoctor;
}

export const deleteDoctor = async (req: Request) => {
    const obj = getUserByToken(req);
    const { clinicId, doctorId } = req.params
    //buscar la clinica y el doctor
    if (!findMyClinic(obj.id, +clinicId)) throw new Error("La clinica no existe o no eres propietario")
    const foundDoctor = await prisma.doctor.findFirst({ where: { id: +doctorId, clinicId: +clinicId } });
    if (!foundDoctor) throw new Error("Doctor no encontrado");

    //cambiar status del doctor
    const updatedDoctor = await prisma.doctor.delete({
        where: { id: +doctorId, clinicId: +clinicId }
    })
    if (!updatedDoctor) throw new Error(UNEXPECTED_ERROR);
    //retornar Doctor Actualizado
    return updatedDoctor;
}

//#region Schedules
export const createScheduleDoctor = async (req: Request) => {
    const { doctorId, clinicId } = req.params
    const schedule = req.body
    //buscar doctores
    const foundDoctor = await prisma.doctor.findFirst({ where: { id: +doctorId, clinicId: +clinicId } });
    if (!foundDoctor) throw new Error("Doctor no encontrado");
    if (!schedule.startTime || !schedule.endTime || !schedule.weekdays) throw new Error("Faltan campos necesarios");
    try {
        await prisma.doctorSchedule.createMany({
            data: schedule.weekdays.map((day: string) => ({
                doctorId: +doctorId,
                weekday: +day,
                startTime: schedule.startTime,
                endTime: schedule.endTime
            }))
        });

        return true;
    } catch (error: any) {
        if (error.code === "P2002") {
            throw new Error("Este doctor ya tiene horario asignado para ese día");
        }
    }
}

export const getSchedulesByDoctorId = async (req: Request) => {
    const { doctorId, clinicId } = req.params
    //buscar doctores
    const foundDoctor = await prisma.doctor.findFirst({ where: { id: +doctorId, clinicId: +clinicId } });
    if (!foundDoctor) throw new Error("Doctor no encontrado");

    const schedules = prisma.doctorSchedule.findMany({ where: { doctorId: +doctorId }, orderBy: { weekday: "asc" } })

    return schedules;
}

export const replaceDoctorSchedules = async (req: Request) => {
    const { doctorId, clinicId } = req.params
    const foundDoctor = await prisma.doctor.findFirst({ where: { id: +doctorId, clinicId: +clinicId } });
    if (!foundDoctor) throw new Error("Doctor no encontrado");
    const { schedules }: { schedules: any[] } = req.body
    return prisma.$transaction(async (tx) => {


        await tx.doctorSchedule.deleteMany({
            where: { doctorId: +doctorId }
        })
        return tx.doctorSchedule.createMany({
            data: schedules.map(s => ({
                doctorId: +doctorId,
                weekday: s.weekday,
                startTime: s.startTime,
                endTime: s.endTime
            }))
        })
    })
}

export const deleteDoctorSchedule = async (req: Request) => {

    const { id } = req.params
    //buscar doctores
    const foundSchedule = await prisma.doctorSchedule.findFirst({ where: { id: +id } });
    if (!foundSchedule) throw new Error("Horario no encontrado");
    return prisma.doctorSchedule.delete({
        where: { id: Number(id) }
    })
}

