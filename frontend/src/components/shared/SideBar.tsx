import React, { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { Menu, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";
import { BiLogOutCircle } from "react-icons/bi";
import useAuth from "@/hooks/Module/useAuth";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const modules: MenuItem[] = [
  getItem(
    <Link to="/dashboard/clinics">Clinicas</Link>,
    "/dashboard/clinics",
    <PieChartOutlined />,
  ),
];

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
      className="relative"
    >
      <div className="p-4 flex items-center justify-center mb-5">
        <Link to={"/dashboard"}>
          <div className="bg-slate-300 p-3 rounded-lg r">
            <Logo className="w-24" />
          </div>
        </Link>
      </div>
      <div>
        <p className="pl-4 uppercase text-xs font-bold text-gray-400">Menu</p>
      </div>
      <Menu mode="inline" items={modules} selectedKeys={[location.pathname]} />
      <button
        onClick={logout}
        className="cursor-pointer flex gap-2 items-center p-9 absolute bottom-5"
      >
        <BiLogOutCircle />
        Cerrar Sesión
      </button>
    </Sider>
  );
};

export default SideBar;
