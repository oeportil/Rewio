import type { apiTpag, apiTpatch, apiTpost } from "../types";
import { getBase, patchBase, postBase } from "./base/base.service";

export const getApiPlans = async ({ page, limit, search, errorfun }: apiTpag) => {
    return getBase({ page, limit, search, errorfun }, "/sa/plan");
}

export const createApiPlan = async ({ data, errorfun }: apiTpost) => {
    return postBase({ data, errorfun }, "/sa/plan");
}

export const updateApiPlan = async ({ data, errorfun, id }: apiTpatch) => {
    return patchBase({ data, errorfun, id }, "/sa/plan");
}