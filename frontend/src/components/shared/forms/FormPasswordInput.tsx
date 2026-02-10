//Esta clase contiene los estilos comunes para los inputs
import { usePasswordToggle } from "@/hooks/logic/usePasswordToggle";
import { FiEye, FiEyeOff } from "react-icons/fi";

type FormPasswordInputProps = {
  labelText: string;
  error?: string;
  id?: string;
  placeholder?: string;
  name?: string;
  InputClassName?: string;
};

export default function FormPasswordInput({
  labelText,
  id,
  placeholder,
  InputClassName,
  ...props
}: FormPasswordInputProps) {
  //Uso del custom hook para manejar el toggle del password
  const { showPassword, toggleShowPassword } = usePasswordToggle();

  return (
    <div>
      <label
        htmlFor={id || "passwordInput"}
        className=" text-sm font-bold text-sky-950"
      >
        {labelText}
      </label>

      <div className="relative focus:ring-1 focus:ring-sky-500 group border border-gray-300 rounded-sm">
        <input
          id={id || "passwordInput"}
          type={showPassword ? "text" : "password"}
          className={`  text-sm focus:outline-none  focus:border-transparent ${InputClassName}`}
          placeholder={showPassword ? placeholder : "**********"}
          {...props}
        />
        {/*Icono para mostrar u ocultar el password */}
        <button
          type="button"
          onClick={() => toggleShowPassword()}
          className="absolute  right-3 cursor-pointer text-2xl text-gray-400 hover:scale-105 transition"
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </div>
  );
}
