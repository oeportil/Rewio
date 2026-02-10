import CAdmin from "@/components/app/Clinics/CAdmin";
import CClinic from "@/components/app/Clinics/CClinic";
import CPatient from "@/components/app/Clinics/CPatient";

const Clinics = () => {
  const role = "admin";

  switch (role) {
    case "patient":
      return <CPatient />;
    case "admin":
      return <CAdmin />;
    case "clinic":
      return <CClinic />;
    default:
      window.location.href = "/dashboard";
      return;
  }
};

export default Clinics;
