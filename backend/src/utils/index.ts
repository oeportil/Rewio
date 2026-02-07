import { PrismaClient } from "../generated/prisma";
import fs from "fs";
import path from "path";
import crypto from "crypto";

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
    //extraer el rol(aun no se sabe como se manejaran los roles)

    //retornar si es admin 
    findUser.status
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