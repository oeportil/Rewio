import { useEffect, useState, type FormEvent } from "react";
import useNotification from "./useNotification";
import useModal from "@/store/useModal";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { createApiVacation, deleteApiVacation, getApiVacationsByDoctor } from "@/services/blockAndVacations.service";
import type { IVacations } from "@/types/index";
import { formDataKeysAndValues } from "@/utils/index";

const useVacations = ({ fetchData = false, idDoctor }: { fetchData: boolean, own?: boolean, idDoctor: number }) => {
    const { contextHolder, showNotification } = useNotification()
    const [vacations, setVacations] = useState<IVacations[]>([])
    const { close } = useModal();
    const [dates, setDates] = useState<{ startDate: string, endDate: string }>({
        startDate: "",
        endDate: ""
    });

    const getVacations = async () => {
        const response = await getApiVacationsByDoctor(idDoctor);
        if (response && response.status) {
            setVacations(response.value)
            return
        } else {
            return showNotification({ type: "error", content: response.msg });
        }
    }

    const saveVacation = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = formDataKeysAndValues(e);
        const { endDate, startDate } = dates
        const response = await createApiVacation({ data: { ...data, endDate, startDate, doctorId: idDoctor }, errorfun: showNotification })
        if (response && response.status) {
            showNotification({ type: "success", content: `Vacaciones agregadas correctamente` });
            close("vacations");
            setDates({ startDate: "", endDate: "" })
            if (fetchData) {
                getVacations();
            }
        } else {
            showNotification({ type: "error", content: response.msg });
        }

    }

    useEffect(() => {
        if (fetchData) {
            getVacations()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //deshabilitar los dias anteriores 
    const disabledDate = (current: Dayjs) => {
        return current && current < dayjs().endOf("day");
    };


    const deleteVacation = async (id: number) => {
        const response = await deleteApiVacation({ id, errorfun: showNotification })
        if (response && response.status) {
            close("deleteService")
            showNotification({ type: "success", content: `Vacación eliminada correctamente` });
            getVacations();
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }
    const onRangeChange = (
        dates: null | (Dayjs | null)[],
        dateStrings: string[],
    ) => {
        if (dates) {
            setDates({ startDate: dateStrings[0], endDate: dateStrings[1] })
        } else {
            setDates({ startDate: "", endDate: "" })
        }
    };

    return {
        contextHolder,
        vacations,
        disabledDate,
        onRangeChange,
        saveVacation,
        deleteVacation
    }

}
export default useVacations;