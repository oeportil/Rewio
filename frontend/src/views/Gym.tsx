import ModulesLayout from "@/components/Layouts/ModulesLayout";
import FormGym from "@/components/app/gym/FormGym";
import GymCard from "@/components/app/gym/GymCard";
import Dialog from "@/components/shared/Dialog";
import PaginationData from "@/components/shared/PaginationData";
import SearchInput from "@/components/shared/SearchInput";
import useGym from "@/hooks/Module/useGym";
import { FaPlus } from "react-icons/fa";

const Gym = () => {
  const {
    contextHolder,
    values,
    handlePagination,
    pag,
    saveGym,
    pagination,
    openEdit,
    setEditingGym,
    editingGym,
  } = useGym();
  return (
    <ModulesLayout title="Gimnasios">
      {contextHolder}
      <div className=" md:flex items-center justify-center gap-2 w-full my-2 rounded-md ">
        <SearchInput
          handlePagination={handlePagination}
          pag={pag}
          className="w-full py-2"
        />
        <Dialog
          cleanFunc={setEditingGym}
          buttonContent={
            <>
              <FaPlus /> Crear Gimnasio
            </>
          }
        >
          <FormGym
            contextHolder={contextHolder}
            saveGym={saveGym}
            editingGym={editingGym}
          />
        </Dialog>
      </div>

      <section className="space-y-2 m-2 border-t border-gray-200 pt-4">
        {values.map((v, i) => (
          <GymCard key={i} v={v} onEdit={openEdit} />
        ))}
      </section>
      <PaginationData
        current={pagination.page}
        total={pagination.totalCount}
        onshowsizechange={handlePagination}
        pag={pag}
      />
    </ModulesLayout>
  );
};

export default Gym;
