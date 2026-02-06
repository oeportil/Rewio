import { useEffect, useState, type FormEvent } from "react";
import type { apiTpag, IPlan, Tpagination } from "@/types/index";
import usePagination from "../logic/usePagination";
import useNotification from "../logic/useNotification";
import { createApiPlan, getApiPlans, updateApiPlan } from "@/services/plan.service";
import useModal from "@/store/useModal";
import { formDataKeysAndValues } from "@/utils/index";


const usePlan = () => {
    const { contextHolder, showNotification } = useNotification()
    const { pagfunc, values, pagination, handlePag } = usePagination<IPlan>("plans");
    const [editingPlan, setEditingPlan] = useState<IPlan | null>(null);
    const { closeModal, openModal } = useModal();
    const [pag, setPag] = useState<apiTpag>({
        errorfun: showNotification,
        limit: 10,
        page: 1,
        search: ""
    });

    const getPlans = async () => {
        const response = await getApiPlans(pag);
        pagfunc(response.data)
    }
    const savePlan = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = formDataKeysAndValues<Record<string, any>>(e);

        const data: Omit<IPlan, "id" | "_count" | "administration"> = {
            name: raw.name,
            cost: Number(raw.cost),
            maxUsers: Number(raw.maxUsers),
            maxClients: Number(raw.maxClients),
            maxProducts: Number(raw.maxProducts),

            posEnabled: raw.posEnabled === "true" || raw.posEnabled === "on",
            billingEnabled: raw.billingEnabled === "true" || raw.billingEnabled === "on",
            statisticsEnabled: raw.statisticsEnabled === "true" || raw.statisticsEnabled === "on",
        };
        // edit or create
        const response = editingPlan
            ? await updateApiPlan({ data, errorfun: showNotification, id: editingPlan!.id })
            : await createApiPlan({ data, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Gimnasio ${editingPlan ? "actualizado" : "creado"} correctamente` });
            closeModal();
            getPlans();
        }
    }

    const handlePagination = (values: Tpagination) => {
        handlePag(values, pag, setPag)
    }

    const openEdit = (plan: IPlan) => {
        setEditingPlan(plan);
        openModal();
    }

    useEffect(() => {
        getPlans()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pag])


    return {
        contextHolder,
        showNotification,
        values,
        pagination,
        handlePagination,
        pag,
        openEdit,
        savePlan,
        setEditingPlan,
        editingPlan
    }
}

export default usePlan;