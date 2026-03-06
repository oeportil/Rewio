import { motion } from "framer-motion";
import useDoctor from "@/hooks/Module/useDoctor";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Configuration from "@/components/app/DoctorView/Configuration";
import BlocksAndVacations from "@/components/app/DoctorView/BlocksAndVacations";
import DoctorSchedules from "@/components/app/DoctorView/DoctorSchedules";
import DoctorDangerZone from "@/components/app/DoctorView/DoctorDangerZone";
import { IoReturnDownBack } from "react-icons/io5";
import { useAppointment } from "@/hooks/Module/useAppointment";
import type { IClinicAppointment } from "../types";
import Appointments from "@/components/app/ClinicView/doctor/Appointments";

const DoctorView = () => {
  const { doctorId, clinicId } = useParams();
  const navigate = useNavigate();
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

  const { values, pag, handlePagination, confirmAppointment, doneAppointment } =
    useAppointment({
      type: "doctor",
      id: clinicId ? +clinicId : 0,
      doctorId: doctorId ? +doctorId : undefined,
      now: false,
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
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-sky-600 hover:text-sky-800 
          transition cursor-pointer"
        >
          <IoReturnDownBack size={18} />
          Volver
        </button>
      </div>
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
        {values && values.length === 0 ? (
          <p className="text-sm text-slate-500">No hay citas programadas.</p>
        ) : (
          Appointments(
            values as IClinicAppointment[],
            false,
            pag,
            handlePagination,
            confirmAppointment,
            doneAppointment,
            true,
          )
        )}
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
