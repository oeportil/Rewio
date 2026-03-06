import { Request } from "express"
import { prisma } from "../config/client"
import { Appointment } from "../generated/prisma"
import { calculateEndTime, hasCollision, isWithinDoctorSchedule } from "./appointmentRule"
import { assertClinicOwnership, canReprogram, getUserByToken, paginateAdvanced } from "../utils"
import { UNEXPECTED_ERROR } from "../consts"

export const createAppointment = async (req: Request) => {
    const { doctorId, serviceId, date, startTime, notes } = req.body

    const user = getUserByToken(req)

    //verificar que el usuario sea paciente
    if (user.role != "patient") throw new Error("No puedes realizar la cita porque no eres paciente")

    // Obtener doctor
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
        select: { clinicId: true }
    })
    if (!doctor) throw new Error("Doctor no existe")

    return await prisma.$transaction(async (tx) => {

        // Obtener paciente
        const foundedPatient = await tx.patient.findFirst({
            where: { userId: user.id, clinicId: doctor.clinicId }
        })

        let patient = foundedPatient;
        if (!foundedPatient) {
            const newPatient = await tx.patient.create({
                data: {
                    clinicId: doctor.clinicId,
                    userId: user.id
                }
            })
            if (!newPatient) throw new Error(UNEXPECTED_ERROR)
            patient = await newPatient;
        }
        // Calcular hora de fin real
        const endTime = await calculateEndTime(serviceId, startTime)

        //  Validar si el horario es valido
        const validSchedule = await isWithinDoctorSchedule(
            doctorId,
            new Date(date),
            startTime,
            endTime
        )
        if (!validSchedule) throw new Error("Fuera del horario del doctor")

        // validar las colisiones
        const collision = await hasCollision(
            doctorId,
            new Date(date),
            startTime,
            endTime
        )
        if (collision) throw new Error("Ese horario ya está ocupado")

        // Crear cita
        return tx.appointment.create({
            data: {
                clinicId: doctor.clinicId,
                doctorId,
                patientId: patient!.id,
                serviceId,
                date: new Date(date),
                startTime,
                endTime,
                notes
            }
        })
    })
}



export const getDoctorAppointments = async (
    req: Request
) => {
    const user = getUserByToken(req)
    const { id: clinicId } = req.params
    const { date, doctorId } = req.query
    const where: any = { clinicId: +clinicId }

    if (date) {
        where.date = new Date(date as string)
    }
    const iddoc = doctorId ? Number(doctorId) : user.id
    const doctor = await prisma.doctor.findFirst({
        where: {
            OR: [
                { userId: iddoc },
                { id: iddoc }
            ]
        }, include: { clinic: true }
    })
    if (!doctor) throw new Error("doctor no existe")

    if (user.id != doctor.userId && doctor.clinic.ownerId != user.id) throw new Error("No posees los permisos suficientes")

    return paginateAdvanced("appointment", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["date", "status"],
        filters: {
            ...where
        },
        orderBy: { startTime: "asc" },
        include: {
            patient: {
                include: { user: true }
            },
            service: true
        }
    })
}

export const getClinicAppointments = async (
    req: Request
) => {
    const user = getUserByToken(req)
    const { id: clinicId } = req.params
    const { date } = req.query

    const where: any = { clinicId: +clinicId }

    if (date) where.date = new Date(date as string)

    await assertClinicOwnership(+clinicId, user.id)

    return paginateAdvanced("appointment", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["date", "status"],
        filters: {
            ...where
        },
        orderBy: { startTime: "asc" },
        include: {
            doctor: {
                include: { user: true }
            },
            patient: {
                include: { user: true }
            },
            service: true
        }
    })
}


export const getMyAppointments = async (req: Request) => {
    const user = getUserByToken(req)

    const patient = await prisma.patient.findFirst({
        where: { userId: user.id }
    })
    if (!patient) throw new Error("El usuario no es paciente")

    return paginateAdvanced("appointment", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["date", "status"],
        filters: {
            status: req.query.status,
            patientId: patient.id
        },
        orderBy: { id: "desc" },
        include: {
            doctor: { include: { user: true } },
            // clinic: true,
            service: true
        }
    })
}

export const cancelAppointment = async (req: Request) => {
    const user = getUserByToken(req);
    const { id } = req.params
    const patient = await prisma.patient.findFirst({
        where: { userId: user.id }
    })
    if (!patient) throw new Error("No es paciente")

    const appointment = await prisma.appointment.findUnique({
        where: { id: +id }
    })
    if (!appointment) throw new Error("Cita no existe")

    if (appointment.patientId !== patient.id)
        throw new Error("No puedes cancelar esta cita")

    return prisma.appointment.update({
        where: { id: +id },
        data: { status: "cancelled" }
    })
}


export const doneAppointment = async (req: Request) => {
    const user = getUserByToken(req)
    const { id } = req.params
    const doctor = await prisma.doctor.findFirst({
        where: { userId: user.id }
    })
    if (!doctor) throw new Error("No es doctor")

    const appointment = await prisma.appointment.findUnique({
        where: { id: +id }
    })
    if (!appointment) throw new Error("Cita no existe")

    if (appointment.doctorId !== doctor.id)
        throw new Error("No es tu cita")

    return prisma.appointment.update({
        where: { id: +id },
        data: { status: "done" }
    })
}

export const confirmAppointment = async (req: Request) => {
    const user = getUserByToken(req)
    const { id } = req.params
    const appointment = await prisma.appointment.findUnique({
        where: { id: +id },
        include: { clinic: true }
    })

    if (!appointment) throw new Error("Cita no existe")

    if (appointment.clinic.ownerId !== user.id)
        throw new Error("No autorizado")

    if (appointment.status !== "pending")
        throw new Error("Solo citas pendientes se pueden confirmar")

    return prisma.appointment.update({
        where: { id: +id },
        data: { status: "confirmed" }
    })
}


export const rescheduleAppointment = async (req: Request) => {
    const { id } = req.params;
    const { newDate, newStartTime } = req.body;
    const user = getUserByToken(req);

    if (!canReprogram(req.body.newDate)) throw new Error("No puedes reprogramar esta cita");

    // Obtener paciente
    const patient = await prisma.patient.findFirst({ where: { userId: user.id } });
    if (!patient) throw new Error("No eres paciente");

    // Obtener cita
    const appointment = await prisma.appointment.findUnique({ where: { id: +id } });
    if (!appointment) throw new Error("Cita no existe");

    if (appointment.patientId !== patient.id) throw new Error("No tienes permiso para modificar esta cita");

    if (["cancelled", "done"].includes(appointment.status)) throw new Error("No puedes reprogramar esta cita");

    // Obtener doctor
    const doctor = await prisma.doctor.findUnique({ where: { id: appointment.doctorId } });
    if (!doctor) throw new Error("Doctor no existe");

    // Calcular hora de fin
    const endTime = await calculateEndTime(appointment.serviceId, newStartTime);

    // Validar horario del doctor
    const valid = await isWithinDoctorSchedule(doctor.id, new Date(newDate), newStartTime, endTime);
    if (!valid) throw new Error("Fuera del horario del doctor o en bloqueos/vacaciones");

    // Validar colisiones
    const collision = await hasCollision(doctor.id, new Date(newDate), newStartTime, endTime, appointment.id);
    if (collision) throw new Error("Ese horario ya está ocupado");

    // Actualizar cita
    return prisma.appointment.update({
        where: { id: +id },
        data: {
            date: new Date(newDate),
            startTime: newStartTime,
            endTime
        }
    });
};