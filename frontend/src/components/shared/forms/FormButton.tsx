type Props = {
  className?: string;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  click?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  woback?: boolean;
};

const FormButton = ({ className, children, click, woback = true }: Props) => {
  return (
    <button
      className={`${className} ${woback ? "bg-white text-sky-500 border border-sky-500 hover:bg-sky-100" : "bg-sky-500 text-white   hover:bg-sky-700"} py-2 px-3 rounded-sm 
       transition ease-in-out duration-300 
        cursor-pointer  text-md xl:text-lg text-center flex justify-center items-center gap-3`}
      onClick={click}
    >
      {children}
    </button>
  );
};

export default FormButton;
