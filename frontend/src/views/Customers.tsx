import CustomerCard from "@/components/app/customers/CustomerCard";
import FormCustomer from "@/components/app/customers/FormCustomer";
import ModulesLayout from "@/components/Layouts/ModulesLayout";
import Dialog from "@/components/shared/Dialog";
import PaginationData from "@/components/shared/PaginationData";
import SearchInput from "@/components/shared/SearchInput";
import useCustomers from "@/hooks/Module/useCustomers";
import { FaPlusCircle } from "react-icons/fa";

const Customers = () => {
  const {
    contextHolder,
    values,
    handlePagination,
    pag,
    saveCustomer,
    pagination,
    openEdit,
    setEditingCust,
    editingCust,
    changeStatus,
  } = useCustomers();
  return (
    <ModulesLayout title="Clientes">
      {contextHolder}
      <div className=" md:flex items-center justify-center gap-2 w-full my-2">
        <SearchInput
          handlePagination={handlePagination}
          pag={pag}
          className="w-full"
        />
        <Dialog
          cleanFunc={setEditingCust}
          buttonContent={
            <>
              Crear Cliente <FaPlusCircle />
            </>
          }
        >
          <FormCustomer
            contextHolder={contextHolder}
            savePlan={saveCustomer}
            editingCustomer={editingCust}
          />
        </Dialog>
      </div>

      <section className="space-y-2 m-2">
        {values.map((v, i) => (
          <CustomerCard
            key={i}
            v={v}
            onEdit={openEdit}
            onToggleStatus={changeStatus}
          />
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

export default Customers;
