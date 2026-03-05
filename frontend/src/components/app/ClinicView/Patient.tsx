import { motion } from "framer-motion";
import type { IClinic, IDoctor } from "@/types/index";
import { useService } from "@/hooks/Module/useService";
import useDoctor from "@/hooks/Module/useDoctor";
import AvailableSchedules from "./patient/AvailableSchedules";
import { useStoreAppointment } from "@/store/useStoreAppointment";
import { useAppointment } from "@/hooks/Module/useAppointment";
import Appointments from "./patient/Appointments";

interface Props {
  clinic: IClinic | null;
}

const Patient = ({ clinic }: Props) => {
  const { values: services } = useService(clinic!.id);
  const { values: doctors } = useDoctor({
    fetchData: true,
    type: "owners",
    clinicId: clinic!.id,
  });

  const {
    updateAppointment: store,
    appointment,
    appointments,
  } = useStoreAppointment();
  const { cancellAppointment, pag, handlePagination, values } = useAppointment({
    type: "patient",
  });

  if (!clinic) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-slate-500">Cargando clínica...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 space-y-10">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between 
        bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex items-center gap-4">
          <img
            src={clinic.logo}
            alt={clinic.name}
            className="w-16 h-16 rounded-xl shadow-md object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{clinic.name}</h1>
            <p className="text-sm text-slate-500">{clinic.address}</p>
          </div>
        </div>
      </motion.div>

      {/* CITAS */}
      <Appointments
        appointments={appointments.length != 0 ? appointments : values}
        cancellAppointment={cancellAppointment}
        pag={pag}
        handlePagination={handlePagination}
      />

      {/* SERVICIOS */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-6">🛠 Servicios Disponibles</h2>

        <div className="grid md:grid-cols-3 gap-4 max-h-72 overflow-y-auto">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                store({ serviceId: service.id, duration: service.duration });
              }}
              className={`p-4 rounded-xl border cursor-pointer transition
                ${
                  appointment.serviceId != 0 &&
                  appointment.serviceId === service.id
                    ? "border-sky-500 bg-sky-50"
                    : "border-slate-200 hover:border-sky-400"
                }
              `}
            >
              <p className="font-semibold">{service.name}</p>
              <p className="text-sm text-slate-500">
                {service.duration} min · ${service.price}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DOCTORES */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-6">👨‍⚕️ Doctores</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {doctors.map((doctor) => {
            const d = doctor as IDoctor;
            return (
              <div
                key={d.id}
                onClick={() => {
                  store({ doctorId: d.id });
                }}
                className={`p-4 rounded-xl border cursor-pointer transition
                ${
                  appointment.doctorId != 0 && appointment.doctorId === d.id
                    ? "border-sky-500 bg-sky-50"
                    : "border-slate-200 hover:border-sky-400"
                }
              `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <div>
                    <p className="font-semibold">{d.user.name}</p>
                    <p className="text-sm text-slate-500">{d.specialty}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HORARIOS DISPONIBLES */}
      {appointment &&
        appointment.doctorId != 0 &&
        appointment.serviceId != 0 && (
          <AvailableSchedules
            idDoctor={appointment.doctorId}
            idService={appointment.serviceId}
          />
        )}
    </div>
  );
};

export default Patient;
