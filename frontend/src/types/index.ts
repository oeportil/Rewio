export type Toptions = {
    type: "warning" | "success" | "error";
    content: string;
}

export type apiTpost = {
    errorfun: (options: Toptions) => void,
    data: unknown
}

export type apiTpatchAndPut = {
    errorfun: (options: Toptions) => void,
    data: unknown,
    id?: number | string
}

export type apiTget = {
    id: number | string,
    errorfun: (options: Toptions) => void,
}

export type apiTdelete = {
    id?: number | string
    errorfun: (options: Toptions) => void,
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


//  id           Int @id @default (autoincrement())
//   clinicId     Int
//   name         String
//   duration     Int
//   price        Float
//   color        String ?
//     active       Boolean @default (true)
//   createdAt    DateTime @default (now())
//   updatedAt    DateTime @updatedAt
export interface IService {
    id: number,
    clinicId: number,
    name: string,
    duration: number,
    price: number,
    color?: string,
    active: boolean,
    createdAt: string,
    updatedAt: string
}


export interface IUser {
    email: string,
    id: number,
    name: string,
    role: string,
    status: boolean
    createdAt: string
    updatedAt: string
    dui: string | null
}

export interface IDoctor {
    id: number,
    active: boolean,
    color: string,
    createdAt: string,
    specialty: string
    updatedAt: string,
    user: IUser,
    userId: number
}

export interface IVacations {
    id: number
    doctorId: number
    startDate: string
    endDate: string
    reason: string
}

export interface IBlocks {
    id: number
    doctorId: number
    date: string
    startTime: string
    endTime: string
    reason: string
}

export interface ISchedule {
    endTime: string,
    startTime: string,
    weekday: string
    id: number
}

export type AvailabilityResponse =
    | string[]
    | Record<number, string[]>


export interface IAppointment {
    doctorId: number,
    serviceId: number,
    date: string,
    startTime: string
    notes: string
    duration: number
}

