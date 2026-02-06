import Permissions from "@/components/app/RolesAndPerm/Permissions";
import Roles from "@/components/app/RolesAndPerm/Roles";
import ModulesLayout from "@/components/Layouts/ModulesLayout";
import { Tabs } from "antd";

const RolesAndPerm = () => {
  const items = [
    {
      key: "1",
      label: "Roles",
      children: <Roles />,
    },
    {
      key: "2",
      label: "Permisos",
      children: <Permissions />,
    },
  ];
  return (
    <ModulesLayout title="Roles y Permisos">
      <Tabs defaultActiveKey="1" items={items} />
    </ModulesLayout>
  );
};

export default RolesAndPerm;
