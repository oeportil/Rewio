import slug from "slug";
import { Clinic } from "../generated/prisma";
import { prisma } from "../config/client";
import { generateUniqueSlug, saveBase64Image } from "../utils";
import { UNEXPECTED_ERROR } from "../consts";


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
    const created = await prisma.clinic.create({ data: newClicnic });
    if (!created) throw new Error(UNEXPECTED_ERROR);
    return created
}