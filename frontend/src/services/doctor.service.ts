import type { apiTdelete, apiTpag, apiTpatchAndPut, apiTpost } from "../types";
import { postBase, getBase, patchBase, deleteBase, putBase } from "./base/base.service";

export const getApiDoctors = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/user/doctors");
}

export const getApiMyDoctors = async ({ page, limit, search, errorfun }: apiTpag, id: number) => {
    return getBase({ page, limit, search, errorfun }, `/doctor/${id}`);
}

export const getApisClinicOwners = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/user/owners");
}

export const createApiUser = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/user");
}

export const changePassApiUser = async ({ data, errorfun }: apiTpatchAndPut) => {
    return putBase({ data, errorfun }, "/user/password-me");
}


export const updateApiUser = async ({ data, errorfun, id }: apiTpatchAndPut) => {
    return patchBase({ data, errorfun, id }, "/user/me");
}

export const deleteApiUser = async ({ errorfun, id }: apiTdelete) => {
    return deleteBase({ id, errorfun }, "/user");
}