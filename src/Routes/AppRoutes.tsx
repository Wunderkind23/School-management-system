import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="hmme" element={<Home />} /> */}
      </Route>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="signup" element={<SignupPage />} /> */}
    </Routes>
  );
};

export default AppRoutes;
