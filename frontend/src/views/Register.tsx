import FormButton from "@/components/shared/forms/FormButton";
import FormGroup from "@/components/shared/forms/FormGroup";
import FormInput from "@/components/shared/forms/FormInput";
import FormPasswordInput from "@/components/shared/forms/FormPasswordInput";
import FormSelect from "@/components/shared/forms/FormSelect";
import Logo from "@/components/shared/Logo";
import useAuth from "@/hooks/Module/useAuth";
import useStoreAuth from "@/store/useStoreAuth";
import { useEffect } from "react";
import { regRoles } from "../consts";
import { Link } from "react-router";

const Register = () => {
  const { contextHolder, register } = useAuth();
  const token = useStoreAuth((set) => set.token);
  useEffect(() => {
    if (token) window.location.href = "dashboard";
  }, [token]);

  if (token) return null;

  return (
    <section className="h-screen flex items-center bg-linear-to-br from-sky-700 via-sky-200 to-sky-50  relative">
      {contextHolder}
      <div className="flex h-150 w-11/12 max-w-4xl mx-auto bg-gray-100 rounded-md z-10">
        <div className="w-full flex flex-col items-center justify-center border border-slate-300 lg:rounded-r-md">
          <form
            className="max-w-96 w-11/12 flex flex-col items-center justify-center space-y-1"
            onSubmit={register}
            noValidate
          >
            <Logo className="w-40" />
            <p className="text-sm text-gray-500/90 my-3">
              Registrarme gratuitamente
            </p>
            <FormGroup className="w-full ">
              <FormInput
                labelText="Nombre Completo"
                type="name"
                placeholder="Ej: Jonh Doe"
                InputClassName="w-full p-4 py-1"
                required
                name="name"
              />
            </FormGroup>
            <FormGroup className="w-full ">
              <FormInput
                labelText="Email"
                type="email"
                placeholder="email@email.com"
                InputClassName="w-full p-4 py-1"
                required
                name="email"
              />
            </FormGroup>
            <FormGroup className="w-full">
              <FormPasswordInput
                labelText="Contraseña"
                placeholder="Tu contraseña"
                InputClassName="w-full p-4 py-1"
                name="password"
              />
            </FormGroup>

            <FormGroup className="w-full">
              <FormPasswordInput
                labelText="Repite tu Contraseña"
                placeholder="Tu contraseña"
                InputClassName="w-full p-4 py-1"
                name="confpass"
              />
            </FormGroup>
            <FormGroup className="w-full">
              <label htmlFor="role" className="text-sm font-bold text-sky-950">
                Selecciona un rol{" "}
              </label>
              <FormSelect
                options={regRoles.filter((r) => r.value != "admin")}
                className="w-full"
                name="role"
              />
            </FormGroup>

            <div className="w-full flex items-center justify-between mt-4 text-gray-500/80">
              <Link to={"/login"} className="text-sm underline">
                Ya poseo una cuenta
              </Link>
            </div>
            <FormButton
              type="submit"
              className=" border border-sky-500 text-sky-500 mt-8 w-full text-sm xl:text-sm hover:opacity-90 transition-opacity font-semibold"
            >
              Crear cuenta
            </FormButton>
          </form>
        </div>
        <div className="w-full hidden lg:flex items-start overflow-hidden rounded-l-md relative">
          <div className="bg-sky-700/25 w-full h-full z-10 absolute" />
          <img
            className="w-full z-0 h-full"
            src="/login.png"
            alt="leftSideImage"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
