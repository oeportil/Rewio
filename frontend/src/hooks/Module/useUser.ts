import { useEffect, useState, type FormEvent } from "react";
import type { apiTpag, IUser, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import { getApisUsers, getApisClinicOwners, updateApiUser, createApiUser } from "@/services/user.service";


const useUser = () => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IUser>("data");
    const { pagfunc: owFunc, values: owners, } = usePagination<IUser>("data");
    const { closeModal, openModal } = useModal();
    const [editingUser, setEditingUser] = useState<IUser | null>(null);

    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });
    const [op] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 1000,
        page: 1,
        search: "",
        total: 0
    });

    const getUsers = async () => {
        const response = await getApisUsers(pag);
        pagfunc(response.value)
    }

    const getClinicOwners = async () => {
        const response = await getApisClinicOwners(op);
        owFunc(response.value)
    }

    const saveUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("name")) return showNotification({ type: "warning", content: "El nombre es obligatorio" });
        // edit or create
        const response = editingUser
            ? await updateApiUser({ data: formData, errorfun: showNotification, id: editingUser!.id })
            : await createApiUser({ data: formData, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Gimnasio ${editingUser ? "actualizado" : "creado"} correctamente` });
            closeModal();
            getUsers();
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }
    const openEdit = (clinic: IUser) => {
        setEditingUser(clinic);
        openModal();
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    useEffect(() => {
        getUsers();
        getClinicOwners();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag])
    return {
        contextHolder,
        showNotification,
        values,
        pagination,
        handlePagination,
        pag,
        saveUser,
        openEdit,
        editingUser,
        setEditingUser,
        owners
    }
}

export default useUser;