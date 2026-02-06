import CommonCard from "@/components/shared/CommonCard";
import type { IRol } from "@/types/index";
import { MdEdit } from "react-icons/md";

type RolCardProps = {
  v: IRol;
  onEdit: (rol: IRol) => void;
};

const RolCard = ({ v, onEdit }: RolCardProps) => {
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
      <div className="">
        <p className={classes()}>{v.description}</p>
        <p className={classes()}>{v.isSystem}</p>
      </div>
    </CommonCard>
  );
};

export default RolCard;
