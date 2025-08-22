import React, { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useFetchDashboard } from '@/hooks/dashboard/useFetchDashboard'
import useAuth from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
  const { token } = useAuth()
  const { data } = useFetchDashboard(token)
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const activities = data?.activities.rows || []

  // Calculate total pages
  const totalPages = Math.ceil(activities.length / itemsPerPage)

  // Get current page items
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentActivities = activities.slice(startIndex, startIndex + itemsPerPage)

  // Handler for changing pages
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const testLabels = Array.from(
    { length: data?.scoreFormula.numberOfAssessment },
    (_, i) => `Test${i + 1}`,
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans w-full">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-2/3 focus:outline-none "
        />
        <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <StatCard title="Total Number of Students" value={data?.totalStudent} />
        <StatCard title="Total Number of Teachers" value={data?.totalTeachers} />
        <StatCard title="Total Number of Bursars" value={data?.totalBursars} />
        <StatCard title="Pending Results" value={0} />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Recent Activities */}
        {/* <div className="bg-white shadow rounded-lg p-4 h-full">
          <h2 className="font-semibold text-lg mb-4">Recent Activities</h2>
          <ul className="space-y-2 text-sm">
            {data?.activities.rows.map((activity) => {
              return <li key={activity.id}>✔️ {activity.description}</li>
            })}
          </ul>
        </div> */}

        <div className="bg-white shadow rounded-lg p-4 h-full min-h-[250px] justify-between flex flex-col">
          <div>
            <h2 className="font-semibold text-lg mb-4">Recent Activities</h2>
            <ul className="space-y-2 text-sm">
              {currentActivities.map((activity) => (
                <li key={activity.id}>✔️ {activity.description}</li>
              ))}
            </ul>
          </div>

          {/* Pagination buttons */}
          <div className="flex mt-4 space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 rounded bg-purple-500 text-white  disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-3 text-sm rounded border ${
                    pageNum === currentPage ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 rounded  bg-purple-500 text-sm text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white shadow rounded-lg p-4 h-full flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-lg mb-4">Statistics</h2>
            <div className="flex justify-center">
              {/* Circle chart placeholder */}
              <div className="w-24 h-24 rounded-full border-8 border-purple-400 flex items-center justify-center text-xs">
                Students
              </div>
            </div>
          </div>
          <div className="flex justify-around mt-4 text-sm">
            <span>🟣 {data?.totalFemaleStudent} Female</span>
            <span>🔴 {data?.totalMaleStudent} Males</span>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <button
          onClick={() => {
            navigate('/admin/studentmgt/studentReg')
          }}
          className="bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600"
        >
          Add New Student
        </button>
        <button
          onClick={() => {
            navigate('/admin/studentmgt')
          }}
          className="bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
        >
          Promote Student
        </button>
        <button
          onClick={() => {
            navigate('/admin/session-report')
          }}
          className="bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
        >
          View Reports
        </button>
      </div>

      {/* Grading System */}
      <div className="bg-white shadow rounded-lg p-4 flex justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-5">Grading System</h2>
          <div className="flex justify-between text-sm ">
            <div className="grid grid-cols-5 justify-between gap-x-10 gap-y-5">
              {data?.gradingSystem.map((grade) => {
                return (
                  <p key={grade.id}>
                    {grade.grade}: {grade.lowerRange} - {grade.upperRange}
                  </p>
                )
              })}
            </div>
          </div>
        </div>

        <div className=" self-start  items-end flex flex-col">
          <h2 className="font-semibold text-lg mb-4">Total score formula:</h2>

          <p className="mb-3">Total = {testLabels.join(' + ')} + Exam + Total</p>

          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-purple-600">
            Update Formula
          </button>
        </div>
      </div>
    </div>
  )
}

// Reusable stat card
interface StatCardProps {
  title: string
  value: number
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-white shadow rounded-lg p-4 text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
)
export default DashboardLayout
