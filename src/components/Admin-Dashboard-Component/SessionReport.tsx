import { Link, Outlet, useLocation } from 'react-router-dom'
import LogoutBtn from '../Logout'

const SessionReport = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans w-full">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-2/3 focus:outline-none shadow-sm"
        />

        <LogoutBtn />
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          to="academic-report"
          className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition ${
            location.pathname.includes('academic-reports')
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Academic Reports
        </Link>
        <Link
          to="financial-report"
          className={`px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition ${
            location.pathname.includes('financial-reports')
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Financial Reports
        </Link>
      </div>

      {/* Dynamic Content */}
      <Outlet />
    </div>
  )
}

export default SessionReport
