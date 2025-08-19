import { Outlet } from "react-router-dom";
import SidebarSection from "../components/Student-Dashboard-Component/SidebarSection";
const StudentDashboard = () => {
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

export default StudentDashboard;
