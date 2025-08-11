import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import AdminDashboard from "../pages/AdminDashboard";
import DashboardLayout from "../components/Admin-Dashboard-Component/DashboardLayout";
import Settings from "../components/Admin-Dashboard-Component/Settings";
import StudentMgt from "../components/Admin-Dashboard-Component/StudentMgt";
import StaffMgt from "../components/Admin-Dashboard-Component/StaffMgt";
import SessionReport from "../components/Admin-Dashboard-Component/SessionReport";
import StaffReg from "../components/Admin-Dashboard-Component/StaffReg";
import StudentReg from "../components/Admin-Dashboard-Component/StudentReg";
import TeachersDashboard from "../pages/TeachersDashboard";
import TdashboardLayout from "../components/Teachers-Dashboard-Component/TdashboardLayout";
import ResultEntry from "../components/Teachers-Dashboard-Component/ResultEntry";
import Result from "../components/Teachers-Dashboard-Component/Result";
// import OtpModal from "../components/Login-Component/OtpModal";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* <Route path="hmme" element={<Home />} /> */}
      </Route>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/otp" element={<OtpModal />} /> */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/admin/dashboard-layout" element={<DashboardLayout />} />
        <Route path="/admin/staffmgt" element={<StaffMgt />} />
        <Route path="/admin/staffmgt/staffReg" element={<StaffReg />} />
        <Route path="/admin/studentmgt" element={<StudentMgt />} />
        <Route path="/admin/studentmgt/studentReg" element={<StudentReg />} />
        <Route path="admin/settings" element={<Settings />} />
        <Route path="admin/session-report" element={<SessionReport />} />
      </Route>
      <Route path="/Tadmin" element={<TeachersDashboard />}>
        <Route
          path="/Tadmin/Tdashboard-layout"
          element={<TdashboardLayout />}
        />
        <Route path="/Tadmin/result-entry" element={<ResultEntry />} />
        <Route path="/Tadmin/results" element={<Result />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
