import { useStoreAppointment } from "@/store/useStoreAppointment"
import useNotification from "../logic/useNotification";
import { cancellApiAppointment, confirmApiAppointment, createApiAppointment, doneApiAppointment, getApiClinicAppointment, getApiDoctorAppointment, getApiMyAppointment } from "@/services/appointment.service";
import usePagination from "../logic/usePagination";
import { useEffect, useState } from "react";
import type { apiTpag, IAppointment, IClinicAppointment, Tpagination } from "@/types/index";


export const useAppointment = ({ type, id, now = true, doctorId }:
    { type: "doctor" | "patient" | "clinic", id?: number, now?: boolean, doctorId?: number }) => {
    const { appointment, cleanAppointment, setAppointments } = useStoreAppointment();
    const { contextHolder, showNotification } = useNotification();
    const { handlePag, pagfunc, values } = usePagination<IAppointment | IClinicAppointment>("data");
    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });

    const getAppointments = async () => {
        const response = type == "patient" ? await getApiMyAppointment(pag) : type == "clinic" ?
            await getApiClinicAppointment(pag, id!, now ? new Date().toISOString().split('T')[0] : undefined)
            : await getApiDoctorAppointment(pag, id!, now ? new Date().toISOString().split('T')[0] : undefined, doctorId);
        await pagfunc(response.value)
        setAppointments(values)
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


    const cancellAppointment = async (id: number) => {
        const response = await cancellApiAppointment({ id, data: {}, errorfun: showNotification });
        if (response && response.status) {
            getAppointments()
        } else {
            showNotification({ type: "error", content: response.msg })
        }
    }

    const doneAppointment = async (id: number) => {
        const response = await doneApiAppointment({ id, data: {}, errorfun: showNotification });
        if (response && response.status) {
            getAppointments()
        } else {
            showNotification({ type: "error", content: response.msg })
        }
    }

    const confirmAppointment = async (id: number) => {
        const response = await confirmApiAppointment({ id, data: {}, errorfun: showNotification });
        if (response && response.status) {
            getAppointments()
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
        values,
        cancellAppointment,
        doneAppointment,
        confirmAppointment,
        getAppointments,
        pag
    }
}