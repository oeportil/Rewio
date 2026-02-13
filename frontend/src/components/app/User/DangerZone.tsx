import { FaTrash } from "react-icons/fa";
import DeleteModal from "./DeleteModal";

const DangerZone = () => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-sm font-semibold text-red-700 flex items-center gap-2">
        <FaTrash /> Danger Zone
      </h3>

      <p className="text-sm text-red-600">
        Elminar tu cuenta es <b>permanente</b>. Esta accion no se puede revertir
      </p>

      <div className="flex justify-end">
        <DeleteModal />
      </div>
    </div>
  );
};

export default DangerZone;
