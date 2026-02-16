import { motion } from "framer-motion";
import { useState } from "react";
import type { IClinic } from "@/types/index";

interface Props {
  clinic: IClinic | null;
  getClinicBySlug: (slug: string) => void;
}

const Patient = ({ clinic }: Props) => {
  const [appointments] = useState([
    {
      id: 1,
      doctor: "Dr. Juan Pérez",
      date: "2026-02-15",
      time: "10:30 AM",
      status: "Confirmada",
    },
    {
      id: 2,
      doctor: "Dra. Laura Méndez",
      date: "2026-01-10",
      time: "3:00 PM",
      status: "Completada",
    },
  ]);

  if (!clinic) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-500">Cargando clínica...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      {/* Header Clínica */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between 
        bg-white p-6 rounded-2xl shadow-md mb-10"
      >
        <div className="flex items-center gap-4">
          <img
            src={clinic.logo}
            alt={clinic.name}
            className="w-16 h-16 rounded-xl shadow-md object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{clinic.name}</h1>
            <p className="text-sm text-slate-500">{clinic.address}</p>
          </div>
        </div>

        <button
          className="mt-4 md:mt-0 bg-sky-600 text-white px-6 py-3 rounded-xl 
          font-semibold hover:bg-sky-800 transition-all duration-300 shadow-md"
        >
          + Agendar Nueva Cita
        </button>
      </motion.div>

      {/* Historial de Citas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white p-6 rounded-2xl shadow-md"
      >
        <h2 className="text-lg font-bold text-slate-900 mb-6">📅 Mis Citas</h2>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between 
              p-4 rounded-xl bg-slate-50 hover:bg-sky-50 transition-all duration-300"
            >
              <div>
                <p className="font-semibold text-slate-800">
                  {appointment.doctor}
                </p>
                <p className="text-sm text-slate-500">
                  {appointment.date} - {appointment.time}
                </p>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-md mt-1 inline-block
                  ${
                    appointment.status === "Confirmada"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {appointment.status}
                </span>
              </div>

              {appointment.status === "Confirmada" && (
                <button
                  className="mt-3 md:mt-0 text-sky-600 font-semibold 
                  hover:underline transition"
                >
                  Reprogramar
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Patient;
