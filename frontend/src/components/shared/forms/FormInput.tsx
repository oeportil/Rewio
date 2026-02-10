import type { HTMLInputTypeAttribute } from "react";

type FormInputProps = {
  //para el div contenedor del label y el input
  ContainerClassName?: string;
  //para el label
  LabelClassName?: string;
  labelText?: string;
  labelId?: string;
  htmlFor?: string;
  //para el input
  onclick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  name?: string;
  InputClassName?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  id?: string;
  accept?: string;
};

export default function FormInput({
  ContainerClassName,
  LabelClassName,
  labelText,
  labelId,
  htmlFor,
  autoComplete,
  onclick,
  disabled,
  placeholder,
  value,
  onChange,
  required,
  minLength,
  maxLength,
  pattern,
  type,
  name,
  InputClassName,
  id,
  accept,
}: FormInputProps) {
  return (
    <div
      className={`${ContainerClassName} max-md:col-span-2 flex flex-col my-1 w-full`}
    >
      <label
        htmlFor={htmlFor}
        id={labelId}
        className={`${LabelClassName} text-sm font-bold text-sky-950`}
      >
        {labelText}
      </label>
      <input
        id={id}
        onClick={onclick}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        className={`${InputClassName} border border-gray-300 rounded-sm p-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500  focus:border-transparent`}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        accept={accept}
      />
    </div>
  );
}
