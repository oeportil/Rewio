import { FaLock } from "react-icons/fa";

type fields = {
  oldPass: string;
  newPass: string;
  newPass2: string;
};

type TPass = {
  fields: fields;
  setFields: (v: fields) => void;
  changePassword: () => void;
};

const Password = ({ fields, setFields, changePassword }: TPass) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
      <h3 className="text-sm font-semibold text-zinc-800 flex items-center gap-2">
        <FaLock /> Cambiar Contraseña
      </h3>

      <div className="md:grid md:grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-xs text-zinc-500">Contraseña Actual</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            placeholder="••••••••"
            value={fields.oldPass}
            onChange={(e) => {
              setFields({ ...fields, oldPass: e.target.value });
            }}
          />
        </div>

        <div>
          <label className="text-xs text-zinc-500">Contraseña nueva</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            placeholder="••••••••"
            value={fields.newPass}
            onChange={(e) => {
              setFields({ ...fields, newPass: e.target.value });
            }}
          />
        </div>

        <div className="">
          <label className="text-xs text-zinc-500">
            Confirmar contraseña nueva
          </label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
            placeholder="••••••••"
            value={fields.newPass2}
            onChange={(e) => {
              setFields({ ...fields, newPass2: e.target.value });
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={changePassword}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm cursor-pointer"
        >
          Actualizar contraseña
        </button>
      </div>
    </div>
  );
};

export default Password;
