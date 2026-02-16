import { useEffect, useState, type FormEvent } from "react";
import { getApisClinicsByOwner, updateApiClinic } from "@/services/clinic.service";
import type { apiTpag, IClinic, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import { formDataKeysAndValues } from "@/utils/index";


const useClinic = () => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IClinic>("data");
    const { close, open } = useModal();
    const [editingClinic, setEditingClinic] = useState<IClinic | null>(null);
    const [imageBase64, setImageBase64] = useState<string>("");

    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });

    const getClinicsByOwner = async () => {
        const response = await getApisClinicsByOwner(pag);
        pagfunc(response.value)
        console.log(response)
    }

    const saveClinic = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("name")) return showNotification({ type: "warning", content: "El nombre es obligatorio" });
        const data = formDataKeysAndValues(e);

        // edit or create
        const response = await updateApiClinic({ data: { ...data, logo: imageBase64 }, errorfun: showNotification, id: editingClinic!.id })

        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Clinica ${editingClinic ? "actualizada" : "creada"} correctamente` });
            close("clinic");
            getClinicsByOwner();
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }
    const openEdit = (clinic: IClinic) => {
        setEditingClinic(clinic);
        open("clinic");
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    useEffect(() => {
        getClinicsByOwner();
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
        setImageBase64
    }
}

export default useClinic;