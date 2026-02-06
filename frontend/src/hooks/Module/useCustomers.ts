import type { apiTpag, ICustomer, Tpagination } from "@/types/index";
import { useEffect, useState, type FormEvent } from "react";
import useNotification from "../logic/useNotification";
import usePagination from "../logic/usePagination";
import useModal from "@/store/useModal";
import { createApiCustomer, getApisCustomers, updateApiCustomer } from "@/services/customer.service";
import { formDataKeysAndValues } from "@/utils/index";

const useCustomers = () => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<ICustomer>("users");
    const { closeModal, openModal } = useModal();
    const [editingCust, setEditingCust] = useState<ICustomer | null>(null);

    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        totalCount: 0
    });

    const getCustomers = async () => {
        const response = await getApisCustomers(pag);
        pagfunc(response.data)
    }

    const changeStatus = async (id: number, status: boolean) => {
        console.log(status)
        // return
        const response = await updateApiCustomer({ data: { status }, errorfun: showNotification, id });
        if (response && response.status) {
            showNotification({ type: "success", content: `Gimnasio de cliente ${!status ? "desactivado" : "activado"} correctamente` });
            getCustomers();
        }
    }

    const saveCustomer = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = formDataKeysAndValues<Record<string, any>>(e);
        const data = {
            username: raw.username,
            email: raw.email,
            gymId: Number(raw.gymId),
            password: raw.password,
            roleId: Number(raw.roleId)
        };
        // edit or create
        const response = editingCust
            ? await updateApiCustomer({ data, errorfun: showNotification, id: editingCust!.id })
            : await createApiCustomer({ data, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Cliente ${editingCust ? "actualizado" : "creado"} correctamente` });
            closeModal();
            getCustomers();
        }
    }
    const openEdit = (customer: ICustomer) => {
        setEditingCust(customer);
        openModal();
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    useEffect(() => {
        getCustomers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag])
    return {
        contextHolder,
        showNotification,
        values,
        pagination,
        handlePagination,
        pag,
        saveCustomer,
        openEdit,
        editingCust,
        setEditingCust,
        changeStatus
    }
}

export default useCustomers