import { prisma } from "../config/client"
import { Request } from "express"
import { getUserByToken } from "../utils"

export const createBlock = async (req: Request) => {
    const user = getUserByToken(req)
    const { doctorId, date, startTime, endTime, reason } = req.body

    if (!doctorId || !date || !startTime || !endTime)
        throw new Error("Datos incompletos")

    // validar que el doctor pertenece a su clínica
    const doctor = await prisma.doctor.findFirst({
        where: { id: doctorId },
        include: { clinic: true }
    })

    if (!doctor || doctor.clinic.ownerId !== user.id)
        throw new Error("No autorizado")

    return prisma.doctorBlock.create({
        data: {
            doctorId,
            date: new Date(date),
            startTime,
            endTime,
            reason
        }
    })
}

export const getBlocksByDoctor = async (doctorId: number, date?: string) => {
    const where: any = { doctorId }

    if (date) where.date = new Date(date)

    return prisma.doctorBlock.findMany({
        where,
        orderBy: { startTime: "asc" }
    })
}

export const deleteBlock = async (id: number, req: Request) => {
    const user = getUserByToken(req)

    const block = await prisma.doctorBlock.findUnique({
        where: { id },
        include: { doctor: { include: { clinic: true } } }
    })

    if (!block) throw new Error("Bloqueo no existe")

    if (block.doctor.clinic.ownerId !== user.id)
        throw new Error("No autorizado")

    return prisma.doctorBlock.delete({ where: { id } })
}
