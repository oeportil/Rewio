import Dialog from "@/components/shared/Dialog";
import useModal from "@/store/useModal";
import type { IService } from "@/types/index";

interface Props {
  service?: IService | null;
  deleteServ: (id: number) => void;
}

const DeleteServiceModal = ({ service, deleteServ }: Props) => {
  const { close } = useModal();
  return (
    <Dialog id="deleteService" buttonContent={""} buttonStyles="hidden">
      <div className="w-full min-w-[320px] max-w-md">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 flex items-center justify-center 
          rounded-full bg-red-100 text-red-600 text-xl font-bold"
          >
            !
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Eliminar Servicio
            </h2>
            <p className="text-sm text-slate-500">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-slate-600">
            Estás a punto de eliminar el servicio:
          </p>

          <p className="mt-2 font-semibold text-red-600 text-lg">
            {service?.name}
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-100 
            hover:bg-gray-200 transition cursor-pointer"
            onClick={() => close("deleteService")}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => deleteServ(service?.id ?? 0)}
            className="px-4 py-2 rounded-lg bg-red-600 text-white 
            hover:bg-red-700 transition shadow-md cursor-pointer"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteServiceModal;
