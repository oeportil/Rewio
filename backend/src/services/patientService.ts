import { prisma } from "../config/client"
import { getUserByToken } from "../utils"
import { Request } from "express"
import { UNEXPECTED_ERROR } from "../consts"

//helper de este servicio
async function assertClinicOwnership(clinicId: number, userId: number) {
    const clinic = await prisma.clinic.findFirst({
        where: { id: clinicId, ownerId: userId, status: true }
    })
    if (!clinic) throw new Error("No tienes permiso sobre esta clínica")
}

export const getPatientHistory = async (
    patientId: number,
    req: Request
) => {
    const user = getUserByToken(req)

    // verificar que pertenece a la clínica
    const clinic = await prisma.clinic.findFirst({
        where: { ownerId: user.id }
    })
    if (!clinic) throw new Error("No es clínica")

    const patient = await prisma.patient.findUnique({
        where: { id: patientId }
    })
    if (!patient || patient.clinicId !== clinic.id)
        throw new Error("Paciente no pertenece a tu clínica")

    return prisma.appointment.findMany({
        where: {
            patientId,
            clinicId: clinic.id,
            status: "done"
        },
        orderBy: { date: "desc" },
        include: {
            doctor: { include: { user: true } },
            service: true
        }
    })
}

export const createPatient = async (req: Request) => {
    const user = getUserByToken(req)
    const { clinicId, userId, phone, birthdate, notes } = req.body

    if (!clinicId || !userId) throw new Error("clinicId y userId son requeridos")

    await assertClinicOwnership(clinicId, user.id)

    const existing = await prisma.patient.findFirst({
        where: { clinicId, userId }
    })
    if (existing) throw new Error("Este usuario ya es paciente en esta clínica")

    const patient = await prisma.patient.create({
        data: {
            clinicId,
            userId,
            phone,
            birthdate,
            notes
        }
    })

    if (!patient) throw new Error(UNEXPECTED_ERROR)
    return patient
}

export const getPatientsByClinic = async (req: Request) => {
    const user = getUserByToken(req)
    const clinicId = Number(req.query.clinicId)

    if (!clinicId) throw new Error("clinicId es requerido")

    await assertClinicOwnership(clinicId, user.id)

    return prisma.patient.findMany({
        where: { clinicId },
        include: {
            user: { select: { id: true, name: true, email: true } }
        }
    })
}

export const getPatientById = async (req: Request) => {
    const user = getUserByToken(req)
    const id = Number(req.params.id)

    const patient = await prisma.patient.findUnique({
        where: { id },
        include: {
            clinic: true,
            user: true
        }
    })

    if (!patient) throw new Error("Paciente no existe")

    await assertClinicOwnership(patient.clinicId, user.id)

    return patient
}

export const updatePatient = async (req: Request) => {
    const user = getUserByToken(req)
    const id = Number(req.params.id)
    const { phone, birthdate, notes } = req.body

    const patient = await prisma.patient.findUnique({ where: { id } })
    if (!patient) throw new Error("Paciente no existe")

    await assertClinicOwnership(patient.clinicId, user.id)

    return prisma.patient.update({
        where: { id },
        data: { phone, birthdate, notes }
    })
}

export const deletePatient = async (req: Request) => {
    const user = getUserByToken(req)
    const id = Number(req.params.id)

    const patient = await prisma.patient.findUnique({ where: { id } })
    if (!patient) throw new Error("Paciente no existe")

    await assertClinicOwnership(patient.clinicId, user.id)

    return prisma.patient.delete({ where: { id } })
}
