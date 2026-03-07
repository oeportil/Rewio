import ModulesLayout from "@/components/Layouts/ModulesLayout";
import ClinicModal from "./ClinicModal";
import useClinic from "@/hooks/Module/useClinic";
import PaginationData from "@/components/shared/PaginationData";
import ClinicCard from "./ClinicCard";

const CAdmin = () => {
  const {
    saveClinic,
    contextHolder,
    setImageBase64,
    pag,
    handlePagination,
    values,
    openEdit,
    editingClinic,
    setEditingClinic,
    pagination
  } = useClinic({ fetchData: true });
  return (
    <ModulesLayout title="Clinicas">
      {contextHolder}
      <div className="flex">
        {/* <SearchInput  /> */}
        <ClinicModal
          saveFunc={saveClinic}
          setImageBase64={setImageBase64}
          editingClinic={editingClinic}
          setEditingClinic={setEditingClinic}
        />
      </div>
      <section className="m-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {values.map((v, i) => (
          <ClinicCard key={i} clinic={v} openEdit={openEdit} role="admin" />
        ))}
      </section>
      <PaginationData
        current={pagination.page}
        total={pagination.total!}
        pag={pag}
        onshowsizechange={handlePagination}
      />
    </ModulesLayout>
  );
};

export default CAdmin;
