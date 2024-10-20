import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Index";
import Collect from "./pages/dashboard/collect/Index";
import Register from "./pages/register/Index";
import SignIn from "./pages/sign-in/Index";
import Report from "./pages/dashboard/report/Index";
import HouseHold from "./pages/dashboard/household/Index";
import Settings from "./pages/dashboard/settings/Index";
import Verify from "./pages/dashboard/verify/Index";

const App = () => {
  return (
    <div className=" min-h-screen bg-gray-50 flex flex-col">
      <Routes>
        <Route element={<Home />} path="/" />

        <Route element={<Collect />} path="/dashboard/collect" />
        <Route element={<Report />} path="/dashboard/report" />
        <Route element={<HouseHold />} path="/dashboard/household" />
        <Route element={<Settings />} path="/dashboard/settings" />
        <Route element={<Verify />} path="/dashboard/verify" />

        {/* Sign-in routes */}

        <Route element={<Register />} path="/api/register" />

        <Route element={<SignIn />} path="/api/sign-in" />
      </Routes>
    </div>
  );
};

export default App;
