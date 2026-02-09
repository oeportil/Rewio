import slug from "slug";
import { Clinic } from "../generated/prisma";
import { prisma } from "../config/client";
import { generateUniqueSlug, paginateAdvanced, saveBase64Image } from "../utils";
import { UNEXPECTED_ERROR } from "../consts";
import { Request } from "express";


export const createClinic = async (clinic: Clinic) => {
    if (!clinic.name || !clinic.email || !clinic.address || !clinic.logo || !clinic.phone) {
        throw new Error("Error, Campos necesarios faltantes")
    }
    const slug = await generateUniqueSlug("clinic", "slug", clinic.name)
    const logoUrl = saveBase64Image(clinic.logo);
    const newClicnic: Omit<Clinic, "id" | "createdAt" | "updatedAt"> = {
        address: clinic.address,
        email: clinic.email,
        logo: logoUrl,
        phone: clinic.phone,
        slug,
        name: clinic.name,
        ownerId: clinic.ownerId,
        status: true
    }

    return prisma.$transaction((async (tx) => {
        const created = await tx.clinic.create({ data: newClicnic });

        await tx.clinicUser.create({
            data: {
                clinicId: created.id,
                userId: created.ownerId,
                role: "owner"
            }
        })
        if (!created) throw new Error(UNEXPECTED_ERROR);
        return created
    }))
}

export const getAllClinics = async (req: Request) => {
    return paginateAdvanced("clinic", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["name", "slug", "email", "phone"],
        filters: {
            status: req.query.status
        }
    })
}
export const getClinicById = async (id: string) => {
    if (parseInt(id)) throw new Error("Id invalido");
    const clinic = await prisma.clinic.findFirst({ where: { id: +id } });
    if (!clinic) throw new Error("No existe la clinica seleccionada");
    return clinic;
}

export const changeClinicStatus = async (id: string, status: boolean) => {
    if (parseInt(id)) throw new Error("Id invalido");
    const clinic = await prisma.clinic.count({ where: { id: +id } });
    if (clinic <= 0) throw new Error("No existe la clinica seleccionada");

    const modified = await prisma.clinic.update({
        where: { id: +id }, data: {
            status
        }
    })
    return modified;
}

export const updateClinic = async (id: string, clinic: Clinic) => {
    if (parseInt(id)) throw new Error("Id invalido");
    const foundClinic = await prisma.clinic.count({ where: { id: +id } });
    if (foundClinic <= 0) throw new Error("No existe la clinica seleccionada");

    const updatedClinic = await prisma.clinic.update({ where: { id: +id }, data: clinic });
    return updatedClinic;
}


export const getClinicBySlug = async (slug: string) => {
    const foundClinic = await prisma.clinic.findFirst({ where: { slug } });
    if (!foundClinic) throw new Error("No existe la clinica solicitada");
    return foundClinic;
}

export const getClinicByOwner = async (ownerId: number) => {
    const foundClinic = await prisma.clinic.findFirst({ where: { ownerId, status: true } })
    if (!foundClinic) throw new Error("No existe la clinica solicitada");
    return foundClinic;
}

export const getClinicsByOwner = async (ownerId: number, req: Request) => {
    return paginateAdvanced("clinic", {
        page: Number(req.query.page),
        limit: Number(req.query.limit),
        search: req.query.search as string,
        searchFields: ["name", "slug", "email", "phone"],
        filters: {
            status: req.query.status,
            ownerId
        }
    })
}