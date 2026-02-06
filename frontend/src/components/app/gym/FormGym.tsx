import FormButton from "@/components/shared/forms/FormButton";
import FormInput from "@/components/shared/forms/FormInput";
import FormSelect from "@/components/shared/forms/FormSelect";
import usePlan from "@/hooks/Module/usePlan";
import type { IGym } from "@/types/index";
import { useEffect, useRef } from "react";

type Prop = {
  contextHolder: React.ReactNode;
  saveGym: (e: React.FormEvent<HTMLFormElement>) => void;
  editingGym?: IGym | null;
};

const FormGym = ({ contextHolder, saveGym, editingGym }: Prop) => {
  const { values, handlePagination } = usePlan();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    handlePagination({ page: 1, search: "", limit: 100 });
    const form = formRef.current;

    if (editingGym) {
      if (form) {
        (form.elements.namedItem("name") as HTMLInputElement).value =
          editingGym.name;
        (form.elements.namedItem("phone") as HTMLInputElement).value =
          editingGym.phone;
        (form.elements.namedItem("planId") as HTMLSelectElement).value =
          `${editingGym.plan.id}`;
      }
    } else {
      if (form) form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingGym]);

  return (
    <>
      {contextHolder}
      <h4 className="m-2 text-center text-xl font-bold text-amber-950">
        {editingGym ? "Editar Gimnasio" : "Crear nuevo Gimnasio"}
      </h4>
      <form className="" onSubmit={saveGym} method="POST" ref={formRef}>
        <div className="grid grid-cols-2 gap-2">
          <FormInput id="name" name="name" labelText="Nombre" htmlFor="name" />
          <FormInput
            id="phone"
            name="phone"
            labelText="Teléfono"
            htmlFor="phone"
            type="tel"
          />
          <FormInput
            id="images"
            name="images"
            labelText="Imagen"
            htmlFor="images"
            type="file"
            accept="image/*"
          />
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="planId"
              className="uppercase text-md font-bold text-amber-950"
            >
              Plan
            </label>
            <FormSelect
              id="planId"
              name="planId"
              options={values.map((v) => ({
                id: v.id,
                value: `${v.id}`,
                label: `${v.name} - $${v.cost}`,
              }))}
            />
          </div>
        </div>
        <FormButton
          type="submit"
          className="text-sm xl:text-sm hover:opacity-90 transition-opacity font-semibold  w-full col-span-2 mt-4 "
        >
          {editingGym ? "Actualizar Gimnasio" : "Crear Gimnasio"}
        </FormButton>
      </form>
    </>
  );
};

export default FormGym;
