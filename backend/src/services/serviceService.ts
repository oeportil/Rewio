import { prisma } from "../config/client"
import { assertClinicOwnership, getUserByToken, paginateAdvanced } from "../utils"
import { Request } from "express"



export const createService = async (req: Request) => {
    const user = getUserByToken(req)
    const { clinicId, name, duration, price, color } = req.body

    if (!clinicId || !name || !duration || !price)
        throw new Error("Campos requeridos faltantes")

    await assertClinicOwnership(clinicId, user.id)

    return prisma.service.create({
        data: { clinicId, name, duration, price, color }
    })
}

export const getServicesByClinic = async (req: Request) => {
    const user = getUserByToken(req)
    const clinicId = Number(req.params.id)

    return paginateAdvanced("service", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["name", "price", "email", "phone"],
        filters: {
            clinicId,
            active: true
        }
    })
}


export const updateService = async (req: Request) => {
    const user = getUserByToken(req)
    const id = Number(req.params.id)
    const { name, duration, price, active, color } = req.body

    const service = await prisma.service.findUnique({ where: { id, active: true } })
    if (!service) throw new Error("Servicio no existe")

    await assertClinicOwnership(service.clinicId, user.id)

    return prisma.service.update({
        where: { id },
        data: { name, duration, price, active, color }
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

