import React, { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";
import { BiLogOutCircle } from "react-icons/bi";
import useAuth from "@/hooks/Module/useAuth";
import { FaUser } from "react-icons/fa";
import { useUserStore } from "@/store/useUserStore";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const allModules = (user: string) => {
  const modules: MenuItem[] = [
    getItem(
      <Link to="/dashboard/clinics">Clinicas</Link>,
      "/dashboard/clinics",
      <PieChartOutlined />,
    ),
    getItem(
      <Link to={`/dashboard/user/${user.toLowerCase()}`}>{user}</Link>,
      `/dashboard/user/${user.toLowerCase()}`,
      <FaUser />,
    ),
  ];
  return modules;
};

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();
  const user = useUserStore((set) => set.user);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
      className="m-4 rounded-lg"
    >
      <div className="p-4 flex items-center justify-center mb-5">
        <Link to={"/dashboard"}>
          <Logo className="w-24" />
        </Link>
      </div>
      <div>
        <p className="pl-4 uppercase text-xs font-bold text-gray-400">Menu</p>
      </div>
      <Menu
        mode="inline"
        items={allModules(user?.name ?? "Usuario")}
        selectedKeys={[location.pathname]}
      />
      <button
        onClick={logout}
        className="cursor-pointer flex gap-2 items-center p-9 absolute bottom-5"
      >
        <BiLogOutCircle />
        {!collapsed && "Cerrar Sesión"}
      </button>
    </Sider>
  );
};

export default SideBar;
