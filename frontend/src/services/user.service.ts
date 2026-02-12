import type { apiTpag, apiTpatch, apiTpost } from "../types";
import { postBase, getBase, patchBase } from "./base/base.service";

export const getApisUsers = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/user");
}

export const getApisClinicOwners = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/user/owners");
}

export const createApiUser = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/user");
}

export const updateApiUser = async ({ data, errorfun, id }: apiTpatch) => {
    return patchBase({ data, errorfun, id }, "/user");
}