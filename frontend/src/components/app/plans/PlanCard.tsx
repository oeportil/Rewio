import CommonCard from "@/components/shared/CommonCard";
import type { IPlan } from "@/types/index";
import { CgGym } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdEdit, MdProductionQuantityLimits } from "react-icons/md";
import { PiPersonArmsSpreadFill } from "react-icons/pi";

type PlanCardProps = {
  v: IPlan;
  onEdit: (plan: IPlan) => void;
};

const PlanCard = ({ v, onEdit }: PlanCardProps) => {
  const classes = () => "font-bold text-gray-700 flex items-center gap-2";
  return (
    <CommonCard className={"bg-gray-100 border-gray-300"}>
      <div className="flex md:flex-row flex-col justify-between">
        <h4 className="text-lg font-bold text-amber-700">{v.name}</h4>
        <div className="flex flex-col items-end justify-end m-1">
          <button
            className="text-blue-600 cursor-pointer"
            onClick={() => onEdit(v)}
          >
            <MdEdit size={20} />
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-2">
        <p className={classes()}>
          <span>Costo:</span>${v.cost}
          <FaMoneyBill1Wave />
        </p>
        <p className={classes()}>
          <span>Max Clientes:</span>
          {v.maxClients} <PiPersonArmsSpreadFill />
        </p>
        <p className={classes()}>
          <span>Max Usuarios:</span>
          {v.maxUsers} <FaUser />
        </p>
        <p className={classes()}>
          <span>Max Productos:</span>
          {v.maxProducts} <MdProductionQuantityLimits />
        </p>
        <p className={classes()}>
          <span>Gimnasios Asociados:</span>
          {v._count.gyms} <CgGym />
        </p>
      </div>
    </CommonCard>
  );
};

export default PlanCard;
