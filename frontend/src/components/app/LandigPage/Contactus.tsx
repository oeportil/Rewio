import FormButton from "@/components/shared/forms/FormButton";
import FormInput from "@/components/shared/forms/FormInput";
import { FormTextArea } from "@/components/shared/forms/FormTextArea";
import { CiPaperplane } from "react-icons/ci";

const Contactus = () => {
  return (
    <section
      id="contacto"
      className="w-full min-h-screen flex items-center justify-center px-4 md:px-8 py-16 bg-linear-to-br from-indigo-50 to-white"
    >
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/*Esto es el form */}
        <div className="w-full">
          <h3 className="text-3xl md:text-4xl font-extrabold text-sky-700 leading-tight mb-6">
            Ponte en contacto con nosotros{" "}
            <span className="text-sky-400 block">
              por medio del siguiente formulario
            </span>
          </h3>

          <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  labelText="Nombre completo"
                  htmlFor="name"
                  id="name"
                  placeholder="Escribe tu nombre"
                  type="text"
                />

                <FormInput
                  labelText="Email"
                  htmlFor="email"
                  id="email"
                  placeholder="correo@correo.com"
                  type="email"
                />

                <FormInput
                  labelText="Nombre de la Clinica"
                  htmlFor="gymName"
                  id="gymName"
                  placeholder="Nombre de tu Clinica"
                  type="text"
                />
              </div>

              <FormTextArea
                placeholder="Escribe tu mensaje..."
                className="px-2"
                name="mensaje"
              />

              <div className="w-full flex justify-center pt-4">
                <FormButton
                  type="submit"
                  // className="font-bold flex gap-2 items-center w-full md:w-1/2 justify-center"
                  woback={false}
                >
                  Enviar mi información <CiPaperplane size={20} />
                </FormButton>
              </div>
            </form>
          </div>
        </div>

        {/*La wea del paralaxx... si... gpt lo hizo */}
        <div
          className={`
            relative w-full h-64 md:h-96 lg:h-130 rounded-2xl overflow-hidden shadow-xl
            bg-[url(/contactus.png)]
            bg-cover bg-end bg-no-repeat 
            lg:bg-fixed
          `}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-sky-900/15 backdrop-blur-[1px]" />

          {/* Texto opcional encima */}
          <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
            <h4 className="text-2xl font-bold">
              Lleva tu clinica al siguiente nivel
            </h4>
            <p className="text-sm opacity-90 mt-1">
              Escríbenos y nos pondremos en contacto contigo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
