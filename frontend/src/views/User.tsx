import { useState } from "react";
import ModulesLayout from "@/components/Layouts/ModulesLayout";
import { useUserStore } from "@/store/useUserStore";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaEdit,
  FaSave,
  FaLock,
} from "react-icons/fa";
import { roleLabels } from "../consts";

const UserProfile = () => {
  const user = useUserStore((s) => s.user);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    status: user?.status ?? "",
  });

  if (!user) return null;

  return (
    <ModulesLayout title="">
      <div className="max-w-4xl mx-auto mt-6 space-y-6">
        {/* Header */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex md:flex-row flex-col space-y-4 md:space-y-0 items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-linear-to-br from-sky-500 to-indigo-600 text-white flex items-center justify-center text-xl font-bold">
              {user.name[0]}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sky-800">
                {user.name}
              </h2>
              <p className="text-sm text-zinc-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => setEditing(!editing)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm 
                       hover:bg-sky-50 transition text-sky-600 cursor-pointer"
          >
            <FaEdit />
            Edit Profile
          </button>
        </div>

        {/* Info */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="text-xs text-zinc-500 flex items-center gap-2">
              <FaUser /> Nombre
            </label>
            {editing ? (
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
              />
            ) : (
              <p className="mt-1 text-sm text-zinc-800">{user.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-xs text-zinc-500 flex items-center gap-2">
              <FaEnvelope /> Email
            </label>
            {editing ? (
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
              />
            ) : (
              <p className="mt-1 text-sm text-zinc-800">{user.email}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="text-xs text-zinc-500 flex items-center gap-2">
              <FaUserShield /> Role
            </label>
            <p className="mt-1 text-sm text-zinc-700">
              {roleLabels[user.role] ?? user.role}
            </p>
          </div>

          <div>
            <label className="text-xs text-zinc-500 flex items-center gap-2">
              <FaUserShield /> Status
            </label>
            <p
              className={` mt-1 text-xs text-white w-fit p-1 rounded-full px-2 ${
                user.status ? " bg-green-600" : " bg-red-600"
              }`}
            >
              {user.status ? "Activo" : "Inactivo"}
            </p>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="text-xs text-zinc-500 flex items-center gap-2">
            <FaUserShield /> Status
          </label>
          <p className="mt-1 text-sm text-zinc-700">
            {roleLabels[user.role] ?? user.role}
          </p>
        </div>

        {/* Save */}
        {editing && (
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              <FaSave /> Guardar Cambios
            </button>
          </div>
        )}

        {/* Password */}
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
              />
            </div>

            <div>
              <label className="text-xs text-zinc-500">Contraseña nueva</label>
              <input
                type="password"
                className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
                placeholder="••••••••"
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
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 text-sm cursor-pointer">
              Actualizar contraseña
            </button>
          </div>
        </div>
      </div>
    </ModulesLayout>
  );
};

export default UserProfile;
