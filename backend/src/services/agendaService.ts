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

    if (!doctorId || !date) throw new Error("doctorId y date son requeridos")

    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } })
    if (!doctor) throw new Error("Doctor no existe")

    await assertClinicOwnership(doctor.clinicId, user.id)

    const targetDate = new Date(date)

    const { schedules, appointments } =
        await getDoctorScheduleByServAndDate(targetDate, doctorId)

    return {
        doctorId,
        date: targetDate,
        schedules,
        appointments
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
