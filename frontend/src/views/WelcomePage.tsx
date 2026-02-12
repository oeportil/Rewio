import Logo from "@/components/shared/Logo";

const WelcomePage = () => {
  return (
    <div className="text-center mx-auto flex flex-col items-center justify-center h-full">
      <div className="">
        <Logo className="w-64" />
      </div>

      <div className="mt-2">
        <p className="text-md text-slate-600 font-semibold max-w-4xl mx-auto italic">
          Bienvenido de nuevo
        </p>
      </div>
    </div>
  );
};
export default WelcomePage;
