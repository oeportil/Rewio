export default function HeroSection() {
  return (
    <header className=" relative flex flex-col items-center justify-evenly gap-10 px-6 py-16 ">
      {/*Esto es lo del texto (obviamente) */}
      <div
        data-aos="fade-right"
        data-aos-delay="200"
        className="w-full xl:w-2/3 text-center  overflow-hidden"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-sky-600 leading-tight">
          Bienvenido a{" "}
          <span className="text-sky-900">
            tu sistema de agendamiento de citas
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Achieve your goals with us. Join today and transform your business!
        </p>

        <button className="mt-8 px-8 py-3 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer">
          Conoce más
        </button>
      </div>
    </header>
  );
}
