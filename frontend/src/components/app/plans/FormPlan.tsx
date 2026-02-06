import FormButton from "@/components/shared/forms/FormButton";
import FormInput from "@/components/shared/forms/FormInput";
import usePlan from "@/hooks/Module/usePlan";
import type { IPlan } from "@/types/index";
import { useEffect, useRef } from "react";

type Prop = {
  contextHolder: React.ReactNode;
  savePlan: (e: React.FormEvent<HTMLFormElement>) => void;
  editingPlan?: IPlan | null;
};

const FormPlan = ({ contextHolder, savePlan, editingPlan }: Prop) => {
  const { handlePagination } = usePlan();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    handlePagination({ page: 1, search: "", limit: 100 });
    const form = formRef.current;

    if (editingPlan) {
      if (form) {
        (form.elements.namedItem("name") as HTMLInputElement).value =
          editingPlan.name;
        (form.elements.namedItem("cost") as HTMLInputElement).value =
          `${editingPlan.cost}`;
        (form.elements.namedItem("maxUsers") as HTMLInputElement).value =
          `${editingPlan.maxUsers}`;
        (form.elements.namedItem("maxClients") as HTMLInputElement).value =
          `${editingPlan.maxClients}`;
        (form.elements.namedItem("maxProducts") as HTMLInputElement).value =
          `${editingPlan.maxProducts}`;
        (form.elements.namedItem("posEnabled") as HTMLInputElement).checked =
          editingPlan.posEnabled;
        (
          form.elements.namedItem("billingEnabled") as HTMLInputElement
        ).checked = editingPlan.billingEnabled;
        (
          form.elements.namedItem("statisticsEnabled") as HTMLInputElement
        ).checked = editingPlan.statisticsEnabled;
      }
    } else {
      if (form) form.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingPlan]);

  return (
    <>
      {contextHolder}
      <h4 className="m-2 text-center text-xl font-bold text-amber-950">
        {editingPlan ? "Editar Plan" : "Crear nuevo Plan"}
      </h4>
      <form className="" onSubmit={savePlan} method="POST" ref={formRef}>
        <div className="grid grid-cols-2 gap-2">
          <FormInput id="name" name="name" labelText="Nombre" htmlFor="name" />
          <FormInput
            id="cost"
            name="cost"
            labelText="Costo"
            htmlFor="cost"
            type="number"
          />
          <FormInput
            id="maxUsers"
            name="maxUsers"
            labelText="Max Usuarios"
            htmlFor="maxUsers"
            type="number"
          />
          <FormInput
            id="maxClients"
            name="maxClients"
            labelText="Max Clientes"
            htmlFor="maxClients"
            type="number"
          />
          <FormInput
            id="maxProducts"
            name="maxProducts"
            labelText="Max Productos"
            htmlFor="maxProducts"
            type="number"
          />
          <div className="col-span-2">
            <p className="uppercase text-md font-bold text-amber-950 ">
              Modulos Disponibles
            </p>
            <div className="p-2 bg-slate-100 rounded-md flex flex-col md:flex-row gap-4 md:gap-8 border border-slate-300">
              <FormInput
                ContainerClassName="flex items-center flex-row-reverse justify-end gap-2"
                LabelClassName="text-xs"
                type="checkbox"
                id="posEnabled"
                name="posEnabled"
                labelText="POS"
                labelId="posEnabled"
              />
              <FormInput
                ContainerClassName="flex items-center flex-row-reverse justify-end gap-2"
                LabelClassName="text-xs"
                type="checkbox"
                id="billingEnabled"
                name="billingEnabled"
                labelText="Facturación"
                labelId="billingEnabled"
              />
              <FormInput
                ContainerClassName="flex items-center flex-row-reverse justify-end gap-2"
                LabelClassName="text-xs"
                type="checkbox"
                id="statisticsEnabled"
                name="statisticsEnabled"
                labelText="Estadísticas"
                labelId="statisticsEnabled"
              />
            </div>
          </div>
        </div>
        <FormButton
          type="submit"
          className="text-sm xl:text-sm hover:opacity-90 transition-opacity font-semibold  w-full col-span-2 mt-4 "
        >
          {editingPlan ? "Actualizar Plan" : "Crear Plan"}
        </FormButton>
      </form>
    </>
  );
};
//modules
//  "posEnabled": true,
//   "billingEnabled": true,
//   "statisticsEnabled": true,

export default FormPlan;
