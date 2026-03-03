import { useStoreAppointment } from "@/store/useStoreAppointment"
import useNotification from "../logic/useNotification";
import { createApiAppointment, getApiMyAppointment } from "@/services/appointment.service";
import usePagination from "../logic/usePagination";
import { useEffect, useState } from "react";
import type { apiTpag, IAppointment, Tpagination } from "@/types/index";


export const useAppointment = () => {
    const { appointment, cleanAppointment } = useStoreAppointment();
    const { contextHolder, showNotification } = useNotification();
    const { handlePag, pagfunc, values } = usePagination<IAppointment>("data");
    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });

    const getAppointments = async () => {
        const response = await getApiMyAppointment(pag)
        pagfunc(response.value)
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    const saveAppointment = async () => {
        if (!appointment.date && !appointment.startTime)
            showNotification({ type: "warning", content: "Faltan datos Importantes para agendar la cita" });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { duration, ...data } = appointment
        const response = await createApiAppointment({ data, errorfun: showNotification });
        if (response && response.status) {

            cleanAppointment();
        } else {
            showNotification({ type: "error", content: response.msg })
        }
    }

    useEffect(() => {
        getAppointments()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag])


    return {
        saveAppointment,
        contextHolder,
        setPag,
        handlePagination,
        values
    }
}