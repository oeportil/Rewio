import type { IClinic, IClinicAppointment } from "@/types/index";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useClinic from "@/hooks/Module/useClinic";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { Tooltip } from "antd";
import { useAppointment } from "@/hooks/Module/useAppointment";
import Appointments from "./doctor/Appointments";
import Imagent from "@/assets/imagent.jpg";
import useDoctor from "@/hooks/Module/useDoctor";
import { useUserStore } from "@/store/useUserStore";
import DoctorSchedules from "../DoctorView/DoctorSchedules";
import BlocksAndVacations from "../DoctorView/BlocksAndVacations";

interface Props {
  clinic: IClinic | null;
}

const Doctor = ({ clinic }: Props) => {
  const { saveClinic, setEditingClinic, contextHolder } = useClinic({
    fetchData: false,
    own: true,
  });
  const user = useUserStore((state) => state.user);
  // Para manejar las citas del doctor
  const {
    values,
    getAppointments,
    pag,
    handlePagination,
    confirmAppointment,
    doneAppointment,
  } = useAppointment({
    type: "doctor",
    id: clinic?.id,
  });

  const { doctor, getDoctorByClinicAndId } = useDoctor({
    fetchData: false,
    clinicId: clinic?.id,
    type: "all",
  });

  const {
    getAppointments: getAppointmentsHistory,
    values: historyValues,
    pag: pagHistory,
    handlePagination: handlePaginationHistory,
    confirmAppointment: confAppHist,
    contextHolder: contextHolderHistory,
    doneAppointment: doneAppHist,
  } = useAppointment({
    type: "doctor",
    id: clinic?.id,
    now: false,
  });

  useEffect(() => {
    setEditingClinic(clinic);
    getDoctorByClinicAndId(user?.id || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinic]);

  return (
    <div className="p-2 bg-slate-50 min-h-screen">
      {contextHolder}
      {contextHolderHistory}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:flex justify-between items-center mb-4 w-full"
      >
        <div className="flex items-center gap-4 w-full">
          <img
            src={clinic?.logo ? clinic?.logo : Imagent}
            alt={clinic?.name}
            className="w-16 h-16 rounded-xl shadow-md object-cover"
          />
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-bold text-slate-900">
              {clinic?.name}
            </h1>
            <div className="flex items-center flex-row-reverse gap-1">
              <p className="text-xs text-gray-500">Color Asignado</p>
              <div
                className="h-4 w-4 rounded-full"
                style={{
                  backgroundColor:
                    doctor && doctor.color ? doctor.color : "transparent",
                }}
              ></div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Info Cards */}
      <form
        onSubmit={saveClinic}
        className="md:grid md:grid-cols-3 gap-6 mb-10 space-y-2 md:space-y-0"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 * 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300"
        >
          <p className="mt-2 font-semibold text-slate-800">{clinic?.address}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 * 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300"
        >
          <p className="mt-2 font-semibold text-slate-800">{clinic?.email}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 * 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300"
        >
          <p className="mt-2 font-semibold text-slate-800">{clinic?.phone}</p>
        </motion.div>
      </form>
      {/* Doctors + Appointments */}
      <div className="grid">
        {/* Appointments Section (colocarlo en un componente aparte) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <div className="flex justify-between items-center ">
            <h2 className="text-lg font-bold mb-4 text-slate-900">
              📅 Citas de Hoy
            </h2>
            <Tooltip title="Recargar citas">
              <button
                className="cursor-pointer"
                onClick={() => getAppointments()}
              >
                <FaArrowRotateLeft />
              </button>
            </Tooltip>
          </div>
          {Appointments(
            values as IClinicAppointment[],
            true,
            pag,
            handlePagination,
            confirmAppointment,
            doneAppointment,
            true,
          )}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-6 rounded-2xl shadow-md mt-4 w-full"
      >
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-bold mb-4 text-slate-900">
            📅 Historial de citas
          </h2>
          <Tooltip title="Recargar citas">
            <button
              className="cursor-pointer"
              onClick={() => getAppointmentsHistory()}
            >
              <FaArrowRotateLeft />
            </button>
          </Tooltip>
        </div>
        {Appointments(
          historyValues as IClinicAppointment[],
          false,
          pagHistory,
          handlePaginationHistory,
          confAppHist,
          doneAppHist,
          true,
        )}
      </motion.div>
      <div className="my-4 space-y-4">
        {doctor && doctor.id && (
          <>
            <DoctorSchedules idDoctor={doctor.id} Idc={clinic?.id} />

            <BlocksAndVacations idDoctor={doctor.id} />
          </>
        )}
      </div>
    </div>
  );
};

export default Doctor;
