import FormButton from "@/components/shared/forms/FormButton";
import { weekdays } from "@/consts/index";
import useAvailability from "@/hooks/logic/useAvailability";
import { DatePicker } from "antd";
import { RiErrorWarningLine } from "react-icons/ri";

type Prop = {
  idDoctor: number;
  idService: number;
};

const AvailableSchedules = ({ idDoctor, idService }: Prop) => {
  const { availableSlots, contextHolder, disabledDate, onChangeDate } =
    useAvailability({
      idDoctor,
      idService,
    });

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
        {/* ✅ Cuando viene una fecha específica */}
        {Array.isArray(availableSlots) && (
          <div className="flex flex-wrap gap-3">
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                className="px-4 py-2 bg-slate-100 rounded-lg
          hover:bg-sky-600 hover:text-white transition cursor-pointer"
              >
                {slot}
              </button>
            ))}
          </div>
        )}

        {/* ✅ Cuando es disponibilidad semanal */}
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
                    className="px-4 py-2 bg-slate-100 rounded-lg
              hover:bg-sky-600 hover:text-white transition cursor-pointer"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 flex justify-end">
        <FormButton type="button">Confirmar Cita</FormButton>
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
