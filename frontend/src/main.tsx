import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./router.tsx";
import "aos/dist/aos.css";
import AOS from "aos";
import { registerSW } from "virtual:pwa-register";
import { ConfigProvider } from "antd";
import { anttheme } from "@/consts/Anttheme.ts";

//Acá se incializa el AOS (lo de las animaciones)
AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 100,
});
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider theme={anttheme}>
      <Router />
    </ConfigProvider>
  </StrictMode>,
);
