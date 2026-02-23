import React, { useState } from "react";
import { PieChartOutlined } from "@ant-design/icons";
import { Menu, type MenuProps, Drawer } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useLocation } from "react-router";
import Logo from "./Logo";
import { BiLogOutCircle } from "react-icons/bi";
import useAuth from "@/hooks/Module/useAuth";
import { FaUser } from "react-icons/fa";
import { useUserStore } from "@/store/useUserStore";
import useWindowSize from "@/store/useWindowSize";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

const allModules = (user: string): MenuItem[] => [
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

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();
  const { logout } = useAuth();
  const user = useUserStore((set) => set.user);
  const { width } = useWindowSize();

  const menu = (
    <Menu
      mode="inline"
      items={allModules(user?.name ?? "Usuario")}
      selectedKeys={[location.pathname]}
      onClick={() => setMobileOpen(false)}
    />
  );

  // 📱 Mobile (Drawer)
  if (width < 992) {
    return (
      <>
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow"
        >
          ☰
        </button>

        <Drawer
          placement="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          bodyStyle={{ padding: 0 }}
          width={250}
        >
          <div className="p-4 flex justify-center">
            <Logo className="w-24" />
          </div>

          {menu}

          <button onClick={logout} className="flex gap-2 items-center p-6">
            <BiLogOutCircle />
            Cerrar Sesión
          </button>
        </Drawer>
      </>
    );
  }

  // 🖥️ Desktop (Sider)
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      theme="light"
      className="m-4 rounded-lg"
    >
      <div className="p-4 flex items-center justify-center mb-5">
        <Link to="/dashboard">
          <Logo className="w-24" />
        </Link>
      </div>

      <p className="pl-4 uppercase text-xs font-bold text-gray-400">Menu</p>

      {menu}

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
