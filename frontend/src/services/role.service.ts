import type { apiTpag, apiTpatch, apiTpost } from "../types";
import { postBase, getBase, patchBase } from "./base/base.service";

export const getApisRoles = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/sa/rolesSuper");
}


export const createApiRoles = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/sa/roles");
}

export const updateApiRoles = async ({ data, errorfun, id }: apiTpatch) => {
    return patchBase({ data, errorfun, id }, "/sa/roles");
}