/* eslint-disable react-hooks/exhaustive-deps */
import {
    getApiAvailabilityDays,
    getApiAvailabilityHours,
} from "@/services/doctor.service";

import { useCallback, useEffect, useState } from "react";
import useNotification from "./useNotification";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

const useAvailability = ({
    idDoctor,
    idService,
}: {
    idDoctor: number;
    idService: number;
}) => {
    const { contextHolder, showNotification } = useNotification();

    const [availableDays, setAvailableDays] = useState<string[]>([]);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [date, setDate] = useState("");

    // 👇 PANEL ACTUAL DEL CALENDARIO
    const [month, setMonth] = useState(dayjs().month() + 1);
    const [year, setYear] = useState(dayjs().year());


    const getAvailableDays = useCallback(async () => {
        const response = await getApiAvailabilityDays(
            idDoctor,
            idService,
            year,
            month
        );

        if (response?.status) {
            setAvailableDays(response.value);
        } else {
            showNotification({
                type: "error",
                content: response.msg,
            });
        }
    }, [idDoctor, idService, month, year, showNotification]);


    const getAvailableHours = useCallback(
        async (selectedDate: string) => {
            const response = await getApiAvailabilityHours(
                idDoctor,
                idService,
                selectedDate
            );

            if (response?.status) {
                setAvailableSlots(response.value);
            }
        },
        [idDoctor, idService]
    );

    useEffect(() => {
        getAvailableDays();
    }, [month, year, idService, idDoctor]);

    useEffect(() => {
        if (date) getAvailableHours(date);
    }, [date, idService])


    const onPanelChange = (value: Dayjs) => {
        setMonth(value.month() + 1);
        setYear(value.year());
    };


    const onSelectDate = (value: Dayjs) => {
        const selected = value.format("YYYY-MM-DD");

        setDate(selected);
        getAvailableHours(selected);
    };

    const disabledDate = (current: Dayjs) => {
        if (!current) return false;

        if (current.endOf("day") < dayjs()) return true;

        return !availableDays.includes(
            current.format("YYYY-MM-DD")
        );
    };

    return {
        contextHolder,
        availableSlots,
        availableDays,
        date,
        disabledDate,
        onSelectDate,
        onPanelChange,
    };
};

export default useAvailability;
