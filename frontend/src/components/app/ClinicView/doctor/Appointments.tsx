import Dialog from "@/components/shared/Dialog";
import FormButton from "@/components/shared/forms/FormButton";
import PaginationData from "@/components/shared/PaginationData";
import type { apiTpag, IClinicAppointment, TPagination, Tpagination } from "@/types/index";
import { formatDate } from "@/utils/index";
import dayjs from "dayjs";

const Appointments = (
  values: IClinicAppointment[],
  now: boolean = true,
  pag: apiTpag,
  pagination: TPagination,
  handlePagination: (values: Tpagination) => void,
  confirmFunc: (id: number) => void,
  doneFunc: (id: number) => void,
  isDoctor: boolean = false
) => (
  <div className="space-y-3">
    {values && values.length > 0 ? (
      values.map((appointment) => {
        const a = appointment as IClinicAppointment;

        const isExpired =
          dayjs(a.date).isBefore(dayjs(), "day") &&
          !["done", "cancelled"].includes(a.status);

        return (
          <div
            key={a.id}
            className={`p-3 rounded-lg transition ${
              isExpired
                ? "bg-red-50 hover:bg-red-100"
                : "bg-slate-50 hover:bg-sky-50"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                Paciente: {a.patient.user.name}
              </p>

              {!isDoctor && (
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: a.doctor.color || "transparent",
                  }}
                ></div>
              )}
            </div>

            <p className="text-sm text-slate-500">
              {a.startTime}{" "}
              {!isDoctor
                ? `- Doctor: ${a.doctor.user.name}`
                : `- Servicio: ${a.service.name}`}
            </p>

            {!now && (
              <p className="text-xs text-slate-400">
                Fecha: {formatDate(a.date)}
              </p>
            )}
            
            {/* STATUS */}
            {isExpired ? (
              <p className="text-sm text-red-600 font-semibold">
                No atendida
              </p>
            ) : a.status === "done" ? (
              <p className="text-sm text-sky-500 font-semibold">
                Finalizado
              </p>
            ) : a.status === "confirmed" ? (
              <div className="flex justify-between items-center">
                <p className="text-sm text-green-500 font-semibold">
                  Confirmada
                </p>

                <FormButton
                  type="button"
                  woback={false}
                  click={() => doneFunc(a.id)}
                  className="w-fit bg-sky-500 text-white hover:bg-sky-700
                  p-1 rounded-sm transition ease-in-out duration-300
                  cursor-pointer text-center flex justify-center items-center gap-1"
                >
                  Finalizado
                </FormButton>
              </div>
            ) : a.status === "pending" ? (
              <div className="flex justify-between items-center">
                <p className="text-sm text-orange-500 font-semibold">
                  Pendiente
                </p>

                {!isDoctor && (
                  <FormButton
                    type="button"
                    woback={false}
                    click={() => confirmFunc(a.id)}
                    className="w-fit bg-green-500 text-white hover:bg-green-700
                    p-1 rounded-sm transition ease-in-out duration-300
                    cursor-pointer text-center flex justify-center items-center gap-1"
                  >
                    Confirmar
                  </FormButton>
                )}
              </div>
            ) : (
              <p className="text-sm text-red-500 font-semibold">
                Cancelada
              </p>
            )}

             {appointment.notes && (<Dialog buttonContent="Ver Notas" id={`details-${appointment.id}`}
                 buttonStyles="text-sky-600 text-xs font-semibold hover:underline cursor-pointer">
                  <div className="p-4">
                    <p className="mb-2"><span className="font-semibold">Notas:</span> {appointment.notes}</p>
                  </div>
                </Dialog>)}

          </div>
        );
      })
    ) : (
      <p className="text-center text-slate-500">
        {now ? "No hay citas para hoy" : "No hay citas en el historial"}
      </p>
    )}

    <PaginationData
      current={pagination.page}
      total={pagination.total!}
      pag={pag}
      onshowsizechange={handlePagination}
    />
  </div>
);

export default Appointments;
