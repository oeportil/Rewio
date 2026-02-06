import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { IRol } from "@/types/index";
import useNotification from "../logic/useNotification";
import useModal from "@/store/useModal";
import { createApiRoles, getApisRoles, updateApiRoles } from "@/services/role.service";
import { formDataKeysAndValues } from "@/utils/index";


const useRoles = () => {
    const { contextHolder, showNotification } = useNotification()
    const [roles, setRoles] = useState<IRol[]>([]);
    const { closeModal, openModal } = useModal();
    const [rol, setRol] = useState<IRol>({
        name: "",
        description: "",
        id: 0
    } as IRol);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const getRoles = async () => {
        const response = await getApisRoles({ limit: 100, page: 1, search: "", errorfun: showNotification, totalCount: 0 });
        setRoles(response.data)
    }

    const saveRol = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const raw = formDataKeysAndValues<Record<string, any>>(e);
        const data: Omit<IRol, "isSystem" | "id"> = {
            name: raw.name,
            description: raw.description,
        };
        // edit or create
        const response = rol.id
            ? await updateApiRoles({ data, errorfun: showNotification, id: rol!.id })
            : await createApiRoles({ data, errorfun: showNotification });
        //success or not
        if (response && response.status) {
            showNotification({ type: "success", content: `Rol ${isEditing ? "actualizado" : "creado"} correctamente` });
            closeModal();
            getRoles();
        }
    }

    const openEdit = (rol: IRol) => {

        setIsEditing(true);
        setRol(rol);
        openModal();
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        setRol({ ...rol, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        if (!isEditing) {
            setRol({ name: "", description: "", id: 0 } as IRol);
        }
    }, [isEditing])


    useEffect(() => {
        getRoles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return {
        contextHolder,
        showNotification,
        roles,
        saveRol,
        openEdit,
        rol,
        setRol,
        handleChange,
        isEditing,
        setIsEditing
    }
}

export default useRoles;