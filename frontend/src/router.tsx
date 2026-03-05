import { BrowserRouter, Route, Routes } from "react-router";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
// import WelcomePage from "./views/WelcomePage";
import Logged from "./components/Layouts/Logged";
import Clinics from "./views/Clinics";
import Register from "./views/Register";
import ClinicView from "./views/ClinicView";
import User from "./views/User";
import DoctorView from "./views/DoctorView";

const Router = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Logged />}>
            {/* <Route index element={<WelcomePage />} /> */}
            <Route index element={<Clinics />} />
            <Route path="user/:user" element={<User />} />
            <Route path=":slug" element={<ClinicView />} />
            <Route
              path="clinics/:slug/:doctorId/:clinicId/doctor"
              element={<DoctorView />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
};

export default Router;
