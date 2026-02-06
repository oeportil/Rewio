import ModulesLayout from "@/components/Layouts/ModulesLayout";
import FormPlan from "@/components/app/plans/FormPlan";
import PlanCard from "@/components/app/plans/PlanCard";
import Dialog from "@/components/shared/Dialog";
import PaginationData from "@/components/shared/PaginationData";
import SearchInput from "@/components/shared/SearchInput";
import usePlan from "@/hooks/Module/usePlan";
import { FaPlusCircle } from "react-icons/fa";

const Plans = () => {
  const {
    contextHolder,
    values,
    handlePagination,
    pag,
    savePlan,
    pagination,
    openEdit,
    setEditingPlan,
    editingPlan,
  } = usePlan();
  return (
    <ModulesLayout title="Planes">
      {contextHolder}
      <div className=" md:flex items-center justify-center gap-2 w-full my-2">
        <SearchInput
          handlePagination={handlePagination}
          pag={pag}
          className="w-full"
        />
        <Dialog
          cleanFunc={setEditingPlan}
          buttonContent={
            <>
              Crear Plan <FaPlusCircle />
            </>
          }
        >
          <FormPlan
            contextHolder={contextHolder}
            savePlan={savePlan}
            editingPlan={editingPlan}
          />
        </Dialog>
      </div>

      <section className="space-y-2 m-2">
        {values.map((v, i) => (
          <PlanCard key={i} v={v} onEdit={openEdit} />
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

export default Plans;
