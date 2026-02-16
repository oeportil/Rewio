import type { IClinic } from "@/types/index";
import { motion } from "framer-motion";
import { useState } from "react";
import CRUDServices from "./service/CRUDServices";

interface Props {
  clinic: IClinic | null;
  getClinicBySlug: (slug: string) => void;
}

const Owner = ({ clinic }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-4 "
      >
        <div className="flex items-center gap-4">
          <img
            src={clinic?.logo}
            alt={clinic?.name}
            className="w-16 h-16 rounded-xl shadow-md object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {clinic?.name}
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-sky-600 text-white px-5 py-2 rounded-lg 
          font-semibold hover:bg-sky-800 transition-all duration-300 cursor-pointer"
        >
          {isEditing ? "Guardar Cambios" : "Editar Información"}
        </button>
      </motion.div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Dirección", value: clinic?.address },
          { label: "Email", value: clinic?.email },
          { label: "Teléfono", value: clinic?.phone },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            {isEditing ? (
              <input
                defaultValue={item.value}
                className="mt-2 w-full border rounded-md px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            ) : (
              <p className="mt-2 font-semibold text-slate-800">{item.value}</p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Doctors + Appointments */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Doctors Section */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-lg font-bold mb-4 text-slate-900">👨‍⚕️ Doctores</h2>

          <div className="space-y-3">
            {/* Esto luego lo mapeas dinámico */}
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-sky-50 transition">
              <span>Dr. Juan Pérez</span>
              <button className="text-sky-600 text-sm font-semibold">
                Ver Perfil
              </button>
            </div>
          </div>
        </motion.div>

        {/* Appointments Section */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-lg font-bold mb-4 text-slate-900">
            📅 Citas de Hoy
          </h2>

          <div className="space-y-3">
            {/* Esto luego lo mapeas dinámico */}
            <div className="p-3 bg-slate-50 rounded-lg hover:bg-sky-50 transition">
              <p className="font-semibold">Paciente: María López</p>
              <p className="text-sm text-slate-500">10:30 AM - Dr. Pérez</p>
            </div>
          </div>
        </motion.div>
      </div>
      {clinic && clinic.id && <CRUDServices clinicId={clinic?.id ?? 0} />}
    </div>
  );
};

export default Owner;
