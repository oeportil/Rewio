import useModal from "@/store/useModal";
import useNotification from "../logic/useNotification"
import usePagination from "../logic/usePagination";
import { useEffect, useState, type FormEvent } from "react";
import { createApiService, deleteApiService, getApiServices, updateApiService } from "@/services/service.service";
import type { apiTpag, IService, Tpagination } from "@/types/index";


export const useService = (clinicId: number) => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IService>("data");
    const { close, open } = useModal();
    const [editingService, setEditingService] = useState<IService | null>(null);
    const [delService, setDelService] = useState<IService | null>(null);


    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });

    const saveService = async (service: Omit<IService, "createdAt" | "updatedAt" | "clinicId" | "active">, e?: FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        // edit or create
        const response = editingService
            ? await updateApiService({ data: { ...service }, errorfun: showNotification, id: editingService!.id })
            : await createApiService({ data: { clinicId, ...service }, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Servicio ${editingService ? "actualizado" : "creado"} correctamente` });
            close("modalService");
            getServices();
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }

    const getServices = async () => {
        const response = await getApiServices(pag, clinicId)
        if (response && response.status) {
            pagfunc(response.value)
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }

    const openEdit = (service: IService) => {
        setEditingService(service);
        open("modalService");
    }
    const openDelete = (service: IService) => {
        setDelService(service);
        open("deleteService");
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    const deleteService = async (id: number) => {
        const response = await deleteApiService({ id, errorfun: showNotification })
        if (response && response.status) {
            close("deleteService")
            showNotification({ type: "success", content: `Servicio eliminado correctamente` });
            getServices();
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }

    useEffect(() => {
        getServices();
    }, [])


    return {
        contextHolder,
        showNotification,
        values,
        pagination,
        handlePagination,
        pag,
        openEdit,
        editingService,
        setEditingService,
        saveService,
        deleteService,
        openDelete,
        delService
    }
}