type Props = {
  className?: string;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  click?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  woback?: boolean;
};

const FormButton = ({
  className,
  children,
  click,
  woback = true,
  type,
}: Props) => {
  return (
    <button
      type={type}
      className={` ${
        !className
          ? woback
            ? "bg-white text-sky-500 border border-sky-500 hover:bg-sky-100"
            : "bg-sky-500 text-white   hover:bg-sky-700"
          : className
      } p-1 px-2 rounded-sm 
       transition ease-in-out duration-300 
        cursor-pointer text-center flex justify-center items-center gap-1 `}
      onClick={click}
    >
      {children}
    </button>
  );
};

export default FormButton;
