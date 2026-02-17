import { useEffect, useState, type FormEvent } from "react";
import type { apiTpag, IUser, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import { updateApiUser, createApiUser, deleteApiUser, changePassApiUser } from "@/services/user.service";
import useStoreAuth from "@/store/useStoreAuth";
import { useUserStore } from "@/store/useUserStore";
import { getApiDoctors, getApiMyDoctors } from "@/services/doctor.service";
import { formDataKeysAndValues } from "@/utils/index";


const useDoctor = ({ fetchData = true, type = 'all', clinicId }: { fetchData: boolean, type?: 'owners' | 'all', clinicId?: number }) => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IUser>("data");
    const { close, open } = useModal();
    const [editingDoctor, setEditingDoctor] = useState<IUser | null>(null);
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



    const getDoctors = async () => {
        //ojo, "all" es para un fetch en entidad user para mapearlos en el select al crear un doctor, 
        // y "owners" es un fetch a la entidad doctor para mostrar los doctores de cada una de las clinicas
        const response = type === 'all' ? await getApiDoctors(pag) : await getApiMyDoctors(pag, clinicId!);
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

    const saveDoctor = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("name")) return showNotification({ type: "warning", content: "El nombre es obligatorio" });
        const data = formDataKeysAndValues(e)


        // edit or create
        const response = editingDoctor
            ? await updateApiUser({ data, errorfun: showNotification, id: editingDoctor.id })
            : await createApiUser({ data, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Usuario ${editingDoctor ? "actualizado" : "creado"} correctamente` });
            close("doctorModal");
            if (fetchData) getDoctors();
            else updateStore(response.value);
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }
    const openEdit = (clinic: IUser) => {
        setEditingDoctor(clinic);
        open("doctorModal");
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    useEffect(() => {
        if (fetchData) {
            getDoctors();
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
        saveDoctor,
        openEdit,
        editingDoctor,
        setEditingDoctor,
        disableUser,
        setChPass,
        chPass,
        changePassword
    }
}

export default useDoctor;