import ModulesLayout from "@/components/Layouts/ModulesLayout";
import useClinic from "@/hooks/Module/useClinic";
import ClinicCard from "./ClinicCard";
import PaginationData from "@/components/shared/PaginationData";
import SearchInput from "@/components/shared/SearchInput";

const CPatient = () => {
  const { values, pag, handlePagination } = useClinic();

  return (
    <ModulesLayout title="Escoge tu Clinica">
      <div>
        <SearchInput pag={pag} handlePagination={handlePagination} />
      </div>
      <section className="m-4 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {values.map((v, i) => (
          <ClinicCard key={i} clinic={v} role="patient" />
        ))}
      </section>
      <PaginationData
        current={pag.page}
        total={pag.total!}
        pag={pag}
        onshowsizechange={handlePagination}
      />
    </ModulesLayout>
  );
};

export default CPatient;
