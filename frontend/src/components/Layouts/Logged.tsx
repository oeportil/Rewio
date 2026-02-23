import useStoreAuth from "@/store/useStoreAuth";
import { useEffect } from "react";

import { Outlet, useLocation } from "react-router";
import SideBar from "../shared/SideBar";
import { Layout } from "antd";
import { getMeAction } from "@/services/auth.service";
import { useUserStore } from "@/store/useUserStore";
import { useWindowSizeListener } from "@/store/useWindowSize";

const Logged = () => {
  const { pathname } = useLocation();
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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <div className="p-4 w-full overflow-y-auto h-screen">
        <div className="flex justify-end">
          <p className="text-sm font-bold text-sky-900">{user?.email}</p>
        </div>
        <Outlet />
      </div>
    </Layout>
  );
};

export default Logged;
