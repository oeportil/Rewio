import type { apiTdelete, apiTpag, apiTpatchAndPut, apiTpost } from "../types";
import { deleteBase, getBase, postBase, putBase } from "./base/base.service";


export const getApiServices = async ({ page, limit, search, errorfun }: apiTpag, clinicId: number) => {
    return getBase({ page, limit, search, errorfun }, `/service/${clinicId}`);
}

export const createApiService = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/service");
}

export const updateApiService = async ({ data, errorfun, id }: apiTpatchAndPut) => {
    return putBase({ data, errorfun, id }, "/service");
}

export const deleteApiService = async ({ errorfun, id }: apiTdelete) => {
    return deleteBase({ errorfun, id }, "/service");
}