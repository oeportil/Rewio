import { motion } from "framer-motion";
import useDoctor from "@/hooks/Module/useDoctor";
import { useEffect } from "react";
import { useParams } from "react-router";
import FormButton from "@/components/shared/forms/FormButton";
import Configuration from "@/components/app/DoctorView/Configuration";

const DoctorView = () => {
  const { doctorId, clinicId } = useParams();

  const { doctor, contextHolder, getDoctorByClinicAndId, form, setForm } =
    useDoctor({
      fetchData: false,
      clinicId: clinicId ? +clinicId : 0,
    });

  useEffect(() => {
    if (doctorId && clinicId) {
      getDoctorByClinicAndId(+doctorId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId, clinicId]);

  //para mientras hace fetch del doctor
  if (!doctor) return <div className="p-10">Cargando...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen space-y-10">
      {contextHolder}

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {doctor.user.name}
          </h1>
          <p className="text-sm text-slate-500">{doctor.user.email}</p>
        </div>

        <span
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ backgroundColor: form.color }}
        >
          {form.specialty}
        </span>
      </motion.div>

      {/* CONFIGURACIÓN */}
      <Configuration form={form} setForm={setForm} />

      {/* HORARIOS */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-6">🕒 Horarios Semanales</h2>

        <div className="space-y-4">
          {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => (
            <div
              key={day}
              className="flex justify-between items-center p-4 bg-slate-50 rounded-xl"
            >
              <span className="font-semibold">{day}</span>
              <div className="flex gap-4">
                <span>08:00 - 17:00</span>
                <FormButton
                  type="button"
                  className="text-sky-600 text-sm font-semibold hover:underline"
                >
                  Editar
                </FormButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOQUEOS / VACACIONES */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-6">🚫 Bloqueos y Vacaciones</h2>

        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition cursor-pointer">
          + Agregar
        </button>

        <div className="mt-4 space-y-3">
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            20 Feb 2026 - Vacaciones
          </div>
        </div>
      </div>

      {/* AGENDA */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-6">📅 Agenda del Doctor</h2>

        <div className="space-y-3">
          <div className="p-4 bg-slate-50 rounded-xl hover:bg-sky-50 transition">
            <p className="font-semibold">10:00 AM - María López</p>
            <p className="text-sm text-slate-500">Consulta General</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorView;
