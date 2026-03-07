import FormButton from "@/components/shared/forms/FormButton";
import FormGroup from "@/components/shared/forms/FormGroup";
import useAvailability from "@/hooks/logic/useAvailability";
import { useStoreAppointment } from "@/store/useStoreAppointment";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { RiErrorWarningLine } from "react-icons/ri";
import ConfirmAppointment from "./ConfirmAppointment";

type Prop = {
  idDoctor: number;
  idService: number;
  saveAppointment: () => void;
};

const AvailableSchedules = ({ idDoctor, idService, saveAppointment }: Prop) => {
  const {
    availableSlots,
    availableDays,
    contextHolder,
    date,
    onPanelChange,
    onSelectDate,
  } = useAvailability({
    idDoctor,
    idService,
  });

  const {
    updateAppointment: store,
    appointment,
    cleanAppointment,
  } = useStoreAppointment();

  const disabledDate = (current: Dayjs) => {
    const formatted = current.format("YYYY-MM-DD");

    if (current.endOf("day") < dayjs()) return true;

    return !availableDays.includes(formatted);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {contextHolder}

      <h2 className="text-lg font-bold mb-4">📅 Selecciona un día</h2>
      <div className="w-11/12 max-w-lg flex justify-center mx-auto">
        <Calendar
          fullscreen={false}
          disabledDate={disabledDate}
          onPanelChange={onPanelChange}
          onSelect={onSelectDate}
        />
      </div>

      {date && (
        <div className="mt-6">
          <h3 className="font-semibold mb-3">🕒 Horarios disponibles</h3>

          <div className="flex flex-wrap gap-3">
            {availableSlots.length === 0 && (
              <p className="text-sm text-gray-500">
                No hay horarios disponibles.
              </p>
            )}

            {availableSlots.map((slot) => (
              <button
                key={slot}
                onClick={() =>
                  store({
                    date,
                    startTime: slot,
                  })
                }
                className={`px-4 py-2 rounded-lg border transition cursor-pointer
                ${
                  appointment.startTime === slot && appointment.date === date
                    ? "border-sky-500 bg-sky-50"
                    : "border-slate-200 bg-slate-100 hover:bg-sky-600 hover:text-white"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <FormGroup className="mt-10 flex flex-col">
        <label className="text-sky-950">Notas adicionales</label>

        <textarea
          value={appointment.notes || ""}
          onChange={(e) => store({ notes: e.target.value })}
          className="border m-1 border-gray-300 rounded-sm h-32 py-1 text-sm
          focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </FormGroup>

      <div className="mt-6 flex gap-2 justify-end">
        <FormButton type="button" woback={false} click={cleanAppointment}>
          Limpiar Datos
        </FormButton>

        <ConfirmAppointment  saveAppointment={saveAppointment}/>
      </div>

      <div className="bg-gray-100 rounded-lg p-2 mt-2 border border-gray-200">
        <p className="text-xs text-gray-600 flex gap-1 items-center">
          <RiErrorWarningLine />
          Si es tu primera cita, se creará tu registro como paciente.
        </p>
      </div>
    </div>
  );
};

export default AvailableSchedules;
