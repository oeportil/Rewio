import { useEffect, useState } from "react";
import useWindowSize from "../../../store/useWindowSize";
import Logo from "../../shared/Logo";
import { Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { classesNavbarLinks } from "../../../consts";
import useStoreAuth from "@/store/useStoreAuth";

const Navbar = () => {
  const { width, setSize } = useWindowSize((state) => state);
  const [open, setOpen] = useState<boolean>(false);
  const token = useStoreAuth((set) => set.token);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  //contenido de la navbar
  const content = [
    { value: "#home", label: "Inicio" },
    { value: "#services", label: "Servicios" },
    { value: "#aboutus", label: "Nosotros" },
    { value: "#contacto", label: "Contacto" },
    {
      value: "",
      label: () => (
        <button
          className="bg-sky-600 text-white font-bold rounded-md hover:bg-sky-800 
        transition-all ease-in-out duration-300 p-2 text-sm cursor-pointer"
          onClick={() => (window.location.href = "/login")}
        >
          {token ? "Ir a Dashboard" : "Iniciar Sesión"}
        </button>
      ),
    },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSize(window.innerWidth, window.innerHeight);
    });
  }, [setSize]);

  return (
    <div className="h-20 fixed w-full flex items-center bg-slate-50 z-50 shadow-md">
      {width <= 768 ? (
        <>
          <div className="flex justify-between p-5  w-full">
            <a href="/">
              <Logo className="w-28" />
            </a>
            <button className="" onClick={showDrawer}>
              <RxHamburgerMenu size={20} />
            </button>
          </div>
          <Drawer
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={open}
          >
            <div className="flex flex-col space-y-6 justify-center items-center my-2">
              {" "}
              {content.map((item) => {
                if (typeof item.label == "string")
                  return (
                    <a
                      href={item.value}
                      className={classesNavbarLinks}
                      style={{ color: "#454545", fontWeight: "650" }}
                      key={item.value}
                    >
                      {item.label}
                    </a>
                  );
                else return item.label();
              })}
            </div>
          </Drawer>
        </>
      ) : (
        <>
          <nav className="w-full flex items-center justify-between px-4 py-2">
            <a href="/">
              <Logo className="w-28" />
            </a>
            <div className="flex items-center">
              {content.map((item) => {
                if (typeof item.label == "string")
                  return (
                    <a
                      href={item.value}
                      className={classesNavbarLinks}
                      style={{ color: "#454545", fontWeight: "650" }}
                      key={item.value}
                    >
                      {item.label}
                    </a>
                  );
                else return item.label();
              })}
            </div>
          </nav>
        </>
      )}
    </div>
  );
};

export default Navbar;
