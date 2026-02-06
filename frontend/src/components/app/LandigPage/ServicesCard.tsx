type TServiceCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const ServicesCard = ({ title, description, icon }: TServiceCard) => {
  return (
    <div
      data-aos="fade-right"
      className="bg-white p-8 rounded-lg shadow-md border-sky-400 hover:border
     hover:bg-sky-50 transition-all duration-300 ease-in-out group z-10 "
    >
      <div
        className=" w-fit rounded-md 
      "
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 group-hover:text-sky-700 transition-all duration-500 ease-in-out">
        {title}
      </h3>
      <p className="text-sm leading-normal text-slate-500 ">{description}</p>
    </div>
  );
};

export default ServicesCard;
