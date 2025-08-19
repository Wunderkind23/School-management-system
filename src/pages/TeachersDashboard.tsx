import { Outlet } from 'react-router-dom'
import SidebarSection from '../components/Teachers-Dashboard-Component/SidebarSection'

const TeachersDashboard = () => {
  return (
    <div className="flex">
      <SidebarSection />
      <div className="w-full h-screen overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  )
}

export default TeachersDashboard
