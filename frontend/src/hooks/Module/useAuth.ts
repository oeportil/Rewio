import type { FormEvent } from "react";
import { loginAction } from "@/services/auth.service";
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
        console.log(response)
        setToken(response.data.token)
        window.location.href = "dashboard"
    }

    const logout = () => {
        clear()
        window.location.href = "/login"
    }

    //     model User {
    //   id        Int      @id @default(autoincrement())
    //   name      String
    //   email     String   @unique
    //   password  String
    //   role      userRole
    //   status    Boolean
    //   createdAt DateTime @default(now())
    //   updatedAt DateTime @updatedAt
    //   logicDel  Boolean  @default(false)

    //   clinicsOwned Clinic[]
    //   doctor       Doctor?
    //   patient      Patient?
    //   clinicUsers  ClinicUser[]
    // }
    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //extraer las keys y las values del formulario
        const credentials = formDataKeysAndValues<{ email: string, password: string }>(e)
        //validar las cuestiones
        if (!credentials.email || !credentials.password)
            return showNotification({ type: "warning", content: "Faltan datos necesarios" });
        //consultar
        const response = await loginAction({ ...credentials, errorfun: showNotification });
        //guardar en el token
        console.log(response)
        setToken(response.data.token)
        window.location.href = "dashboard"
    }


    return {
        login,
        logout,
        register,
        contextHolder
    }
}

export default useAuth