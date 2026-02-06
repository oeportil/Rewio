import { useEffect, useState, type FormEvent } from "react";
import { createApiGym, getApisGyms, updateApiGym } from "@/services/gym.service";
import type { apiTpag, IGym, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";


const useGym = () => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IGym>("gyms");
    const { closeModal, openModal } = useModal();
    const [editingGym, setEditingGym] = useState<IGym | null>(null);

    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        totalCount: 0
    });

    const getGyms = async () => {
        const response = await getApisGyms(pag);
        pagfunc(response.data)
    }

    const saveGym = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("name")) return showNotification({ type: "warning", content: "El nombre es obligatorio" });
        // edit or create
        const response = editingGym
            ? await updateApiGym({ data: formData, errorfun: showNotification, id: editingGym!.id })
            : await createApiGym({ data: formData, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Gimnasio ${editingGym ? "actualizado" : "creado"} correctamente` });
            closeModal();
            getGyms();
        }
    }
    const openEdit = (gym: IGym) => {
        setEditingGym(gym);
        openModal();
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    useEffect(() => {
        getGyms();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag])
    return {
        contextHolder,
        showNotification,
        values,
        pagination,
        handlePagination,
        pag,
        saveGym,
        openEdit,
        editingGym,
        setEditingGym
    }
}

export default useGym;