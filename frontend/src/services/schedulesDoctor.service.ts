import type { apiTdelete, apiTpatchAndPut, apiTpost } from "../types";
import { deleteBase, getBase, postBase, putBase } from "./base/base.service";


export const getApiSchedules = async (clinicId: number, doctorId: number) => {
    return getBase({ page: 1, limit: 1, search: "", errorfun: () => { } }, `/doctor/schedules/${clinicId}/${doctorId}`);
}

export const createApiSchedule = async ({ data, errorfun }: apiTpost, clinicId: number, doctorId: number) => {
    return postBase({ data, errorfun }, `/doctor/schedules/${clinicId}/${doctorId}`);
}

export const updateApiSchedule = async ({ data, errorfun, id }: apiTpatchAndPut, clinicId: number, doctorId: number) => {
    return putBase({ data, errorfun, id }, `/doctor/schedules/${clinicId}/${doctorId}`);
}

export const deleteApiSchedule = async ({ errorfun, id }: apiTdelete) => {
    return deleteBase({ errorfun, id }, "/doctor/schedules");
}