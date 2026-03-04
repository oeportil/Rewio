import type { IClinic, IClinicAppointment } from "@/types/index";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CRUDServices from "./service/CRUDServices";
import useClinic from "@/hooks/Module/useClinic";
import FormButton from "@/components/shared/forms/FormButton";
import { BiSave } from "react-icons/bi";
import FormInput from "@/components/shared/forms/FormInput";
import DoctorSection from "./doctor/DoctorSection";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { Tooltip } from "antd";
import { useAppointment } from "@/hooks/Module/useAppointment";
import Appointments from "./doctor/Appointments";

interface Props {
  clinic: IClinic | null;
}

const Owner = ({ clinic }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { saveClinic, setEditingClinic, contextHolder } = useClinic({
    fetchData: false,
    own: true,
  });
  const { values, getAppointments, pag, handlePagination } = useAppointment({
    type: "clinic",
    id: clinic?.id,
  });

  const {
    getAppointments: getAppointmentsHistory,
    values: historyValues,
    pag: pagHistory,
    handlePagination: handlePaginationHistory,
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
    <div className="p-8 bg-slate-50 min-h-screen">
      {contextHolder}
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:flex justify-between items-center mb-4 "
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

        <div className="md:m-0 my-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-sky-600 text-white px-5 py-2 rounded-lg 
          font-semibold hover:bg-sky-800 transition-all duration-300 cursor-pointer"
          >
            {isEditing ? "Guardar Cambios" : "Editar Información"}
          </button>
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
          {isEditing ? (
            <FormInput
              type="text"
              name="address"
              htmlFor="address"
              id="address"
              labelText="Dirección"
              defaultValue={clinic?.address}
            />
          ) : (
            <p className="mt-2 font-semibold text-slate-800">
              {clinic?.address}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 * 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300"
        >
          {isEditing ? (
            <FormInput
              type="email"
              name="email"
              htmlFor="email"
              id="email"
              labelText="Email"
              defaultValue={clinic?.email}
            />
          ) : (
            <p className="mt-2 font-semibold text-slate-800">{clinic?.email}</p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 * 0.1 }}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl 
            transition-all duration-300"
        >
          {isEditing ? (
            <FormInput
              type="tel"
              name="phone"
              htmlFor="phone"
              id="phone"
              labelText="Teléfono"
              defaultValue={clinic?.phone}
            />
          ) : (
            <p className="mt-2 font-semibold text-slate-800">{clinic?.phone}</p>
          )}
        </motion.div>
        {isEditing && (
          <div className="col-span-3 flex justify-end">
            <FormButton
              type="submit"
              woback={false}
              className="w-fit bg-sky-500 text-white hover:bg-sky-700
          p-1 rounded-sm 
       transition ease-in-out duration-300 
        cursor-pointer text-center flex justify-center items-center gap-1"
            >
              <BiSave size={30} />
            </FormButton>
          </div>
        )}
      </form>
      {/* Doctors + Appointments */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Doctors Section */}
        {clinic && clinic.id != 0 && <DoctorSection clinicId={clinic.id} />}
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
          )}
        </motion.div>
      </div>
      {clinic && clinic.id && <CRUDServices clinicId={clinic?.id ?? 0} />}

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
        )}
      </motion.div>
    </div>
  );
};

export default Owner;
