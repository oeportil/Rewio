import { WiAlien } from "react-icons/wi";
import ServicesCard from "./ServicesCard";

const Services = () => {
  //los circulos decorativos
  const designs = (colors: string = "bg-amber-400") => (
    <div
      data-aos="fade-right"
      className={`w-6 h-6 rounded-full ${colors} animate-bounce animate-infinite 
        animate-ease-linear animate-fill-both animate-duration-2000`}
    />
  );

  return (
    <section
      id="services"
      className="flex relative flex-col justify-between items-center my-2 "
    >
      {/* texto inicial */}
      <div className="my-16">
        <div className="flex items-center justify-center gap-4 bg-slate my-10">
          <h3
            data-aos="fade-right"
            className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl 
      font-black text-slate-800 text-center"
          >
            Servicios{" "}
            <span
              className="font-extrabold bg-clip-text text-transparent bg-linear-to-r
         from-sky-700 via-sky-400 to-sky-300 inline-block"
            >
              Disponibles para ti
            </span>{" "}
          </h3>
          {designs("bg-sky-200")}
        </div>
        <p
          data-aos="fade-right"
          className="text-center text-slate-500 text-xl font-semibold"
        >
          Tenemos todo lo que necesitas para el correcto funcionamiento de tu
          negocio.
        </p>
      </div>

      {/* Inicio de cards */}
      <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 max-w-6xl w-10/12 gap-12 space-y-4 ">
        {[...Array(8)].map((_, i) => (
          <ServicesCard
            key={i}
            title="exemplo"
            description="Create a professional landing page. "
            icon={<WiAlien size={60} className="text-gray-100" />}
          />
        ))}
      </div>
      <div className="bg-[url(./background.png)] bg-cover bg-center bg-no-repeat absolute  w-full h-full opacity-10" />
    </section>
  );
};

export default Services;
