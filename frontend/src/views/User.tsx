import { useState } from "react";
import ModulesLayout from "@/components/Layouts/ModulesLayout";
import { useUserStore } from "@/store/useUserStore";
import {
  FaUser,
  FaEnvelope,
  FaUserShield,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { roleLabels } from "../consts";
import Password from "@/components/app/User/Password";
import DangerZone from "@/components/app/User/DangerZone";
import useUser from "@/hooks/Module/useUser";

const UserProfile = () => {
  const user = useUserStore((s) => s.user);
  const [editing, setEditing] = useState(false);
  const { chPass, changePassword, setChPass, contextHolder } = useUser(false);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    status: user?.status ?? "",
  });

  if (!user) return null;

  return (
    <ModulesLayout title="">
      {contextHolder}
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
            Editar Usuario
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
        {/* Save */}
        {editing && (
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              <FaSave /> Guardar Cambios
            </button>
          </div>
        )}

        <Password
          fields={chPass}
          setFields={setChPass}
          changePassword={changePassword}
        />

        {/* Danger Zone */}
        <DangerZone />
      </div>
    </ModulesLayout>
  );
};

export default UserProfile;
