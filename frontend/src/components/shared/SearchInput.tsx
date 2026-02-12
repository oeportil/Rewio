import { useEffect, useState } from "react";
import FormInput from "./forms/FormInput";
import type { Tpagination } from "@/types/index";

const SearchInput = ({
  handlePagination,
  pag,
  className,
}: {
  handlePagination: (values: Tpagination) => void;
  pag: Tpagination;
  className?: string;
}) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    handlePagination({ ...pag, search: value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <FormInput
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Buscar Clinica"
      InputClassName={className}
    />
  );
};

export default SearchInput;
