import React, { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";
import { BiLogOutCircle } from "react-icons/bi";
import { GiWeightLiftingUp } from "react-icons/gi";
import useAuth from "@/hooks/Module/useAuth";
import { TbBusinessplan } from "react-icons/tb";
import { FaHandshake } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const allModules = (logout: () => void) => {
  const modules: MenuItem[] = [
    getItem(
      <Link to="/dashboard/dashboard">Dashboard</Link>,
      "/dashboard/dashboard",
      <PieChartOutlined />,
    ),
    getItem(
      <Link to="/dashboard/gym">Gimnasios</Link>,
      "/dashboard/gym",
      <GiWeightLiftingUp />,
    ),
    getItem(
      <Link to="/dashboard/plans">Planes</Link>,
      "/dashboard/plans",
      <TbBusinessplan />,
    ),
    getItem(
      <Link to="/dashboard/roles-perm">Roles y Permisos</Link>,
      "/dashboard/roles-perm",
      <RiUserSettingsFill />,
    ),
    getItem(
      <Link to="/dashboard/customers">Clientes</Link>,
      "/dashboard/customers",
      <FaHandshake />,
    ),

    getItem(
      <button onClick={logout} className="cursor-pointer">
        Cerrar Sesión
      </button>,
      "",
      <BiLogOutCircle />,
    ),
  ];
  return modules;
};

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div className="p-4 flex items-center justify-center mb-5">
        <Link to={"/dashboard"}>
          <Logo size={collapsed ? "xs" : "xl"} />
        </Link>
      </div>
      <div>
        <p className="pl-4 uppercase text-xs font-bold text-gray-400">Menu</p>
      </div>
      <Menu
        mode="inline"
        items={allModules(logout)}
        selectedKeys={[location.pathname]}
      />
    </Sider>
  );
};

export default SideBar;
