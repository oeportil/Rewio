import type { IClinic, IClinicAppointment } from "@/types/index";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useClinic from "@/hooks/Module/useClinic";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { Tooltip } from "antd";
import { useAppointment } from "@/hooks/Module/useAppointment";
import Appointments from "./doctor/Appointments";
import Imagent from "@/assets/imagent.jpg";

interface Props {
  clinic: IClinic | null;
}

const Doctor = ({ clinic }: Props) => {
  const { saveClinic, setEditingClinic, contextHolder } = useClinic({
    fetchData: false,
    own: true,
  });
  const { values, getAppointments, pag, handlePagination, confirmAppointment } =
    useAppointment({
      type: "clinic",
      id: clinic?.id,
    });

  const {
    getAppointments: getAppointmentsHistory,
    values: historyValues,
    pag: pagHistory,
    handlePagination: handlePaginationHistory,
    confirmAppointment: confAppHist,
    contextHolder: contextHolderHistory,
  } = useAppointment({
    type: "clinic",
    id: clinic?.id,
    now: false,
  });

  useEffect(() => {
    setEditingClinic(clinic);
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
        className="md:flex justify-between items-center mb-4 "
      >
        <div className="flex items-center gap-4">
          <img
            src={clinic?.logo ? clinic?.logo : Imagent}
            alt={clinic?.name}
            className="w-16 h-16 rounded-xl shadow-md object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {clinic?.name}
            </h1>
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
        )}
      </motion.div>
    </div>
  );
};

export default Doctor;
