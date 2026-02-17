import Dialog from "@/components/shared/Dialog";
import FormButton from "@/components/shared/forms/FormButton";
import FormFileInput from "@/components/shared/forms/FormFileInput";
import FormInput from "@/components/shared/forms/FormInput";
import FormSelect from "@/components/shared/forms/FormSelect";
import useUser from "@/hooks/Module/useUser";
import useModal from "@/store/useModal";
import type { IClinic } from "@/types/index";
import { useEffect, type FormEvent } from "react";
import { FaPlus } from "react-icons/fa";
import { FaHouseMedical } from "react-icons/fa6";

const ClinicModal = ({
  setImageBase64,
  saveFunc,
  editingClinic,
  setEditingClinic,
}: {
  saveFunc: (e: FormEvent<HTMLFormElement>) => void;
  setImageBase64: (v: string) => void;
  editingClinic: IClinic | null;
  setEditingClinic: (v: IClinic | null) => void;
}) => {
  const { close } = useModal();
  const { values: owners, handlePagination } = useUser({
    fetchData: true,
    type: "all",
  });

  useEffect(() => {
    handlePagination({ page: 1, limit: 100, search: "" });
    const clear = (id: string) => {
      const el = document.getElementById(id) as HTMLInputElement;
      if (el) el.value = "";
    };

    if (!editingClinic) {
      clear("name");
      clear("email");
      clear("phone");
      clear("address");
      clear("ownerId");
      setImageBase64(""); // limpiar imagen
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setValue = (id: string, value: any) => {
      const el = document.getElementById(id) as HTMLInputElement;
      if (el) el.value = value ?? "";
    };

    setValue("name", editingClinic.name);
    setValue("email", editingClinic.email);
    setValue("phone", editingClinic.phone);
    setValue("address", editingClinic.address);
    setValue("ownerId", editingClinic.ownerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingClinic]);
  return (
    <Dialog
      id="clinic"
      buttonContent={
        <>
          <FaPlus /> Agregar Clinica
        </>
      }
      cleanFunc={setEditingClinic}
    >
      <div>
        <h3 className="flex items-center gap-1 text-lg text-sky-600">
          <FaHouseMedical size={20} />
          <span className="mt-0.5 font-semibold">
            {editingClinic ? "Editar Clínica" : "Crear Clínica Dental"}
          </span>
        </h3>
        <form
          action=""
          onSubmit={saveFunc}
          className="grid md:grid-cols-2 gap-1 m-2"
        >
          <FormInput
            id="name"
            labelText="Nombre"
            type="text"
            name="name"
            htmlFor="name"
          />
          <FormInput
            id="email"
            labelText="Correo Electronico"
            type="email"
            name="email"
            htmlFor="email"
          />
          <FormInput
            id="phone"
            labelText="Telefono"
            type="tel"
            name="phone"
            htmlFor="phone"
          />
          <FormInput
            id="address"
            labelText="Dirección"
            type="text"
            name="address"
            htmlFor="address"
            ContainerClassName="col-span-2"
          />
          {!editingClinic && (
            <div className="w-full col-span-2">
              <label
                htmlFor="ownerId"
                className=" text-sm font-bold text-sky-950"
              >
                Propietari@
              </label>
              <FormSelect
                options={owners.map((o) => ({
                  id: o.id,
                  label: o.name,
                  value: `${o.id}`,
                }))}
                id="ownerId"
                className="w-full"
                name="ownerId"
              />
            </div>
          )}
          <div className="w-full col-span-2">
            <label className=" text-sm font-bold text-sky-950">Logo</label>
            <FormFileInput
              name="logo"
              id="logo"
              defaultImage={editingClinic?.logo}
              onBase64={(base64) => setImageBase64(base64)}
            />
          </div>
          <div className="flex gap-2 justify-end col-span-2 mt-4">
            <FormButton
              type="button"
              click={() => close("clinic")}
              className="text-white bg-red-600 hover:bg-red-800"
            >
              Cancelar
            </FormButton>
            <FormButton type="submit">
              {" "}
              {editingClinic ? "Guardar cambios" : "Confirmar"}
            </FormButton>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default ClinicModal;
