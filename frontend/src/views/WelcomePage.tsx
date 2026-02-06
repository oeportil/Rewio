import Logo from "@/components/shared/Logo";

const WelcomePage = () => {
  return (
    <div className="text-center mx-auto flex flex-col items-center justify-center h-full">
      <Logo size="6xl" />

      <div className="mt-2">
        <p className="text-md text-slate-600 font-semibold max-w-4xl mx-auto italic">
          Bienvenido a tu plataforma integral de gestión para gimnasios,
          diseñada para simplificar, automatizar y hacer crecer tu negocio
          mediante herramientas inteligentes, reportes en tiempo real y control
          total desde cualquier lugar.
        </p>
      </div>
    </div>
  );
};
export default WelcomePage;
