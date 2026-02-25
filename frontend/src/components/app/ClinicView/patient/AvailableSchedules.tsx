import FormButton from "@/components/shared/forms/FormButton";
import FormGroup from "@/components/shared/forms/FormGroup";
import { weekdays } from "@/consts/index";
import useAvailability from "@/hooks/logic/useAvailability";
import { useStoreAppointment } from "@/store/useStoreAppointment";
import { addMonthAndYear } from "@/utils/index";
import { DatePicker } from "antd";
import { RiErrorWarningLine } from "react-icons/ri";
import ConfirmAppointment from "./ConfirmAppointment";

type Prop = {
  idDoctor: number;
  idService: number;
};

const AvailableSchedules = ({ idDoctor, idService }: Prop) => {
  const { availableSlots, contextHolder, disabledDate, onChangeDate, date } =
    useAvailability({
      idDoctor,
      idService,
    });
  const {
    updateAppointment: store,
    appointment,
    cleanAppointment,
  } = useStoreAppointment();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {contextHolder}
      <div className="my-4 flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-lg font-bold  ">🕒 Horarios Disponibles</h2>
        <DatePicker
          disabledDate={disabledDate}
          placeholder="Filtrar por fecha"
          onChange={onChangeDate}
        />
      </div>
      <div className="flex flex-col gap-4">
        {/* Cuando viene una fecha específica */}
        {Array.isArray(availableSlots) && (
          <div className="flex flex-wrap gap-3">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className={`px-4 py-2  rounded-lg border
           transition cursor-pointer
          ${
            appointment.startTime === slot && appointment.date === date
              ? " border-sky-500 bg-sky-50"
              : "border-slate-200 bg-slate-100 hover:border-sky-400 hover:bg-sky-600 hover:text-white "
          }`}
                onClick={() => store({ date, startTime: slot })}
              >
                {slot}
              </button>
            ))}
          </div>
        )}

        {/* Cuando es disponibilidad semanal */}
        {!Array.isArray(availableSlots) &&
          Object.entries(availableSlots).map(([day, slots]) => (
            <div key={day}>
              <h3 className="font-semibold text-slate-700 mb-2">
                {weekdays.find((f) => f.id == +day)?.label}
              </h3>

              <div className="flex flex-wrap gap-3">
                {slots.map((slot, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2  rounded-lg border
           transition cursor-pointer
          ${
            appointment.startTime === slot &&
            appointment.date === addMonthAndYear(+day)
              ? " border-sky-500 bg-sky-50"
              : "border-slate-200 bg-slate-100 hover:border-sky-400 hover:bg-sky-600 hover:text-white "
          }`}
                    onClick={() => {
                      store({ date: addMonthAndYear(+day), startTime: slot });
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
      <FormGroup className="mt-10 flex flex-col">
        <label htmlFor="" className="text-sky-950">
          Notas Adicionales para tu cita
        </label>
        <textarea
          onChange={(e) => store({ notes: e.target.value })}
          className="border m-1 border-gray-300 rounded-sm h-32  py-1 text-sm focus:outline-none 
          focus:ring-1 focus:ring-sky-500 focus:border-transparent resize-y max-h-44 min-h-16"
        >
          {appointment.notes}
        </textarea>
      </FormGroup>

      <div className="mt-6 flex gap-2 justify-end">
        <FormButton type="button" woback={false} click={cleanAppointment}>
          Limpiar Datos
        </FormButton>
        <ConfirmAppointment />
      </div>
      <div className="bg-gray-100 rounded-lg p-2 mt-2 border border-gray-200">
        <p className="text-xs text-gray-600 flex gap-1 items-center">
          <RiErrorWarningLine />
          Recuerda que si es tu primera vez agendando una cita, se creará tu
          registro de paciente dentro de la clínica.
        </p>
      </div>
    </div>
  );
};

export default AvailableSchedules;
