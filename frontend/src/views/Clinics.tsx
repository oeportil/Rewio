import CAdmin from "@/components/app/Clinics/CAdmin";
import CClinic from "@/components/app/Clinics/CClinic";
import CDoctor from "@/components/app/Clinics/CDoctor";
import CPatient from "@/components/app/Clinics/CPatient";
import { useUserStore } from "@/store/useUserStore";

const Clinics = () => {
  const user = useUserStore((set) => set.user);

  switch (user?.role) {
    case "patient":
      return <CPatient />;
    case "admin":
      return <CAdmin />;
    case "clinic":
      return <CClinic />;
    case "doctor":
      return <CDoctor />;
    default:
      window.location.href = "/dashboard";
      return;
  }
};

export default Clinics;
