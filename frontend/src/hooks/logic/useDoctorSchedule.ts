import { useEffect, useState, type FormEvent } from "react";
import useNotification from "./useNotification";
import useModal from "@/store/useModal";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { formDataKeysAndValues } from "@/utils/index";
import { createApiSchedule, deleteApiSchedule, getApiSchedules } from "@/services/schedulesDoctor.service";
import type { ISchedule } from "@/types/index";

const useDoctorSchedule = ({ fetchData = false, idDoctor, clinicId }: { fetchData: boolean, own?: boolean, idDoctor: number, clinicId: number }) => {
    const { contextHolder, showNotification } = useNotification()
    const [schedules, setSchedules] = useState<ISchedule[]>([])
    const { close } = useModal();
    const [times, setTimes] = useState<{ startTime: string, endTime: string, weekdays: number[] }>({
        weekdays: [],
        startTime: "",
        endTime: ""
    });

    const getSchedules = async () => {
        const response = await getApiSchedules(clinicId, idDoctor);
        if (response && response.status) {
            setSchedules(response.value)
            return
        } else {
            return showNotification({ type: "error", content: response.msg });
        }
    }

    const saveSchedule = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = formDataKeysAndValues(e);
        const response = await createApiSchedule({ data: { ...data, ...times, doctorId: idDoctor }, errorfun: showNotification }, clinicId, idDoctor)
        if (response && response.status) {
            showNotification({ type: "success", content: `Horario agregado correctamente` });
            close("schedule");
            setTimes({ startTime: "", endTime: "", weekdays: [] })
            if (fetchData) {
                getSchedules();
            }
        } else {
            showNotification({ type: "error", content: response.msg });
        }

    }

    useEffect(() => {
        if (fetchData) {
            getSchedules()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //deshabilitar los dias anteriores 
    const disabledDate = (current: Dayjs) => {
        return current && current < dayjs().endOf("day");
    };

    //array de fechas 
    const AddDays = (value: string[]) => {
        const weekdays = value.map(v => (parseInt(v)))
        setTimes({ ...times, weekdays })
    }

    const deleteSchedule = async (id: number) => {
        const response = await deleteApiSchedule({ id, errorfun: showNotification })
        if (response && response.status) {
            close("deleteSchedule")
            showNotification({ type: "success", content: `Horario eliminado correctamente` });
            getSchedules();
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }
    const onChangeTime = (timeString: string | null, set: 'start' | 'end') => {
        if (set != 'end') {
            if (timeString) setTimes({ ...times, startTime: timeString })
            else setTimes({ ...times, startTime: "" })
        } else {
            if (timeString) setTimes({ ...times, endTime: timeString })
            else setTimes({ ...times, endTime: "" })
        }
    }


    return {
        contextHolder,
        schedules,
        disabledDate,
        onChangeTime,
        saveSchedule,
        deleteSchedule,
        setTimes,
        times,
        AddDays
    }

}
export default useDoctorSchedule;