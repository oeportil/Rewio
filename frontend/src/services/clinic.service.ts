import type { apiTpag, apiTpatch, apiTpost } from "../types";
import { postBase, getBase, patchBase } from "./base/base.service";

export const getApisClinics = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/clinic");
}


export const getApisClinicsByOwner = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/clinic/owner");
}


export const createApiClinic = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/clinic");
}

export const updateApiClinic = async ({ data, errorfun, id }: apiTpatch) => {
    return patchBase({ data, errorfun, id }, "/clinic");
}