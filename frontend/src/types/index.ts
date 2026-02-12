export type Toptions = {
    type: "warning" | "success" | "error";
    content: string;
}

export type apiTpost = {
    errorfun: (options: Toptions) => void,
    data: unknown
}

export type apiTpatch = {
    errorfun: (options: Toptions) => void,
    data: unknown,
    id: number | string
}

export type apiTpag = {
    errorfun: (options: Toptions) => void,
    total?: number
} & Tpagination

export type TPagination = {
    page: number,
    limit: number,
    total: number,
    pages: number,
}

//  meta: {
//             total,
//             page,
//             limit,
//             pages: Math.ceil(total / limit)
//         }


export type Tpagination = {
    page: number,
    limit: number,
    search: string,
}

export interface IClinic {
    id: number;
    name: string;
    slug: string;
    address: string;
    email: string;
    phone: string;
    logo: string;        // URL o path de la imagen
    status: boolean;
    ownerId: number;
    createdAt: string;   // ISO date string
    updatedAt: string;   // ISO date string
    owner: IUser
}
interface IPlanG {
    id: number,
    name: string
}

export interface IPlan extends IPlanG {
    cost: number,
    administration: boolean,
    posEnabled: boolean,
    billingEnabled: boolean,
    statisticsEnabled: boolean,
    maxUsers: number,
    maxClients: number,
    maxProducts: number,
    _count: {
        gyms: number
    }
}


export interface IUser {
    email: string,
    id: number,
    name: string,
    role: string,
    status: boolean
    createdAt: string
    updatedAt: string
}


