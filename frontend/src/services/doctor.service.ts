import type { apiTdelete, apiTpag, apiTpatchAndPut, apiTpost } from "../types";
import { postBase, getBase, patchBase, deleteBase } from "./base/base.service";

export const getApiDoctors = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/user/doctors");
}

export const getApiMyDoctors = async ({ page, limit, search, errorfun }: apiTpag, id: number) => {
    return getBase({ page, limit, search, errorfun }, `/doctor/${id}`);
}

export const createApiDoctor = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/doctor");
}

export const updateApiDoctor = async ({ data, errorfun, id }: apiTpatchAndPut, idClinic: number) => {
    return patchBase({ data, errorfun, id }, `/doctor/${idClinic}`);
}

export const deleteApiDoctor = async ({ errorfun, id }: apiTdelete, idClinic: number) => {
    return deleteBase({ errorfun, id }, `/doctor/${idClinic}`);
}

export const getApiDoctorById = async (idClinic: number, idDoctor: number) => {
    return getBase({ page: 1, limit: 1, search: "", errorfun: () => { } }, `/doctor/${idClinic}/${idDoctor}`);
}
