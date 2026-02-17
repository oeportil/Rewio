import Dialog from "@/components/shared/Dialog";
import FormInput from "@/components/shared/forms/FormInput";
import useDoctor from "@/hooks/Module/useDoctor";
import { debounce } from "@/utils/index";
import { Select } from "antd";
import { useEffect, useMemo } from "react";
import { FaPlus } from "react-icons/fa";

const DoctorModal = () => {
  //values para mapear los usuarios con rol doctores en un select
  const { values, handlePagination, saveDoctor } = useDoctor({
    fetchData: true,
    type: "all",
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

  return (
    <Dialog
      id="doctorModal"
      buttonContent={
        <>
          <FaPlus /> Agregar Doctor
        </>
      }
    >
      <form action="" onSubmit={saveDoctor}>
        <FormInput
          labelText="Especialidad"
          name="specialty"
          htmlFor="specialty"
          id="specialty"
        />
        <Select
          showSearch={{
            optionFilterProp: "label",
            onSearch: (value) => debouncedSearch(value),
          }}
          placeholder="Select a person"
          options={values.map((d) => ({
            id: d.id,
            label: d.name,
            value: `${d.id}`,
          }))}
        />
        <FormInput
          labelText="Especialidad"
          name="specialty"
          htmlFor="specialty"
          id="specialty"
        />
      </form>
    </Dialog>
  );
};

export default DoctorModal;
