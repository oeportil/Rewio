import FormButton from "@/components/shared/forms/FormButton";
import type { IClinic } from "@/types/index";
import { BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router";

const ClinicCard = ({
  clinic,
  openEdit,
  role,
}: {
  clinic: IClinic;
  openEdit?: (clinic: IClinic) => void;
  role: "admin" | "patient" | "clinic";
}) => {
  const navigate = useNavigate();
  return (
    <article className="relative group bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ">
      <div className="relative flex items-center gap-4">
        {/* Edit button */}
        {role === "admin" && (
          <button
            onClick={() => openEdit!(clinic)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition 
                   bg-white border border-zinc-200 rounded-md p-1.5 
                   text-zinc-500 hover:text-blue-600 hover:border-blue-500 shadow-sm cursor-pointer"
          >
            <BiPencil size={14} />
          </button>
        )}
        {/* Logo */}
        {clinic.logo && (
          <div className="h-14 w-14 rounded-lg bg-zinc-100 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src={clinic.logo}
              alt={clinic.name}
              className="object-contain h-full w-full p-2"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-zinc-800 truncate">
            {clinic.name}
          </h3>
          <p className="text-xs text-zinc-500 truncate">{clinic.email}</p>
          <p className="text-xs text-zinc-500 truncate">{clinic.phone}</p>

          {role != "patient" && (
            <div className="flex items-center justify-between mt-2">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium
              ${
                clinic.status
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
              >
                {clinic.status ? "Active" : "Inactive"}
              </span>

              {role != "clinic" && (
                <span className="text-[10px] text-zinc-400 truncate">
                  {clinic.owner.name}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {role != "admin" && (
        <div>
          <FormButton
            type="button"
            className="mx-auto mt-4 bg-sky-600 hover:bg-sky-700 text-xs text-white font-semibold w-full"
            click={() => navigate(`${clinic.slug}`)}
          >
            Entrar en la Clinica
          </FormButton>
        </div>
      )}
    </article>
  );
};

export default ClinicCard;
