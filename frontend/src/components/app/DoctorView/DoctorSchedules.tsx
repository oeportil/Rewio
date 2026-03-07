import Dialog from "@/components/shared/Dialog";
import FormButton from "@/components/shared/forms/FormButton";
import { weekdays } from "@/consts/index";
import useDoctorSchedule from "@/hooks/logic/useDoctorSchedule";
import { useUserStore } from "@/store/useUserStore";
import { Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { useParams } from "react-router";
type Prop = {
  idDoctor: number;
  Idc?: number;
};

const DoctorSchedules = ({ idDoctor, Idc }: Prop) => {
  const { clinicId } = useParams();
  const user = useUserStore((state) => state.user);
  const {
    schedules,
    onChangeTime,
    saveSchedule,
    contextHolder,
    setTimes,
    times,
    scheduleEdit,
    setScheduleEdit,
    handleEdit,
    deleteSchedule
  } = useDoctorSchedule({
    fetchData: true,
    idDoctor,
    clinicId: Idc ? Idc : +clinicId!,
  });
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <h2 className="text-lg font-bold mb-6">
          🕒
          {user && user.role != "doctor"
            ? "Horarios Semanales"
            : " Mis Horarios"}
        </h2>
        {contextHolder}
        {user && user.role != "doctor" && (
          <div className="flex justify-end">
            <Dialog
            cleanFunc={() => {
              setScheduleEdit(null);
              setTimes({ startTime: "", endTime: "", weekdays: [] })
            }}
              id="schedule"
              buttonStyles="bg-sky-600 text-white px-4 rounded-lg hover:bg-sky-700 transition cursor-pointer mb-5 flex"
              buttonContent={"+ Agregar"}
            >
              <h2 className="text-start text-sky-700 font-semibold text-lg flex gap-1 items-center justify-start">
               {scheduleEdit ? "Editar Horario" : "Agregar Horario"}{" "}
                <RiCalendarScheduleFill className="text-sky-500" />
              </h2>
              <form
                action=""
                className="grid grid-cols-1 items-center gap-2 mt-4"
                onSubmit={saveSchedule}
              >
                {!scheduleEdit && (<div className="col-span-2">
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
                </div>)}
                <div className="md:col-span-1 col-span-2">
                  <label htmlFor="" className="text-sky-950 flex flex-col">
                    Hora de Inicio
                  </label>
                  <TimePicker
                    onChange={(_, time) => onChangeTime(time, "start")}
                    className="w-full"
                    value={times.startTime ? dayjs(times.startTime, "HH:mm") : null}
                  />
                </div>
                <div className="md:col-span-1 col-span-2">
                  <label htmlFor="" className="text-sky-950 flex flex-col">
                    Hora de Fin
                  </label>
                  <TimePicker
                    onChange={(_, time) => onChangeTime(time, "end")}
                    className="w-full"
                    value={times.endTime ? dayjs(times.endTime, "HH:mm") : null}
                  />
                </div>
                <div className="mt-1 flex justify-end col-span-2">
                  <FormButton
                    type="submit"
                    woback={false}
                    className="px-2 rounded-lg bg-linear-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 flex items-center gap-2"
                  >
                    <FaPlus />
                     {scheduleEdit ? "Editar" : "Agregar"}
                  </FormButton>
                </div>
              </form>
            </Dialog>
          </div>
        )}
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
              {user && user.role != "doctor" && (
                <div className="flex items-center gap-2">
                  <FormButton
                click={() => handleEdit(day)}
                  type="button"
                  className="text-sky-600 text-sm font-semibold hover:underline"
                >
                  Editar
                </FormButton>

                 <FormButton
                click={() => deleteSchedule(day.id)}
                  type="button"
                  className="text-red-600 text-sm font-semibold hover:underline"
                >
                  Eliminar 
                </FormButton>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoctorSchedules;
