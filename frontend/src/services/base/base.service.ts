import instance from "@/config/axiosClient";
import type { apiTpag, apiTpatch, apiTpost } from "../../types";
import axios from "axios";



export const getBase = async ({ page, limit, search, errorfun }: apiTpag, endpoint: string) => {
    try {
        const response = await instance.get(`${endpoint}?page=${page}&limit=${limit}&search=${search}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            errorfun({
                type: "error",
                content: error.response?.data?.msg || "Error",
            });
        } else {
            errorfun({
                type: "error",
                content: "Error inesperado",
            });
        }
    }
}


export const postBase = async ({ data, errorfun }: apiTpost, endpoint: string) => {
    try {
        const response = await instance.post(`${endpoint}`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            errorfun({
                type: "error",
                content: error.response?.data?.msg || "Error",
            });
        } else {
            errorfun({
                type: "error",
                content: "Error inesperado",
            });
        }
    }
}

export const patchBase = async ({ data, errorfun, id }: apiTpatch, endpoint: string) => {
    try {
        const response = await instance.patch(`${endpoint}/${id}`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            errorfun({
                type: "error",
                content: error.response?.data?.msg || "Error",
            });
        } else {
            errorfun({
                type: "error",
                content: "Error inesperado",
            });
        }
    }
}