import type { apiTdelete, apiTpost } from "../types";
import { postBase, getBase, deleteBase } from "./base/base.service";

//VACATIONS
export const getApiVacationsByDoctor = async (idDoctor: number) => {
    return getBase({ page: 1, limit: 100, search: "", errorfun: () => { } }, `/vacation/${idDoctor}`);
}

export const createApiVacation = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/vacation");
}


export const deleteApiVacation = async ({ id, errorfun }: apiTdelete) => {
    return deleteBase({ id, errorfun }, "/vacation");
}

//BLOCKS
export const getApiBlocksByDoctor = async (idDoctor: number, date: string) => {
    return getBase({ page: 1, limit: 100, search: "", errorfun: () => { } }, `/block/${idDoctor}?date=${date}&`);
}

export const createApiBlock = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/block");
}


export const deleteApiBlock = async ({ id, errorfun }: apiTdelete) => {
    return deleteBase({ id, errorfun }, "/block");
}
