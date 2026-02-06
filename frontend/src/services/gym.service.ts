import type { apiTpag, apiTpatch, apiTpost } from "../types";
import { postBase, getBase, patchBase } from "./base/base.service";

export const getApisGyms = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/sa/gyms");
}


export const createApiGym = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/sa/gym");
}

export const updateApiGym = async ({ data, errorfun, id }: apiTpatch) => {
    return patchBase({ data, errorfun, id }, "/sa/gym");
}