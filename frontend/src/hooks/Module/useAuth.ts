import type { FormEvent } from "react";
import { loginAction, registerAction } from "@/services/auth.service";
import useStoreAuth from "@/store/useStoreAuth";
import useNotification from "../logic/useNotification";
import { formDataKeysAndValues } from "@/utils/index";

const useAuth = () => {
    const { contextHolder, showNotification } = useNotification()
    const setToken = useStoreAuth((state) => state.setToken)
    const clear = useStoreAuth((state) => state.clearToken)


    const login = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //extraer las keys y las values del formulario
        const credentials = formDataKeysAndValues<{ email: string, password: string }>(e)
        //validar las cuestiones
        if (!credentials.email || !credentials.password)
            return showNotification({ type: "warning", content: "Faltan datos necesarios" });
        //consultar

        const response = await loginAction({ ...credentials, errorfun: showNotification });
        //guardar en el token
        if (response.status) {
            setToken(response.value.token)
            window.location.href = "dashboard"
        } else return showNotification({ type: "warning", content: response.msg });
    }

    const logout = () => {
        clear()
        window.location.href = "/login"
    }

    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //extraer las keys y las values del formulario
        const credentials = formDataKeysAndValues<{ email: string, password: string, confpass: string, role: string }>(e)
        //validar las cuestiones
        if (!credentials.email || !credentials.password || !credentials.role || !credentials.confpass)
            return showNotification({ type: "warning", content: "Faltan datos necesarios" });

        if (credentials.password != credentials.confpass) return showNotification({ type: "warning", content: "La contraseña debe de coinsidir en ambos campos" });
        //consultar
        const response = await registerAction({ data: credentials, errorfun: showNotification });
        //guardar en el token
        if (response.status) {
            setToken(response.value.token)
            window.location.href = "dashboard"
        } else return showNotification({ type: "warning", content: response.msg });


    }




    return {
        login,
        logout,
        register,
        contextHolder
    }
}

export default useAuth