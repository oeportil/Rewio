import { motion } from "framer-motion";
import DoctorModal from "./DoctorModal";
import useDoctor from "@/hooks/Module/useDoctor";
import type { IDoctor } from "@/types/index";
import PaginationData from "@/components/shared/PaginationData";
import { Link } from "react-router";

type Prop = {
  clinicId: number;
};

const DoctorSection = ({ clinicId }: Prop) => {
  const { values, contextHolder, pag, handlePagination } = useDoctor({
    fetchData: true,
    type: "owners",
    clinicId,
  });

  const doctors = values as IDoctor[];

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-2xl shadow-md"
    >
      {contextHolder}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">👨‍⚕️ Doctores</h2>
        <DoctorModal clinicId={clinicId} />
      </div>

      {/* Lista */}
      <div className="space-y-4">
        {doctors?.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col md:flex-row md:items-center md:justify-between
              p-4 bg-slate-50 rounded-xl hover:bg-sky-50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {/* Indicador de color */}
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: doctor.color }}
                />

                <div>
                  <p className="font-semibold text-slate-800">
                    Dr. {doctor.user.name}
                  </p>
                  <p className="text-sm text-slate-500">{doctor.specialty}</p>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-md mt-1 inline-block
                    ${
                      doctor.active
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {doctor.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>

              <div className="flex gap-4 mt-3 md:mt-0">
                <Link
                  to={`${doctor.id}/${clinicId}/doctor`}
                  className="text-sky-600 text-sm font-semibold hover:underline cursor-pointer"
                >
                  Ver Perfil
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-400 py-8">
            No hay doctores registrados aún.
          </div>
        )}
        <PaginationData
          current={pag.page}
          total={pag.total!}
          pag={pag}
          onshowsizechange={handlePagination}
        />
      </div>
    </motion.div>
  );
};

export default DoctorSection;
