import FormButton from "@/components/shared/forms/FormButton";
type Prop = {
  idDoctor: number;
};

const DoctorSchedules = ({ idDoctor }: Prop) => {
  return (
    <section className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-6">🕒 Horarios Semanales</h2>

      <div className="space-y-4">
        {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => (
          <div
            key={day}
            className="flex justify-between items-center p-4 bg-slate-50 rounded-xl"
          >
            <span className="font-semibold">{day}</span>
            <div className="flex gap-4">
              <span>08:00 - 17:00</span>
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
