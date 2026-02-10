import useStoreAuth from "@/store/useStoreAuth";
import { useEffect } from "react";

import { Outlet, useLocation } from "react-router";
import SideBar from "../shared/SideBar";
import { Layout } from "antd";

const Logged = () => {
  // const { pathname } = useLocation();
  // const token = useStoreAuth((set) => set.token);
  // useEffect(() => {
  //   if (!token) {
  //     window.location.href = "/login";
  //   }
  // }, [pathname, token]);

  // if (!token) return null;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <div className="p-4 w-full">
        <Outlet />
      </div>
    </Layout>
  );
};

export default Logged;
