import { useEffect, useState, type FormEvent } from "react";
import type { apiTpag, IDoctor, IUser, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import useStoreAuth from "@/store/useStoreAuth";
import { useUserStore } from "@/store/useUserStore";
import { createApiDoctor, deleteApiDoctor, getApiDoctorById, getApiDoctors, getApiMyDoctors, updateApiDoctor } from "@/services/doctor.service";
import { formDataKeysAndValues } from "@/utils/index";


const useDoctor = ({ fetchData = true, type = 'all', clinicId }: { fetchData: boolean, type?: 'owners' | 'all', clinicId?: number }) => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IUser | IDoctor>("data");
    const { close } = useModal();
    const closeSesion = useStoreAuth((set) => set.clearToken);
    const { updateStore } = useUserStore();
    const [userId, setUserId] = useState<number>(0);
    const [doctor, setDoctor] = useState<IDoctor | null>(null);
    const [form, setForm] = useState({
        specialty: "",
        color: "#0ea5e9",
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

    const getDoctorByClinicAndId = async (doctorId: number) => {
        const response = await getApiDoctorById(clinicId!, doctorId)
        if (response && response.status) {
            setDoctor(response.value)
            setForm({ color: response.value.color, specialty: response.value.specialty })
        }
        else showNotification({ type: "error", content: response.msg });
    }

    const deleteDoctor = async (id: number) => {
        const response = await deleteApiDoctor({ errorfun: showNotification, id }, clinicId!)
        if (response && response.status) {
            closeSesion()
            window.location.href = "/login"
        }
        else showNotification({ type: "error", content: response.msg });
    }

    const updateDoctor = async (id: number) => {
        if (!form.color || !form.specialty) showNotification({ type: "warning", content: "Faltan campos necesarios" });
        const response = await updateApiDoctor({ data: form, errorfun: showNotification, id }, +clinicId!)
        if (response && response.status) {
            showNotification({ type: "success", content: "Doctor Actualizado Correctamente" });
        }
        else showNotification({ type: "error", content: response.msg });
    }

    const saveDoctor = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const data = formDataKeysAndValues(e)
        // edit or create
        const response = await createApiDoctor({ data: { ...data, clinicId, userId }, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Doctor creado correctamente` });
            close("doctorModal");
            if (fetchData) getDoctors();
            else updateStore(response.value);
        } else {
            showNotification({ type: "error", content: response.msg });
        }
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
        deleteDoctor,
        setUserId,
        doctor,
        getDoctorByClinicAndId,
        form,
        setForm,
        updateDoctor
    }
}

export default useDoctor;