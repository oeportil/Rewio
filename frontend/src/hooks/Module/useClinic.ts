import { useEffect, useState, type FormEvent } from "react";
import { createApiClinic, getApisClinics, getClinicByslug, updateApiClinic } from "@/services/clinic.service";
import type { apiTpag, IClinic, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import { formDataKeysAndValues } from "@/utils/index";

const InitValue: IClinic = {
    address: "",
    createdAt: "",
    email: "",
    id: 0,
    logo: "",
    name: "",
    ownerId: 0,
    phone: "",
    status: false,
    slug: "",
    updatedAt: "",
    owner: { email: "", id: 0, name: "", createdAt: "", role: "", status: false, updatedAt: "" }
}

const useClinic = (fetchData = false) => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IClinic>("data");
    const { closeModal, openModal } = useModal();
    const [editingClinic, setEditingClinic] = useState<IClinic | null>(null);
    const [imageBase64, setImageBase64] = useState<string>("");
    const [clinic, setClinic] = useState<IClinic>(InitValue);

    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });


    const getClinics = async () => {
        const response = await getApisClinics(pag);
        pagfunc(response.value)
    }

    const getClinicBySlug = async (slug: string) => {
        const response = await getClinicByslug(slug);
        if (response && response.status) {
            setClinic(response.value)
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }


    const saveClinic = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("name")) return showNotification({ type: "warning", content: "El nombre es obligatorio" });
        const data = formDataKeysAndValues(e);

        // edit or create
        const response = editingClinic
            ? await updateApiClinic({ data: { ...data, logo: imageBase64 }, errorfun: showNotification, id: editingClinic!.id })
            : await createApiClinic({ data: { ...data, logo: imageBase64 }, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Clinica ${editingClinic ? "actualizada" : "creada"} correctamente` });
            closeModal();
            if (fetchData) {
                getClinics();
            }
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }
    const openEdit = (clinic: IClinic) => {
        setEditingClinic(clinic);
        openModal();
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    useEffect(() => {
        if (fetchData) {
            getClinics();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag])
    return {
        contextHolder,
        showNotification,
        values,
        pagination,
        handlePagination,
        pag,
        saveClinic,
        openEdit,
        editingClinic,
        setEditingClinic,
        setImageBase64,
        getClinicBySlug,
        clinic

    }
}

export default useClinic;