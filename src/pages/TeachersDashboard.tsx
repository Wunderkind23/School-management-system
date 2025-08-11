import { Outlet } from "react-router-dom";
// import DashboardLayout from "../components/Admin-Dashboard-Component/DashboardLayout";
import SidebarSection from "../components/Teachers-Dashboard-Component/SidebarSection";
// import TdashboardLayout from "../components/Teachers-Dashboard-Component/TdashboardLayout";

const TeachersDashboard = () => {
  return (
    <div className="flex">
      <SidebarSection />
      <div className="w-full h-screen overflow-y-scroll">
        <Outlet />
        {/* <TdashboardLayout /> */}
      </div>
    </div>
  );
};

export default TeachersDashboard;
