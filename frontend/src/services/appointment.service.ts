import type { apiTpag, apiTpatchAndPut, apiTpost } from "../types";
import { getBase, postBase, putBase } from "./base/base.service";


export const getApiClinicAppointment = async ({ page, limit, search, errorfun }: apiTpag, clinicId: number, date?: string) => {
    return getBase({ page, limit, search, errorfun }, `/appointment/${clinicId}/clinic${date ? `?date=${date}` : ''}`);
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

export const cancellApiAppointment = async ({ data, errorfun, id }: apiTpatchAndPut) => {
    return putBase({ data, errorfun }, `/appointment/${id}/cancell`);
}

export const doneApiAppointment = async ({ data, errorfun, id }: apiTpatchAndPut) => {
    return putBase({ data, errorfun }, `/appointment/${id}/done`);
}

export const confirmApiAppointment = async ({ data, errorfun, id }: apiTpatchAndPut) => {
    return putBase({ data, errorfun }, `/appointment/${id}/confirm`);
}

