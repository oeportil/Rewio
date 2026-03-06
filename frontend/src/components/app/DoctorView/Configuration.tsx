import FormButton from "@/components/shared/forms/FormButton";
import { motion } from "framer-motion";

type Prop = {
  form: {
    specialty: string;
    color: string;
  };
  updateDoctor: (id: number) => void;
  id: number;
  setForm: (v: { specialty: string; color: string }) => void;
};

const Configuration = ({ form, setForm, id, updateDoctor }: Prop) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-2xl shadow-md"
    >
      <h2 className="text-lg font-bold mb-6">⚙ Configuración del Doctor</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-slate-600">Especialidad</label>
          <input
            value={form.specialty}
            onChange={(e) => setForm({ ...form, specialty: e.target.value })}
            className="w-full mt-2 border px-3 py-2 rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Color en Citas</label>
          <div className="flex items-center gap-4 mt-2">
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="w-12 h-10 rounded-md cursor-pointer"
            />
            <span
              className="px-4 py-2 rounded- text-white text-sm"
              style={{ backgroundColor: form.color }}
            >
              Vista previa
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <FormButton type="button" woback={false} click={() => updateDoctor(id)}>
          Guardar Cambios
        </FormButton>
      </div>
    </motion.div>
  );
};

export default Configuration;
