import { prisma } from "../config/client"
import { getUserByToken } from "../utils"
import { Request } from "express"
import { getDoctorScheduleByServAndDate } from "./availabilityService"


async function assertClinicOwnership(clinicId: number, userId: number) {
    const clinic = await prisma.clinic.findFirst({
        where: { id: clinicId, ownerId: userId, status: true }
    })
    if (!clinic) throw new Error("No tienes permiso sobre esta clínica")
}

export const getDoctorAgenda = async (req: Request) => {
    const user = getUserByToken(req)
    const doctorId = Number(req.params.doctorId)
    const date = String(req.query.date)

    if (!doctorId || !date)
        throw new Error("doctorId y date son requeridos")

    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId }
    })
    if (!doctor) throw new Error("Doctor no existe")

    // Verificar que el doctor pertenece a mi clínica
    await assertClinicOwnership(doctor.clinicId, user.id)

    const targetDate = new Date(date)
    const weekday = targetDate.getDay()

    //Horarios base
    const schedules = await prisma.doctorSchedule.findMany({
        where: { doctorId, weekday }
    })

    //Citas del día
    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId,
            date: targetDate,
            status: { not: "cancelled" }
        },
        orderBy: { startTime: "asc" },
        include: {
            patient: { include: { user: true } },
            service: true
        }
    })

    // Traer los bloqueos
    const blocks = await prisma.doctorBlock.findMany({
        where: {
            doctorId,
            date: targetDate
        }
    })

    // Traer las vacaciones
    const vacations = await prisma.doctorVacation.findMany({
        where: {
            doctorId,
            startDate: { lte: targetDate },
            endDate: { gte: targetDate }
        }
    })

    const isOnVacation = vacations.length > 0

    return {
        doctorId,
        date: targetDate,
        isOnVacation,
        schedules,
        appointments,
        blocks,
        vacations
    }
}



export const getClinicAgenda = async (req: Request) => {
    const user = getUserByToken(req)
    const clinicId = Number(req.params.clinicId)
    const date = String(req.query.date)

    if (!clinicId || !date) throw new Error("clinicId y date son requeridos")

    await assertClinicOwnership(clinicId, user.id)

    const targetDate = new Date(date)

    const appointments = await prisma.appointment.findMany({
        where: {
            clinicId,
            date: targetDate,
            status: { not: "cancelled" }
        },
        orderBy: [
            { doctorId: "asc" },
            { startTime: "asc" }
        ],
        include: {
            doctor: { include: { user: true } },
            patient: { include: { user: true } },
            service: true
        }
    })

    return {
        clinicId,
        date: targetDate,
        appointments
    }
}
