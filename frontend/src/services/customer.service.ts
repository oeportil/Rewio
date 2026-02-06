import type { apiTpag, apiTpatch, apiTpost } from "../types";
import { postBase, getBase, patchBase } from "./base/base.service";

export const getApisCustomers = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/sa/users");
}


export const createApiCustomer = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/sa/register");
}

export const updateApiCustomer = async ({ data, errorfun, id }: apiTpatch) => {
    return patchBase({ data, errorfun, id: `${id}/toggle-status` }, "/sa/gym");
}