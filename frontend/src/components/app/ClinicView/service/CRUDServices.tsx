import { useService } from "@/hooks/Module/useService";
import { motion } from "framer-motion";
import ServiceModal from "./ServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

const CRUDServices = ({ clinicId }: { clinicId: number }) => {
  const {
    contextHolder,
    values,
    openEdit,
    saveService,
    editingService,
    setEditingService,
    deleteService,
    openDelete,
    delService,
  } = useService(clinicId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 bg-white p-6 rounded-2xl shadow-md w-full"
    >
      {contextHolder}
      <div className="flex justify-between items-center mb-6 w-full">
        <h2 className="text-lg font-bold text-slate-900">
          🛠 Servicios de la Clínica
        </h2>

        <ServiceModal
          saveService={saveService}
          initialData={editingService}
          setClear={setEditingService}
        />
      </div>

      <div className="space-y-4">
        {values.map((service) => (
          <div
            key={service.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between
        p-4 bg-slate-50 rounded-xl hover:bg-sky-50 transition-all duration-300"
          >
            <div>
              <p className="font-semibold text-slate-800">{service.name}</p>
              <p className="text-sm text-slate-500">
                {service.duration} min · ${service.price}
              </p>
            </div>

            <div className="flex gap-3 mt-3 md:mt-0">
              <button
                onClick={() => openEdit(service)}
                className="text-yellow-600 font-semibold text-sm hover:underline cursor-pointer"
              >
                Editar
              </button>

              <button
                onClick={() => openDelete(service)}
                className="text-red-600 font-semibold text-sm hover:underline cursor-pointer"
              >
                Eliminar
              </button>

              <DeleteServiceModal
                service={delService}
                deleteServ={deleteService}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CRUDServices;
