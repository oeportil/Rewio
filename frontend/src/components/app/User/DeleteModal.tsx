import Dialog from "@/components/shared/Dialog";
import useUser from "@/hooks/Module/useUser";
import useModal from "@/store/useModal";
import { FaExclamationTriangle, FaTrash } from "react-icons/fa";

const DeleteModal = () => {
  const { disableUser } = useUser(true);
  const { close } = useModal();

  return (
    <Dialog
      id="user"
      buttonContent={
        <span className="flex items-center gap-2">
          <FaTrash /> Eliminar mi Cuenta
        </span>
      }
      buttonStyles="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm"
    >
      <div className="max-w-md space-y-4">
        <div className="flex items-center gap-3 text-red-600">
          <FaExclamationTriangle size={24} />
          <h3 className="text-lg font-semibold">Eliminar cuenta</h3>
        </div>

        <p className="text-sm text-zinc-600">
          Esta acción es <b>permanente</b>. Todos tus datos, clínicas, citas y
          accesos serán eliminados. No podrás recuperar tu cuenta.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
          ⚠️ Si continúas, perderás acceso inmediato a Rewio.
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button
            onClick={() => close("user")}
            className="px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 cursor-pointer"
          >
            Cancelar
          </button>

          <button
            onClick={() => {
              disableUser();
              close("user");
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 flex items-center gap-2 cursor-pointer"
          >
            <FaTrash /> Eliminar definitivamente
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
