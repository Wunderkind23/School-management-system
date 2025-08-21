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
import StudentDashboard from "../pages/StudentDashboard";
import SdashboardLayout from "../components/Student-Dashboard-Component/SdashboardLayout";
import OnboardingPage from "../pages/OnboardingPage";
import FirstPhase2 from "../components/OnboardingComponent/FirstPhase2";
import SecondPhase1 from "../components/OnboardingComponent/SecondPhase1";
import SecondPhase2 from "../components/OnboardingComponent/SecondPhase2";
import SecondPhase3 from "../components/OnboardingComponent/SecondPhase3";
import SecondPhase4 from "../components/OnboardingComponent/SecondPhase4";
import AcademicReport from "../components/Admin-Dashboard-Component/AcademicReport";
import FinancialReport from "../components/Admin-Dashboard-Component/FinancialReport";
import ReportCard from "../components/Admin-Dashboard-Component/ReportCard";

// import OtpModal from "../components/Login-Component/OtpModal";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/firstpage" element={<OnboardingPage />} />
      <Route path="/firstphase2" element={<FirstPhase2 />} />
      <Route path="/secondphase1" element={<SecondPhase1 />} />
      <Route path="/secondphase2" element={<SecondPhase2 />} />
      <Route path="/secondphase3" element={<SecondPhase3 />} />
      <Route path="/secondphase4" element={<SecondPhase4 />} />

      <Route element={<Layout />}>
        {/* <Route path="hmme" element={<Home />} /> */}
      </Route>

      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/otp" element={<OtpModal />} /> */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route path="/admin/dashboard-layout" element={<DashboardLayout />} />
        <Route path="/admin/staffmgt" element={<StaffMgt />} />
        <Route path="/admin/staffmgt/staffReg" element={<StaffReg />} />
        <Route path="/admin/studentmgt" element={<StudentMgt />} />
        <Route path="/admin/studentmgt/studentReg" element={<StudentReg />} />
        <Route path="admin/settings" element={<Settings />} />
        <Route path="admin/session-report" element={<SessionReport />}>
          <Route path="academic-report" element={<AcademicReport />} />
          <Route path="report-card" element={<ReportCard />} />
          <Route path="financial-report" element={<FinancialReport />} />
        </Route>
      </Route>
      <Route path="/Tadmin" element={<TeachersDashboard />}>
        <Route
          path="/Tadmin/Tdashboard-layout"
          element={<TdashboardLayout />}
        />
        <Route path="/Tadmin/result-entry" element={<ResultEntry />} />
        <Route path="/Tadmin/results" element={<Result />} />
      </Route>
      <Route path="/Sadmin" element={<StudentDashboard />}>
        <Route
          path="/Sadmin/Sdashboard-layout"
          element={<SdashboardLayout />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
