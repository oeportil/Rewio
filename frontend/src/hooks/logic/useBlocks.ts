import { useEffect, useState, type FormEvent } from "react";
import type { apiTpag, IBlocks, Tpagination } from "@/types/index";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import { formDataKeysAndValues } from "@/utils/index";
import { createApiBlock, getApiBlocksByDoctor } from "@/services/blockAndVacations.service";
import type { DatePickerProps } from "antd";


const useBlocks = ({ fetchData = false, idDoctor }: { fetchData: boolean, own?: boolean, idDoctor: number }) => {
    const { contextHolder, showNotification } = useNotification()
    const { close } = useModal();
    const [blocks, setBlocks] = useState<IBlocks[]>([])
    const [times, setTimes] = useState<{ date: string, startTime: string, endTime: string }>({
        date: "",
        startTime: "",
        endTime: ""
    })
    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: "",
        total: 0
    });


    const getBlocks = async () => {
        const response = await getApiBlocksByDoctor(idDoctor, pag.search);
        if (response && response.status) {
            setBlocks(response.value)
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }


    const saveBlock = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = formDataKeysAndValues(e);
        // edit or create
        const response = await createApiBlock({ data: { ...data, ...times, doctorId: idDoctor }, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Bloqueo creado correctamente` });
            close("blocks");
            if (fetchData) {
                getBlocks();
            }
        } else {
            showNotification({ type: "error", content: response.msg });
        }
    }

    useEffect(() => {
        if (fetchData) {
            getBlocks();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag])

    const onChangeDate: DatePickerProps["onChange"] = (_, dateString) => {
        console.log(dateString)
        if (dateString) setTimes({ ...times, date: dateString as string })
    };

    const handlePagination = (values: Tpagination) => {
        setPag({ ...pag, search: values.search })
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
        showNotification,
        blocks,
        saveBlock,
        onChangeDate,
        onChangeTime,
        pag,
        handlePagination
    }
}

export default useBlocks;