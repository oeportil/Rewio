import { useEffect, useState, type FormEvent } from "react";
import type { apiTpag, IUser, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import { getApisUsers, getApisClinicOwners, updateApiUser, createApiUser, deleteApiUser, changePassApiUser } from "@/services/user.service";
import useStoreAuth from "@/store/useStoreAuth";
import { useUserStore } from "@/store/useUserStore";


const useUser = ({ fetchData = true, type = 'all' }: { fetchData: boolean, type?: 'owners' | 'all' }) => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IUser>("data");
    const { close, open } = useModal();
    const [editingUser, setEditingUser] = useState<IUser | null>(null);
    const closeSesion = useStoreAuth((set) => set.clearToken);
    const { updateStore } = useUserStore();
    const [chPass, setChPass] = useState<{
        oldPass: string,
        newPass: string,
        newPass2: string
    }>({
        oldPass: "",
        newPass: "",
        newPass2: ""
    });

    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });



    const getUsers = async () => {
        const response = type === 'all' ? await getApisUsers(pag) : await getApisClinicOwners(pag);
        pagfunc(response.value)
    }

    const changePassword = async () => {
        if (chPass.newPass != chPass.newPass2) return showNotification({ type: "warning", content: "Las contraseñas deben de ser las mismas" });
        const { oldPass, newPass } = chPass
        const response = await changePassApiUser({ errorfun: showNotification, data: { oldPass, newPass } });
        if (response && response.status) showNotification({ type: "success", content: "Contraseña modificada correctamente" });
        else showNotification({ type: "error", content: response.msg });
        return
    }

    const disableUser = async () => {
        const response = await deleteApiUser({ errorfun: showNotification })
        if (response && response.status) {
            closeSesion()
            window.location.href = "/login"
        }
        else showNotification({ type: "error", content: response.msg });
    }

    const saveUser = async ({ e, name, email, id = undefined, dui }: { e?: FormEvent<HTMLFormElement>, name?: string, email?: string, id?: number, dui?: string }) => {
        let data
        if (e) {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            if (!formData.get("name")) return showNotification({ type: "warning", content: "El nombre es obligatorio" });
            data = formData
        } else data = { name, email, dui }
        // edit or create
        const response = editingUser
            ? await updateApiUser({ data, errorfun: showNotification, id })
            : await createApiUser({ data, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Usuario ${editingUser ? "actualizado" : "creado"} correctamente` });
            close("user");
            if (fetchData) getUsers();
            else updateStore(response.value);
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }
    const openEdit = (clinic: IUser) => {
        setEditingUser(clinic);
        open("user");
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    useEffect(() => {
        if (fetchData) {
            getUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag, fetchData])
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
        disableUser,
        setChPass,
        chPass,
        changePassword
    }
}

export default useUser;