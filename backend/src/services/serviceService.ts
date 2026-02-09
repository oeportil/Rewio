import { prisma } from "../config/client"
import { getUserByToken } from "../utils"
import { Request } from "express"

//helper para este servicio
async function assertClinicOwnership(clinicId: number, userId: number) {
    const clinic = await prisma.clinic.findFirst({
        where: { id: clinicId, ownerId: userId }
    })
    if (!clinic) throw new Error("No tienes permiso sobre esta clínica")
}


export const createService = async (req: Request) => {
    const user = getUserByToken(req)
    const { clinicId, name, duration, price } = req.body

    if (!clinicId || !name || !duration || !price)
        throw new Error("Campos requeridos faltantes")

    await assertClinicOwnership(clinicId, user.id)

    return prisma.service.create({
        data: { clinicId, name, duration, price }
    })
}

export const getServicesByClinic = async (req: Request) => {
    const user = getUserByToken(req)
    const clinicId = Number(req.query.clinicId)

    await assertClinicOwnership(clinicId, user.id)

    return prisma.service.findMany({
        where: { clinicId, status: true }
    })
}


export const updateService = async (req: Request) => {
    const user = getUserByToken(req)
    const id = Number(req.params.id)
    const { name, duration, price, status } = req.body

    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) throw new Error("Servicio no existe")

    await assertClinicOwnership(service.clinicId, user.id)

    return prisma.service.update({
        where: { id },
        data: { name, duration, price, status }
    })
}

export const deleteService = async (req: Request) => {
    const user = getUserByToken(req)
    const id = Number(req.params.id)

    const service = await prisma.service.findUnique({ where: { id } })
    if (!service) throw new Error("Servicio no existe")

    await assertClinicOwnership(service.clinicId, user.id)

    return prisma.service.update({
        where: { id },
        data: { active: false }
    })
}

