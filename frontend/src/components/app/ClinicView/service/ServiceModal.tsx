import { useEffect, useState } from "react";
import Dialog from "@/components/shared/Dialog";
import type { IService } from "@/types/index";
import FormInput from "@/components/shared/forms/FormInput";

interface Props {
  initialData?: IService | null;
  saveService: (
    data: Omit<IService, "createdAt" | "updatedAt" | "clinicId" | "active">,
  ) => void;
  setClear: (v: null) => void;
}
const val = {
  id: 0,
  name: "",
  duration: 30,
  price: 0,
  color: "#0ea5e9",
};

const ServiceModal = ({ initialData, saveService, setClear }: Props) => {
  const isEditing = !!initialData;

  const [form, setForm] = useState(val);

  useEffect(() => {
    if (initialData)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        id: initialData.id,
        name: initialData.name,
        duration: initialData.duration,
        price: initialData.price,
        color: initialData.color || "#0ea5e9",
      });
    else setForm(val);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const handleSubmit = () => {
    saveService(form);
  };

  return (
    <Dialog
      id="modalService"
      buttonContent={isEditing ? "Editar Servicio" : "Crear Servicio"}
      buttonStyles="bg-sky-600 text-white px-5 py-2 rounded-lg 
      font-semibold hover:bg-sky-800 transition-all duration-300 cursor-pointer"
      cleanFunc={() => {
        setClear(null);
        setForm(val);
      }}
    >
      <div className="space-y-5 w-full min-w-75">
        <h2 className="text-xl font-bold text-slate-900">
          {isEditing ? "Editar Servicio" : "Nuevo Servicio"}
        </h2>

        {/* Nombre */}
        <FormInput
          type="text"
          name="name"
          htmlFor="name"
          id="name"
          labelText="Nombre"
          value={form.name}
          onChange={handleChange}
        />

        {/* Duración */}
        <FormInput
          type="number"
          name="duration"
          htmlFor="duration"
          id="duration"
          labelText="Duración (minutos)"
          value={`${form.duration}`}
          onChange={handleChange}
        />

        {/* Precio */}
        <FormInput
          type="number"
          name="price"
          htmlFor="price"
          id="price"
          labelText="Precio"
          value={`${form.price}`}
          onChange={handleChange}
        />

        {/* Color */}
        <div className="grid grid-cols-2 items-end ">
          <FormInput
            type="color"
            name="color"
            htmlFor="color"
            id="color"
            labelText="Color del servicio"
            value={form.color}
            onChange={handleChange}
          />

          <div className="flex items-center gap-3 ">
            <span
              className="px-3 py-1 rounded-lg text-white text-sm"
              style={{ backgroundColor: form.color }}
            >
              Vista previa
            </span>
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSubmit}
            className="bg-sky-600 text-white px-5 py-2 rounded-lg 
            font-semibold hover:bg-sky-800 transition-all duration-300 cursor-pointer"
          >
            {isEditing ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ServiceModal;
