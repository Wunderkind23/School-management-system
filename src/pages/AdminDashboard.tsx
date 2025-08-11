import { Outlet } from "react-router-dom";
// import DashboardLayout from "../components/Admin-Dashboard-Component/DashboardLayout";
import SidebarSection from "../components/Admin-Dashboard-Component/SidebarSection";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <SidebarSection />
      <div className="w-full h-screen overflow-y-scroll">
        <Outlet />
        {/* <DashboardLayout /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
