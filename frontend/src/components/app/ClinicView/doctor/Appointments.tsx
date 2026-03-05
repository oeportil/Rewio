import FormButton from "@/components/shared/forms/FormButton";
import PaginationData from "@/components/shared/PaginationData";
import type { apiTpag, IClinicAppointment, Tpagination } from "@/types/index";
import { formatDate } from "@/utils/index";

const Appointments = (
  values: IClinicAppointment[],
  now: boolean = true,
  pag: apiTpag,
  handlePagination: (values: Tpagination) => void,
  confirmFunc: (id: number) => void,
) => (
  <div className="space-y-3">
    {/* Esto se mapea dinámico */}
    {values && values.length > 0 ? (
      values.map((appointment) => {
        const a = appointment as IClinicAppointment;
        return (
          <div
            key={a.id}
            className="p-3 bg-slate-50 rounded-lg hover:bg-sky-50 transition"
          >
            <p className="font-semibold">Paciente: {a.patient.user.name}</p>
            <p className="text-sm text-slate-500">
              {a.startTime} - {a.doctor.user.name}
            </p>
            {!now && (
              <p className="text-xs text-slate-400">
                Fecha: {formatDate(a.date)}
              </p>
            )}
            {a.status === "confirmed" ? (
              <p className="text-sm text-green-500 font-semibold">Confirmada</p>
            ) : a.status === "pending" ? (
              <div className="flex justify-between items-center">
                <p className="text-sm text-orange-500 font-semibold">
                  Pendiente
                </p>
                <FormButton
                  type="button"
                  woback={false}
                  click={() => confirmFunc(a.id)}
                  className="w-fit bg-green-500 text-white hover:bg-green-700
                          p-1 rounded-sm
                        transition ease-in-out duration-300
                          cursor-pointer text-center flex justify-center items-center gap-1"
                >
                  Confirmar
                </FormButton>
              </div>
            ) : (
              <p className="text-sm text-red-500 font-semibold">Cancelada</p>
            )}
          </div>
        );
      })
    ) : (
      <p className="text-center text-slate-500">No hay citas para hoy</p>
    )}
    <PaginationData
      current={pag.page}
      total={pag.total!}
      pag={pag}
      onshowsizechange={handlePagination}
    />
  </div>
);

export default Appointments;
