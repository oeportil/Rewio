import { motion } from "framer-motion";
import useDoctor from "@/hooks/Module/useDoctor";
import { useEffect } from "react";
import { useParams } from "react-router";
import Configuration from "@/components/app/DoctorView/Configuration";
import BlocksAndVacations from "@/components/app/DoctorView/BlocksAndVacations";
import DoctorSchedules from "@/components/app/DoctorView/DoctorSchedules";
import DoctorDangerZone from "@/components/app/DoctorView/DoctorDangerZone";

const DoctorView = () => {
  const { doctorId, clinicId } = useParams();

  const {
    doctor,
    contextHolder,
    getDoctorByClinicAndId,
    form,
    setForm,
    updateDoctor,
    deleteDoctor,
  } = useDoctor({
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
        className="bg-white p-6 rounded-2xl shadow-md flex md:flex-row flex-col items-start justify-between md:items-center"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {doctor.user.name}
          </h1>
          <p className="text-sm text-slate-500">{doctor.user.email}</p>
          <p className="text-sm text-slate-500">{doctor.user.dui}</p>
        </div>

        <span
          className="px-4 py-2 rounded-lg text-white text-sm font-semibold"
          style={{ backgroundColor: form.color }}
        >
          {form.specialty}
        </span>
      </motion.div>

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
      {/* HORARIOS */}
      <DoctorSchedules idDoctor={doctor.id} />
      {/* BLOQUEOS / VACACIONES */}
      <BlocksAndVacations idDoctor={doctor.id} />

      {/* CONFIGURACIÓN */}
      <Configuration
        form={form}
        setForm={setForm}
        id={doctor.id}
        updateDoctor={updateDoctor}
      />

      {/* ELIMINAR EL DOCTOR EN DANGER ZONE */}
      <DoctorDangerZone doctor={doctor} removeDoctor={deleteDoctor} />
    </div>
  );
};

export default DoctorView;
