import CommonCard from "@/components/shared/CommonCard";
import type { IGym } from "@/types/index";
import { formatDate } from "@/utils/index";
import { MdEdit } from "react-icons/md";

type GymCardProps = {
  v: IGym;
  onEdit: (gym: IGym) => void;
};

const GymCard = ({ v, onEdit }: GymCardProps) => {
  return (
    <CommonCard
      className={
        !v.status
          ? "bg-red-100/70 border-red-600"
          : "bg-gray-100 border-gray-300"
      }
    >
      {v.logo && (
        <div className="flex justify-center p-5 bg-gray-200/50 rounded-t-lg">
          <img
            src={v.logo}
            className="h-52 w-52"
            alt={`${v.name} Logo image`}
          />
        </div>
      )}

      <div className="flex md:flex-row flex-col justify-between">
        <h4 className="text-lg font-bold text-amber-700">{v.name}</h4>
        <div className="flex flex-col items-end justify-end m-1">
          <button
            className="text-blue-600 cursor-pointer"
            onClick={() => onEdit(v)}
          >
            <MdEdit size={20} />
          </button>
          <p
            className={`${v.status ? "text-green-600" : "text-red-600"} uppercase text-xs font-bold`}
          >
            {v.status ? "habilitado" : "Deshabilitado"}
          </p>
        </div>
      </div>
      <p className="font-bold text-gray-700">{v.phone}</p>
      <p className="font-bold text-gray-700">{v.plan.name}</p>
      <p className="font-bold text-gray-700">{v.status}</p>

      <p className="text-xs font-bold text-gray-600 text-right">
        <span className="text-amber-700">Creado:</span>{" "}
        {formatDate(v.createdAt)}
      </p>
      <p className="text-xs font-bold text-gray-600 text-right">
        <span className="text-amber-700">Modificado:</span>{" "}
        {formatDate(v.updatedAt)}
      </p>
    </CommonCard>
  );
};

export default GymCard;
