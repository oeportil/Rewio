import type { apiTpag, Tpagination, TPagination } from "@/types/index"
import { useState } from "react"



type TApiResponse<T> = {
    pagination: TPagination
} & Record<string, T[]>


function usePagination<T>(key: string) {
    const [values, setValues] = useState<T[]>([]);
    const [pagination, setPagination] = useState<TPagination>({
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 10,
        page: 1,
        totalCount: 0,
        totalPages: 0
    });

    const pagfunc = (data: TApiResponse<T>) => {
        setValues(data[key])
        setPagination(data.pagination);
    }

    const handlePag = ({ limit, page, search }: Tpagination,
        pag: apiTpag,
        setPag: (value: apiTpag) => void
    ) => {
        setPag({ ...pag, limit, page, search })
    }

    return {
        pagfunc,
        pagination,
        values,
        handlePag
    }
}

export default usePagination;