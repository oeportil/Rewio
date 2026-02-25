import { getApiAvailability } from "@/services/doctor.service"
import { useCallback, useEffect, useState } from "react"
import useNotification from "./useNotification"
import type { AvailabilityResponse } from "@/types/index"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"

const useAvailability = ({ idDoctor, idService }: { idDoctor: number, idService: number }) => {
    const [availableSlots, setAvailableSlots] = useState<AvailabilityResponse>([])
    const { contextHolder, showNotification } = useNotification();
    const [date, setDate] = useState<string>("");

    const getDoctorAvailability = useCallback(
        async () => {
            const response = await getApiAvailability(idDoctor, idService, date)
            if (response && response.status) {
                setAvailableSlots(response.value)
            } else {
                showNotification({ type: "error", content: response.msg })
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [idDoctor, idService, date],
    )


    useEffect(() => {
        getDoctorAvailability()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idDoctor, idService, date])

    const disabledDate = (current: Dayjs) => {
        return current && current < dayjs().endOf("day");
    };

    const onChangeDate = (_: unknown, date: string | null) => {
        if (date) setDate(date)
        else setDate("")
    }

    return {
        contextHolder,
        availableSlots,
        disabledDate,
        onChangeDate,
        date
    }
}

export default useAvailability