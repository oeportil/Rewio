type Props = {
  options: { id: number; value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
};

const FormSelect = ({
  options,
  value,
  onChange,
  name,
  className,
  disabled,
  id,
}: Props) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      name={name}
      className={`${className} border border-gray-300 rounded-sm 
        py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500 
        focus:border-transparent w-full`}
      disabled={disabled}
      defaultValue={""}
    >
      <option value="" disabled>
        {" "}
        Seleccionar una opcion
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
