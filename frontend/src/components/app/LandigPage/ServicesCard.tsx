type TServiceCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const ServicesCard = ({ title, description, icon }: TServiceCard) => {
  return (
    <div
      data-aos="fade-up"
      className="
        relative p-px rounded-2xl 
        bg-linear-to-br from-sky-400/40 via-transparent to-indigo-500/40
        group transition-all duration-500
        hover:scale-[1.03]
      "
    >
      {/* Card real */}
      <div
        className="
          bg-white/80 backdrop-blur-xl
          rounded-2xl p-8 h-full
          shadow-lg
          transition-all duration-500
          group-hover:shadow-2xl
          group-hover:bg-white
        "
      >
        {/* Icon */}
        <div
          className="
            w-14 h-14 flex items-center justify-center
            rounded-xl
            bg-linear-to-br from-sky-500 to-indigo-600
            text-white text-2xl
            shadow-md
            transition-all duration-500
            group-hover:scale-110
            group-hover:rotate-6
          "
        >
          <p className="text-white">{icon}</p>
        </div>

        {/* Title */}
        <h3
          className="
            mt-6 text-xl font-bold text-slate-900
            transition-all duration-500
            group-hover:text-sky-600
          "
        >
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        {/* Call to action mini */}
        <div
          className="
            mt-6 flex items-center text-sky-600 font-semibold text-sm
            opacity-0 translate-y-2
            transition-all duration-500
            group-hover:opacity-100 group-hover:translate-y-0
          "
        >
          Descubrir más →
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
