import FormButton from "@/components/shared/forms/FormButton";
import FormInput from "@/components/shared/forms/FormInput";
import FormSelect from "@/components/shared/forms/FormSelect";
import useGym from "@/hooks/Module/useGym";
import useRoles from "@/hooks/Module/useRoles";
import type { ICustomer } from "@/types/index";
import { useEffect, useRef } from "react";

type Prop = {
  contextHolder: React.ReactNode;
  savePlan: (e: React.FormEvent<HTMLFormElement>) => void;
  editingCustomer?: ICustomer | null;
};

const FormCustomer = ({ contextHolder, savePlan, editingCustomer }: Prop) => {
  const { handlePagination, values: valGym } = useGym();
  const { roles } = useRoles();

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    handlePagination({ page: 1, search: "", limit: 100 });
    const form = formRef.current;

    if (editingCustomer) {
      if (form) {
        (form.elements.namedItem("username") as HTMLInputElement).value =
          editingCustomer.username;
        (form.elements.namedItem("email") as HTMLInputElement).value =
          editingCustomer.email;
        (form.elements.namedItem("gymId") as HTMLInputElement).value =
          `${editingCustomer.gym.id}`;
        (form.elements.namedItem("roleId") as HTMLInputElement).value =
          `${editingCustomer.role.id}`;
      }
    } else {
      if (form) form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingCustomer]);

  return (
    <>
      {contextHolder}
      <h4 className="m-2 text-center text-xl font-bold text-amber-950">
        {editingCustomer ? "Editar Cliente" : "Crear nuevo Cliente"}
      </h4>
      <form className="" onSubmit={savePlan} method="POST" ref={formRef}>
        <div className="grid grid-cols-2 gap-2">
          <FormInput
            id="username"
            name="username"
            labelText="username"
            htmlFor="username"
          />
          <FormInput
            id="email"
            name="email"
            labelText="Email"
            htmlFor="email"
            type="email"
          />
          <FormInput
            id="password"
            name="password"
            labelText="Password"
            htmlFor="password"
            type="password"
          />
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="gymId"
              className="uppercase text-md font-bold text-amber-950"
            >
              Gimnasio perteneciente
            </label>
            <FormSelect
              id="gymId"
              name="gymId"
              options={valGym.map((v) => ({
                id: v.id,
                value: `${v.id}`,
                label: `${v.name}`,
              }))}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="roleId"
              className="uppercase text-md font-bold text-amber-950"
            >
              Rol
            </label>
            <FormSelect
              id="roleId"
              name="roleId"
              options={roles.map((v) => ({
                id: v.id,
                value: `${v.id}`,
                label: `${v.name}`,
              }))}
            />
          </div>
        </div>
        <FormButton
          type="submit"
          className="text-sm xl:text-sm hover:opacity-90 transition-opacity font-semibold  w-full col-span-2 mt-4 "
        >
          {editingCustomer ? "Actualizar Cliente" : "Crear Cliente"}
        </FormButton>
      </form>
    </>
  );
};
export default FormCustomer;
