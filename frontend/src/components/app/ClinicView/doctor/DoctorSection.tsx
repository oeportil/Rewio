import { motion } from "framer-motion";
import DoctorModal from "./DoctorModal";
import useDoctor from "@/hooks/Module/useDoctor";

type Prop = {
  clinicId: number;
};

const DoctorSection = ({ clinicId }: Prop) => {
  const { values, contextHolder } = useDoctor({
    fetchData: true,
    type: "owners",
    clinicId,
  });
  console.log(values);
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-2xl shadow-md"
    >
      {contextHolder}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-4 text-slate-900">👨‍⚕️ Doctores</h2>
        <DoctorModal />
      </div>
      <div className="space-y-3">
        {/* Esto luego lo mapeamos con values */}
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-sky-50 transition">
          <span>Dr. Juan Pérez</span>
          <button className="text-sky-600 text-sm font-semibold cursor-pointer">
            Ver Perfil
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorSection;
