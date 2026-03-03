import type { apiTdelete, apiTpag, apiTpatchAndPut, apiTpost } from "../types";
import { deleteBase, getBase, postBase, putBase } from "./base/base.service";


export const getApiClinicAppointment = async ({ page, limit, search, errorfun }: apiTpag, clinicId: number) => {
    return getBase({ page, limit, search, errorfun }, `/appointment/${clinicId}/clinic`);
}


export const getApiDoctorAppointment = async ({ page, limit, search, errorfun }: apiTpag, doctor: number) => {
    return getBase({ page, limit, search, errorfun }, `/appointment/${doctor}/doctor`);
}

export const getApiMyAppointment = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, `/appointment/my`);
}

export const createApiAppointment = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/appointment");
}

export const updateApiService = async ({ data, errorfun, id }: apiTpatchAndPut) => {
    return putBase({ data, errorfun, id }, "/service");
}

export const deleteApiService = async ({ errorfun, id }: apiTdelete) => {
    return deleteBase({ errorfun, id }, "/service");
}