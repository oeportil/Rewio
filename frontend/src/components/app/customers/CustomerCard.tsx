import CommonCard from "@/components/shared/CommonCard";
import type { ICustomer } from "@/types/index";
import { formatDate } from "@/utils/index";
import { Switch } from "antd";
import { MdEdit } from "react-icons/md";

type CustomerCardProps = {
  v: ICustomer;
  onEdit: (customer: ICustomer) => void;
  onToggleStatus: (id: number, status: boolean) => void;
};

const CustomerCard = ({ v, onEdit, onToggleStatus }: CustomerCardProps) => {
  return (
    <CommonCard>
      <div className="border-b border-slate-300 flex justify-between items-end mb-2">
        <h4 className="text-lg font-bold text-amber-700"> {v.username}</h4>
        <p className="font-bold text-gray-700">{v.gym.name}</p>
      </div>
      <p className="font-bold text-gray-700">{v.email}</p>
      <p className="font-bold text-gray-700">{v.role.name}</p>
      <p className="font-bold text-gray-700">{v.status}</p>
      <button
        className="text-blue-600 cursor-pointer hidden"
        onClick={() => onEdit(v)}
      >
        <MdEdit size={20} />
      </button>
      <div className="flex flex-col w-fit">
        <label htmlFor="" className="text-amber-700">
          Estado de Gimnasio
        </label>
        <Switch
          checked={v.gym.status}
          checkedChildren="Activado"
          unCheckedChildren="Desactivado"
          onChange={() => onToggleStatus(v.gym.id, !v.gym.status)}
        />
      </div>
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

export default CustomerCard;
