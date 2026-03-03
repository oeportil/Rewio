import Dialog from "@/components/shared/Dialog";
import { useAppointment } from "@/hooks/Module/useAppointment";
import { useStoreAppointment } from "@/store/useStoreAppointment";
import { calculateEndTime } from "@/utils/index";

const ConfirmAppointment = () => {
  const { appointment } = useStoreAppointment();
  const { saveAppointment, contextHolder } = useAppointment();
  return (
    <Dialog id="confirmAppointment" buttonContent="Confirmar Cita">
      {contextHolder}
      <div className="space-y-6 min-w-[320px]">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Confirmar Cita</h2>
          <p className="text-sm text-slate-500">
            Verifica la información antes de confirmar.
          </p>
        </div>
        {/* Resumen */}
        <div className="bg-slate-50 p-5 rounded-xl space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500 text-sm">Fecha</span>
            <span className="font-semibold">{appointment.date}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500 text-sm">Hora Inicio</span>
            <span className="font-semibold">{appointment.startTime}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500 text-sm">
              Finaliza Aproximadamente
            </span>
            <span className="font-semibold text-sky-600">
              {calculateEndTime(appointment.duration, appointment.startTime)}
            </span>
          </div>
        </div>

        {/* Info adicional */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-sm text-green-700">
            ⏱ Duración estimada: {appointment.duration} minutos
          </p>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={saveAppointment}
            className="bg-sky-600 text-white px-5 py-2 rounded-lg 
            font-semibold hover:bg-sky-800 transition-all duration-300 cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmAppointment;
