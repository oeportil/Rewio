const Aboutus = () => {
  return (
    <section className="mt-10 relative " id="aboutus">
      <div className="absolute bg-[url(./aboutBack.png)] w-full h-full bg-cover bg-center " />
      <div className="absolute bg-slate-950/70 w-full h-full" />
      <div className="flex md:flex-row flex-col-reverse items-center justify-center mx-auto max-w-6xl py-32">
        <div data-aos="fade-down">
          <h3
            className="md:text-5xl sm:text-xl text-lg 
              font-black
            bg-linear-to-r from-sky-800 via-sky-400
              to-sky-50 text-transparent bg-clip-text animate-gradient
               bg-300% animate-gradient"
            data-aos="fade-up"
          >
            {" "}
            Sobre Nosotros
          </h3>
          <p className="py-2 text-white font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            aliquam dolorum inventore libero consequuntur doloribus. Expedita
            fugit ipsa voluptatum explicabo quam illum nihil nulla dolore, ipsam
            neque, debitis maxime placeat.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
