import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import WelcomePage from "./views/WelcomePage";
import Logged from "./components/Layouts/Logged";
import Dashboard from "./views/Dashboard";
import Gym from "./views/Gym";
import Plans from "./views/Plans";
import Customers from "./views/Customers";

import RolesAndPerm from "./views/RolesAndPerm";

import Products from "./views/Products";

const Router = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Logged />}>
            <Route index element={<WelcomePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="gym" element={<Gym />} />
            <Route path="plans" element={<Plans />} />
            <Route path="customers" element={<Customers />} />
            <Route path="roles-perm" element={<RolesAndPerm />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Router;
