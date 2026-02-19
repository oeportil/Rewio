import Dialog from "@/components/shared/Dialog";
import FormButton from "@/components/shared/forms/FormButton";
import FormGroup from "@/components/shared/forms/FormGroup";
import FormInput from "@/components/shared/forms/FormInput";
import useDoctor from "@/hooks/Module/useDoctor";
import type { IUser } from "@/types/index";
import { debounce } from "@/utils/index";
import { Select } from "antd";
import { useEffect, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";

const DoctorModal = ({ clinicId }: { clinicId: number }) => {
  //values para mapear los usuarios con rol doctores en un select
  const { values, handlePagination, saveDoctor, contextHolder, setUserId } =
    useDoctor({
      fetchData: true,
      type: "all",
      clinicId,
    });
  useEffect(() => {
    handlePagination({ page: 1, limit: 100, search: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useMemo(() => {
    return debounce((value: string) => {
      handlePagination({ page: 1, limit: 100, search: value });
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [color, setColor] = useState<string>("");
  return (
    <Dialog
      id="doctorModal"
      buttonContent={
        <>
          <FaPlus /> Agregar Doctor
        </>
      }
    >
      {contextHolder}
      <form onSubmit={saveDoctor} className="">
        <h2 className="text-2xl font-bold text-sky-900 mb-6 flex items-center gap-2">
          <FaPlus className="text-sky-600" />
          Crear nuevo doctor
        </h2>
        {/* Usuario */}
        <FormGroup className="mb-2 flex flex-col gap-2">
          <label htmlFor="userId" className="text-sm font-medium text-sky-900">
            Usuario a asignar
          </label>

          <div className="relative">
            <Select
              id="userId"
              showSearch={{
                optionFilterProp: "label",
                onSearch: (value) => debouncedSearch(value),
              }}
              placeholder="Selecciona una persona"
              className="w-full"
              onChange={(v) => setUserId(+v)}
              options={values.map((d) => {
                const user = d as IUser;
                return {
                  id: user.id,
                  label: `${user.name} - ${user.dui}`,
                  value: `${user.id}`,
                };
              })}
            />
          </div>
        </FormGroup>

        {/* Especialidad */}
        <div className="mb-2">
          <FormInput
            labelText="Especialidad"
            name="specialty"
            htmlFor="specialty"
            id="specialty"
          />
        </div>

        <div className="grid grid-cols-2 items-end ">
          <FormInput
            type="color"
            name="color"
            htmlFor="color"
            id="color"
            labelText="Color de Doctor"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />

          <div className="flex items-center gap-3 ">
            <span
              className="px-3 py-1 rounded-lg text-white text-sm"
              style={{ backgroundColor: color }}
            >
              Vista previa
            </span>
          </div>
        </div>

        {/* Botón */}
        <div className="mt-8 flex justify-end">
          <FormButton
            type="submit"
            woback={false}
            className="p-2 rounded-lg bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
          >
            <FaPlus />
            Crear Doctor
          </FormButton>
        </div>
      </form>
    </Dialog>
  );
};

export default DoctorModal;
