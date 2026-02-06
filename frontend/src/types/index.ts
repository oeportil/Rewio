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
    totalCount?: number
} & Tpagination

export type TPagination = {
    page: number,
    limit: number,
    totalCount: number,
    totalPages: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean
}


export type Tpagination = {
    page: number,
    limit: number,
    search: string,
}

export interface IGym {
    id: number,
    name: string,
    logo: string,
    phone: string,
    planId: number,
    status: boolean,
    createdAt: string,
    updatedAt: string,
    deleted: boolean
    plan: IPlanG
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

export interface ICustomer {
    id: number,
    username: string,
    email: string,
    status: boolean,
    createdAt: string,
    updatedAt: string,
    role: IRol,
    gym: IGym
}

export interface IRol {
    id: number,
    name: string,
    description: string,
    isSystem: boolean
}