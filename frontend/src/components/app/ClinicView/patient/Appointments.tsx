import type { IAppointment } from "@/types/index";
import { formatDate } from "@/utils/index";

const Appointments = ({ appointments }: { appointments: IAppointment[] }) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold text-slate-900 mb-6">📅 Mis Citas</h2>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex justify-between items-center 
                p-4 rounded-xl bg-slate-50 hover:bg-sky-50 transition"
          >
            <div>
              <p className="font-semibold">
                Dr. {appointment.doctor.user.name}
              </p>
              <p className="text-sm text-slate-500">
                {formatDate(appointment.date)} - {appointment.startTime}
              </p>

              <div className="">
                <p className="text-sm text-slate-500">
                  Servicio: {appointment.service.name}
                </p>
              </div>
            </div>
            {appointment.status === "cancelled" ? (
              <p className="text-sm text-red-500 font-semibold">Cancelada</p>
            ) : (
              <>
                {appointment.status === "done" ? (
                  <p className="text-sm text-green-500 font-semibold">
                    Realizada
                  </p>
                ) : (
                  <button className="text-sky-600 font-semibold hover:underline cursor-pointer">
                    Reprogramar
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Appointments;
