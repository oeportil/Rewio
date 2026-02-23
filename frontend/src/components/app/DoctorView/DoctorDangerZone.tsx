import { useState } from "react";
import Dialog from "@/components/shared/Dialog";
import type { IDoctor } from "@/types/index";

interface Props {
  doctor: IDoctor;
  removeDoctor: (doctorId: number) => void;
}

const DoctorDangerZone = ({ doctor, removeDoctor }: Props) => {
  const [confirmText, setConfirmText] = useState("");

  const isMatch = confirmText === doctor.user.name;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-red-200">
      <h2 className="text-lg font-bold text-red-600 mb-2">⚠ Zona de Peligro</h2>

      <p className="text-sm text-slate-600 mb-6">
        Eliminar este doctor removerá su acceso a la clínica y desasignará todas
        sus citas futuras. Esta acción no se puede deshacer.
      </p>

      <Dialog
        id="deleteDoctor"
        buttonContent="Eliminar Doctor"
        buttonStyles="bg-red-600 text-white px-5 py-2 rounded-lg 
        font-semibold hover:bg-red-700 transition-all duration-300"
      >
        <div className="space-y-5">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Confirmar Eliminación
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Para confirmar, escribe el nombre del doctor:
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="font-semibold text-red-600">{doctor.user.name}</p>
            <p className="text-sm text-slate-500">{doctor.specialty}</p>
          </div>

          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder="Escribe el nombre completo"
            className="w-full border px-3 py-2 rounded-lg 
            focus:ring-2 focus:ring-red-500 outline-none"
          />

          <div className="flex justify-end gap-3 pt-4">
            <button
              disabled={!isMatch}
              onClick={() => removeDoctor(doctor.id)}
              className={`px-5 py-2 rounded-lg font-semibold transition-all duration-300
                ${
                  isMatch
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Sí, eliminar definitivamente
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DoctorDangerZone;
