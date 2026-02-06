import { PrismaClient, Prisma } from "../generated/prisma";

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

