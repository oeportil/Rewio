import { prisma } from "../config/client"
import { getUserByToken } from "../utils"
import { Request } from "express"

async function assertDoctorOwnership(doctorId: number, userId: number) {
    const doctor = await prisma.doctor.findFirst({
        where: {
            id: doctorId,
            clinic: { ownerId: userId }
        }
    })
    if (!doctor) throw new Error("No tienes permisos sobre este doctor")
}

export const createVacation = async (req: Request) => {
    const user = getUserByToken(req)
    const { doctorId, startDate, endDate, reason } = req.body

    if (!doctorId || !startDate || !endDate)
        throw new Error("Campos requeridos")

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start >= end)
        throw new Error("La fecha inicial debe ser menor a la final")

    await assertDoctorOwnership(doctorId, user.id)

    // Ver si hay citas en ese rango
    const conflicts = await prisma.appointment.count({
        where: {
            doctorId,
            date: {
                gte: start,
                lte: end
            },
            status: { notIn: ["cancelled"] }
        }
    })

    if (conflicts > 0)
        throw new Error("El doctor tiene citas en ese rango")

    return prisma.doctorVacation.create({
        data: {
            doctorId,
            startDate: start,
            endDate: end,
            reason
        }
    })
}

export const getVacationsByDoctor = async (req: Request) => {
    const user = getUserByToken(req)
    const doctorId = Number(req.query.doctorId)

    await assertDoctorOwnership(doctorId, user.id)

    return prisma.doctorVacation.findMany({
        where: { doctorId },
        orderBy: { startDate: "asc" }
    })
}

export const deleteVacation = async (req: Request) => {
    const user = getUserByToken(req)
    const id = Number(req.params.id)

    const vacation = await prisma.doctorVacation.findUnique({ where: { id } })
    if (!vacation) throw new Error("Vacación no existe")

    await assertDoctorOwnership(vacation.doctorId, user.id)

    return prisma.doctorVacation.delete({ where: { id } })
}
