import useStoreAuth from "@/store/useStoreAuth";
import { useEffect } from "react";

import { Outlet, useLocation } from "react-router";
// import SideBar from "../shared/SideBar";
import { Dropdown, Layout } from "antd";
import { getMeAction } from "@/services/auth.service";
import { useUserStore } from "@/store/useUserStore";
import { useWindowSizeListener } from "@/store/useWindowSize";
import useAuth from "@/hooks/Module/useAuth";
import { FaUser } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import Logo from "../shared/Logo";

const Logged = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();
  const token = useStoreAuth((set) => set.token);
  const { saveUser, user } = useUserStore();
  useWindowSizeListener();
  const getME = async () => {
    const actualuser = await getMeAction();
    if (actualuser.status) saveUser(actualuser.value);
  };
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    } else getME();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, token]);

  if (!token) return null;

  const items = [
    {
      key: "1",
      label: "Mi Perfil",
      onClick: () => {
        window.location.href = `/dashboard/user/${user?.name.toLowerCase()}`;
      },
      icon: <FaUser />,
    },
    {
      key: "2",
      label: "Cerrar Sesión",
      onClick: () => {
        logout();
      },
      icon: <BiLogOutCircle />,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div className="w-full h-screen overflow-y-auto bg-slate-50">
        {/* HEADER */}
        <div
          className="fixed top-0 left-0 w-full h-16 z-50 
      flex justify-between items-center px-6 
      bg-white border-b border-slate-200"
        >
          <a href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8" />
          </a>

          <Dropdown menu={{ items }} trigger={["click"]}>
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-3 px-3 py-2 rounded-lg 
          hover:bg-sky-50 transition-all duration-200 cursor-pointer"
            >
              {/* Avatar */}
              <div
                className="h-8 w-8 rounded-full bg-linear-to-br from-sky-500 to-indigo-600 
            text-white flex items-center justify-center text-sm font-semibold"
              >
                {user?.email?.[0].toUpperCase()}
              </div>

              <span className="text-sm font-semibold text-slate-800 max-w-45 truncate">
                {user?.email}
              </span>

              <IoIosArrowDown className="text-slate-400 text-sm" />
            </button>
          </Dropdown>
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto pt-20 px-6 pb-10 flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
};

export default Logged;
