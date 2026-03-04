import Dialog from "@/components/shared/Dialog";
import PaginationData from "@/components/shared/PaginationData";
import useModal from "@/store/useModal";
import type { apiTpag, IAppointment, Tpagination } from "@/types/index";
import { canReprogram, formatDate } from "@/utils/index";

const Appointments = ({
  appointments,
  cancellAppointment,
  pag,
  handlePagination,
}: {
  appointments: IAppointment[];
  cancellAppointment: (id: number) => void;
  pag: apiTpag;
  handlePagination: (value: Tpagination) => void;
}) => {
  const { close } = useModal();
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold text-slate-900 mb-6">📅 Mis Citas</h2>

      <div className="space-y-4">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex md:flex-row flex-col justify-between items-center 
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
                  <div className="flex md:flex-row flex-col justify-between items-center md:gap-6 gap-4 md:mt-0 mt-6">
                    {canReprogram(appointment.date) && (
                      <button className="text-sky-600 font-semibold hover:underline cursor-pointer">
                        Reprogramar
                      </button>
                    )}
                    <Dialog
                      buttonContent="Cancelar"
                      id="cancellAppo"
                      buttonStyles="text-red-600 font-semibold hover:underline cursor-pointer"
                    >
                      <div className="p-2">
                        <h2 className="text-lg font-bold mb-4">
                          ¿Estás seguro de cancelar esta cita?
                        </h2>
                        <p className="text-sm text-slate-500 mb-6">
                          Si cancelas, tendrás que agendar una nueva cita.
                        </p>
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => close("cancellAppo")}
                            className="px-4 py-2 rounded-md bg-slate-200 hover:bg-slate-300 transition cursor-pointer"
                          >
                            No, mantener
                          </button>
                          <button
                            onClick={() => cancellAppointment(appointment.id)}
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
                          >
                            Sí, cancelar
                          </button>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        <PaginationData
          current={pag.page}
          total={pag.total!}
          pag={pag}
          onshowsizechange={handlePagination}
        />
      </div>
    </section>
  );
};

export default Appointments;
