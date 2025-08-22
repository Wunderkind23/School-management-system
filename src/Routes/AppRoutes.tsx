import { Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import LoginPage from '../pages/LoginPage'
import AdminDashboard from '../pages/AdminDashboard'
import DashboardLayout from '../components/Admin-Dashboard-Component/DashboardLayout'
import Settings from '../components/Admin-Dashboard-Component/Settings'
import StudentMgt from '../components/Admin-Dashboard-Component/StudentMgt'
import StaffMgt from '../components/Admin-Dashboard-Component/StaffMgt'
import SessionReport from '../components/Admin-Dashboard-Component/SessionReport'
import StaffReg from '../components/Admin-Dashboard-Component/StaffReg'
import StudentReg from '../components/Admin-Dashboard-Component/StudentReg'
import TeachersDashboard from '../pages/TeachersDashboard'
import TdashboardLayout from '../components/Teachers-Dashboard-Component/TdashboardLayout'
import ResultEntry from '../components/Teachers-Dashboard-Component/ResultEntry'
import Result from '../components/Teachers-Dashboard-Component/Result'
import StudentDashboard from '../pages/StudentDashboard'
import SdashboardLayout from '../components/Student-Dashboard-Component/SdashboardLayout'
import OnboardingPage from '../pages/OnboardingPage'
import FirstPhase2 from '../components/OnboardingComponent/FirstPhase2'
import SecondPhase1 from '../components/OnboardingComponent/SecondPhase1'
import SecondPhase2 from '../components/OnboardingComponent/SecondPhase2'
import SecondPhase3 from '../components/OnboardingComponent/SecondPhase3'
import SecondPhase4 from '../components/OnboardingComponent/SecondPhase4'
import ProtectedRoute from '@/components/ProtectedRoute'
import ClassSubject from '@/components/Teachers-Dashboard-Component/ClassSubject'
import AcademicSession from '@/components/Admin-Dashboard-Component/AcademicSesson'
import AcademicReport from '../components/Admin-Dashboard-Component/AcademicReport'
import FinancialReport from '../components/Admin-Dashboard-Component/FinancialReport'
import ReportCard from '../components/Admin-Dashboard-Component/ReportCard'

// import OtpModal from "../components/Login-Component/OtpModal";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Onboarding routes */}
      <Route path="/firstpage" element={<OnboardingPage />} />
      <Route path="/firstphase2" element={<FirstPhase2 />} />
      <Route path="/secondphase1" element={<SecondPhase1 />} />
      <Route path="/secondphase2" element={<SecondPhase2 />} />
      <Route path="/secondphase3" element={<SecondPhase3 />} />
      <Route path="/secondphase4" element={<SecondPhase4 />} />

      {/* Layout */}
      <Route element={<Layout />}>{/* <Route path="hmme" element={<Home />} /> */}</Route>

      {/* Login */}
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/otp" element={<OtpModal />} /> */}

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard-layout" element={<DashboardLayout />} />
        <Route path="/admin/staffmgt" element={<StaffMgt />} />
        <Route path="/admin/staffmgt/staffReg" element={<StaffReg />} />
        <Route path="/admin/studentmgt" element={<StudentMgt />} />
        <Route path="/admin/studentmgt/studentReg" element={<StudentReg />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/session-management" element={<AcademicSession />} />

        <Route path="/admin/session-report" element={<SessionReport />}>
          <Route path="/admin/session-report/academic-report" element={<AcademicReport />} />
          <Route
            path="/admin/session-report/academic-report/report-card/:studentId"
            element={<ReportCard />}
          />
          <Route path="/admin/session-report/financial-report" element={<FinancialReport />} />
        </Route>
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/Tadmin"
        element={
          <ProtectedRoute roles={['teacher', 'admin']}>
            <TeachersDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="/Tadmin/Tdashboard-layout" element={<TdashboardLayout />} />
        <Route path="/Tadmin/result-entry" element={<ResultEntry />} />
        <Route path="/Tadmin/results" element={<Result />} />
        <Route path="/Tadmin/class-subject" element={<ClassSubject />} />
        <Route path="/Tadmin/class-subject" element={<ClassSubject />} />
        <Route path="/Tadmin/results/report-card/:studentId" element={<ReportCard />} />
      </Route>

      {/* Student Routes */}
      <Route path="/Sadmin" element={<StudentDashboard />}>
        <Route path="/Sadmin/Sdashboard-layout" element={<SdashboardLayout />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
