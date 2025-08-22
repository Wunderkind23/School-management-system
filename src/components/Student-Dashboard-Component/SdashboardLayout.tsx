import useAuth from '@/contexts/AuthContext'
import { useFetchSingleStudent } from '@/hooks/student-management/useFetchSingleStudent'
import { FiLogOut } from 'react-icons/fi'

const SdashboardLayout = () => {
  const { token, user } = useAuth()
  const { data } = useFetchSingleStudent(user.id, token)

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

      <div className="flex gap-4 items-center">
        <div className="border w-[200px] h-[200px] rounded-md"></div>
        <ul>
          <li>
            {data?.surname} {data?.firstName}
          </li>
          <li>{data?.class?.name}</li>
          <li>{data?.gender}</li>
        </ul>
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <button className="py-3 px-10 border text-white rounded-md bg-purple-500 hover:bg-purple-800">
          View Result
        </button>
        <button className="py-3 px-10 border text-white rounded-md bg-[#1c7402] hover:bg-[#49E21A]">
          {' '}
          View Result
        </button>
      </div>
    </div>
  )
}

export default SdashboardLayout
