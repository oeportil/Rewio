import { PrismaClient } from "../generated/prisma";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { json, Request } from "express";
import { CustomRequest } from "../middlewares";

const prisma = new PrismaClient();

export async function isAdmin(id: number = 0) {
    //verificar que el id se valido
    if (!id) {
        return false;
    }
    //realizar la consulta
    const findUser = await prisma.user.findFirst({ where: { id: id, status: true, logicDel: false } })
    //el usuario existe
    if (!findUser) {
        return false;
    }
    //extraer el rol y retornar
    return findUser.role === "admin" ? true : false
}


type WhereExtras = Record<string, any>;

export async function existEntity<T>(
    id: number,
    name: string,
    model: {
        findFirst: (args: { where: any }) => Promise<T | null>;
    },
    whereExtra?: WhereExtras
) {
    let msg: string | null = null;
    let notexist = false;

    if (!id) {
        msg = `${name} inválido`;
        notexist = true;
        return { msg, notexist, findEntity: null };
    }

    // Combinar filtros base + extra
    const where = {
        id,
        status: true,
        logicDel: false,
        ...(whereExtra || {}),
    };

    const findEntity = await model.findFirst({ where });

    if (!findEntity) {
        msg = `${name} no encontrado`;
        notexist = true;
    }

    return { msg, notexist, findEntity };
}


export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")                 // á → a
        .replace(/[\u0300-\u036f]/g, "")   // remove accents
        .replace(/[^a-z0-9]+/g, "-")       // replace spaces & symbols
        .replace(/(^-|-$)/g, "");         // trim
}


export async function generateUniqueSlug<T extends keyof PrismaClient>(
    model: T,
    field: string,
    text: string
): Promise<string> {

    const base = slugify(text);
    let slug = base;
    let i = 0;

    while (true) {
        const count = await (prisma[model] as any).count({
            where: { [field]: slug }
        });

        if (count === 0) return slug;

        i++;
        slug = `${base}-${i}`;
    }
}

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export function saveBase64Image(base64: string, folder = "general"): string {
    // data:image/png;base64,AAAA
    const matches = base64.match(/^data:(image\/\w+);base64,(.+)$/);

    if (!matches) {
        throw new Error("Invalid base64 image");
    }

    const ext = matches[1].split("/")[1]; // png, jpg, jpeg
    const data = matches[2];

    const buffer = Buffer.from(data, "base64");

    const filename = crypto.randomUUID() + "." + ext;
    const dir = path.join(UPLOAD_DIR, folder);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    const filepath = path.join(dir, filename);
    fs.writeFileSync(filepath, buffer);

    return `/uploads/${folder}/${filename}`;
}

type PaginationParams = {
    page?: number;
    limit?: number;
    search?: string;
    searchFields?: string[];
    filters?: Record<string, any>;
    orderBy?: Record<string, "asc" | "desc">;
    include?: any
};

export async function paginateAdvanced<T extends keyof PrismaClient>(
    model: T,
    params: PaginationParams
) {
    const {
        page = 1,
        limit = 10,
        search,
        searchFields = [],
        filters = {},
        orderBy = { id: "desc" },
        include
    } = params;

    const skip = (page - 1) * limit;

    const where: any = { ...filters };

    // Search on dynamic fields
    if (search && searchFields.length) {
        where.OR = searchFields.map(field => ({
            [field]: {
                contains: search,
                mode: "insensitive"
            }
        }));
    }

    const [data, total] = await Promise.all([
        (prisma[model] as any).findMany({
            where,
            skip,
            take: limit,
            orderBy,
            ...(include ? { include } : {})
        }),
        (prisma[model] as any).count({ where })
    ]);

    return {
        data,
        meta: {
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }
    };
}

export const getUserByToken = (req: Request): { id: number, email: string, name: string, role: string } => {
    const token = (req as CustomRequest).token;
    if (!token) throw new Error("Sesión invalidad o expirada");
    const object = JSON.parse(token);
    return object
}

// { id: findUser.id, email: findUser.email, name: findUser.name, role: findUser.role }


export async function assertClinicOwnership(clinicId: number, userId: number) {
    const clinic = await prisma.clinic.findFirst({
        where: { id: clinicId, ownerId: userId }
    })
    if (!clinic) throw new Error("No tienes permiso sobre esta clínica")
}

export const canReprogram = (date: string) => {
    const today = new Date()
    const appointmentDate = new Date(date)
    const diffInMs = appointmentDate.getTime() - today.getTime()
    const diffInHours = diffInMs / (1000 * 60 * 60)
    return diffInHours >= 48
}