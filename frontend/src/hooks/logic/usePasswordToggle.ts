import { useState } from "react";

export const usePasswordToggle = () => {
  //state para mostrar o ocultar el password
  const [showPassword, setShowPassword] = useState(false);

  //Función para mostrar u ocultar el password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return { showPassword, toggleShowPassword };
};
