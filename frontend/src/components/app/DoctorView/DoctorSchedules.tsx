import Dialog from "@/components/shared/Dialog";
import FormButton from "@/components/shared/forms/FormButton";
import { weekdays } from "@/consts/index";
import useDoctorSchedule from "@/hooks/logic/useDoctorSchedule";
import { Select, TimePicker } from "antd";
import { FaPlus } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { useParams } from "react-router";
type Prop = {
  idDoctor: number;
};

const DoctorSchedules = ({ idDoctor }: Prop) => {
  const { clinicId } = useParams();
  const {
    schedules,
    onChangeTime,
    saveSchedule,
    contextHolder,
    setTimes,
    times,
  } = useDoctorSchedule({
    fetchData: true,
    idDoctor,
    clinicId: +clinicId!,
  });
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <h2 className="text-lg font-bold mb-6">🕒 Horarios Semanales</h2>
        {contextHolder}
        <div className="flex justify-end">
          <Dialog
            id="schedule"
            buttonStyles="bg-sky-600 text-white px-4 rounded-lg hover:bg-sky-700 transition cursor-pointer mb-5 flex"
            buttonContent={"+ Agregar"}
          >
            <h2 className="text-start text-sky-700 font-semibold text-lg flex gap-1 items-center justify-start">
              Agregar Horarios{" "}
              <RiCalendarScheduleFill className="text-sky-500" />
            </h2>
            <form
              action=""
              className="grid grid-cols-1 items-center gap-2 mt-4"
              onSubmit={saveSchedule}
            >
              <div className="col-span-2">
                <label htmlFor="" className="text-sky-950 flex flex-col">
                  Seleccion de Dia
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="ejem: Lunes, ..."
                  options={weekdays}
                  onChange={(v) => setTimes({ ...times, weekdays: v })}
                />
              </div>
              <div className="md:col-span-1 col-span-2">
                <label htmlFor="" className="text-sky-950 flex flex-col">
                  Hora de Inicio
                </label>
                <TimePicker
                  onChange={(_, time) => onChangeTime(time, "start")}
                  className="w-full"
                />
              </div>
              <div className="md:col-span-1 col-span-2">
                <label htmlFor="" className="text-sky-950 flex flex-col">
                  Hora de Fin
                </label>
                <TimePicker
                  onChange={(_, time) => onChangeTime(time, "end")}
                  className="w-full"
                />
              </div>
              <div className="mt-1 flex justify-end col-span-2">
                <FormButton
                  type="submit"
                  woback={false}
                  className="px-2 rounded-lg bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
                >
                  <FaPlus />
                  Agregar
                </FormButton>
              </div>
            </form>
          </Dialog>
        </div>
      </div>
      <div className="space-y-4">
        {schedules.map((day, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 bg-slate-50 rounded-xl flex-col md:flex-row"
          >
            <span className="font-semibold">
              {weekdays.find((f) => f.id == +day.weekday)?.label}
            </span>
            <div className="flex flex-col md:flex-row md:gap-4 items-center">
              <span>
                {day.startTime} - {day.endTime}
              </span>
              <FormButton
                type="button"
                className="text-sky-600 text-sm font-semibold hover:underline"
              >
                Editar
              </FormButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorSchedules;
