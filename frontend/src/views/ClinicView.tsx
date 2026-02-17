import Owner from "@/components/app/ClinicView/Owner";
import Patient from "@/components/app/ClinicView/Patient";
import ModulesLayout from "@/components/Layouts/ModulesLayout";
import useClinic from "@/hooks/Module/useClinic";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useParams } from "react-router";

const ClinicView = () => {
  const { slug } = useParams();
  const { getClinicBySlug, clinic } = useClinic({ fetchData: false });
  const user = useUserStore((set) => set.user);
  useEffect(() => {
    getClinicBySlug(slug ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <ModulesLayout title="">
      {user?.role != "patient" ? (
        <Owner clinic={clinic} getClinicBySlug={getClinicBySlug} />
      ) : (
        <Patient clinic={clinic} getClinicBySlug={getClinicBySlug} />
      )}
    </ModulesLayout>
  );
};

export default ClinicView;
