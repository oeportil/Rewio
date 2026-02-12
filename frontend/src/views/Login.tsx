import FormButton from "@/components/shared/forms/FormButton";
import FormGroup from "@/components/shared/forms/FormGroup";
import FormInput from "@/components/shared/forms/FormInput";
import FormPasswordInput from "@/components/shared/forms/FormPasswordInput";
import Logo from "@/components/shared/Logo";
import useAuth from "@/hooks/Module/useAuth";
import useStoreAuth from "@/store/useStoreAuth";
import { useEffect } from "react";
import { Link } from "react-router";

const Login = () => {
  const { contextHolder, login } = useAuth();
  const token = useStoreAuth((set) => set.token);
  useEffect(() => {
    if (token) window.location.href = "dashboard";
  }, [token]);

  if (token) return null;

  return (
    <section className="h-screen flex items-center bg-linear-to-br from-sky-700 via-sky-200 to-sky-50  relative">
      {contextHolder}
      <div className="flex h-150 w-11/12 max-w-4xl mx-auto bg-gray-100 rounded-md z-10">
        <div className="w-full hidden lg:flex items-start overflow-hidden rounded-l-md relative">
          <div className="bg-sky-700/25 w-full h-full z-10 absolute" />
          <img
            className="w-full z-0 h-full"
            src="/login.png"
            alt="leftSideImage"
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center border border-slate-300 lg:rounded-r-md">
          <form
            className="max-w-96 w-11/12 flex flex-col items-center justify-center"
            onSubmit={login}
            noValidate
          >
            <Logo className="w-40" />

            <p className="text-sm text-gray-500/90 my-3">
              Volviste! Inicia sesión para continuar
            </p>

            <FormGroup className="w-full ">
              <FormInput
                labelText="Correo Electronico"
                type="email"
                placeholder="Email"
                InputClassName="w-full p-4 py-2"
                required
                name="email"
              />
            </FormGroup>

            <FormGroup className="w-full">
              <FormPasswordInput
                labelText="Contraseña"
                placeholder="Tu contraseña"
                InputClassName="w-full p-4 py-2"
                name="password"
              />
            </FormGroup>

            <div className="w-full flex items-center justify-between mt-4 text-gray-500/80">
              <a className="text-sm underline" href="#">
                ¿Olvidaste tu contraseña?
              </a>
              <Link to={"/register"} className="text-sm underline">
                Registrarme
              </Link>
            </div>

            <FormButton
              type="submit"
              className="mt-8 w-full text-sm xl:text-sm hover:opacity-90 transition-opacity font-semibold border border-sky-500 text-sky-500"
            >
              Iniciar Sesión
            </FormButton>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
