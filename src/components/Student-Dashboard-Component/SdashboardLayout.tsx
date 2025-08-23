import useAuth from '@/contexts/AuthContext'
import { useFetchSingleStudent } from '@/hooks/student-management/useFetchSingleStudent'
import { useNavigate } from 'react-router-dom'
import LogoutBtn from '../Logout'
import { useFetchStudentScoreLatest } from '@/hooks/student-management/useFetchStudentScoreLatest'
import { toast } from 'react-toastify'

const SdashboardLayout = () => {
  const { token, user } = useAuth()
  const { data } = useFetchSingleStudent(user?.id, token)
  const { data: score } = useFetchStudentScoreLatest(user?.id, token)
  const navigate = useNavigate()

  const handleViewResult = () => {
    console.log(score)

    if (!score) {
      toast.error('No result was found for you, contact your teacher')
      return
    }

    navigate(`/Sadmin/report-card/${user?.id}?termId=${score?.termId}&classId=${score?.classId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans w-full">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2 w-2/3 focus:outline-none "
        />
        <LogoutBtn />
      </div>

      <div className="flex gap-4 items-center">
        <div className="shadow w-[200px] h-[200px] rounded-md overflow-hidden">
          <img
            className="w-full h-full"
            src="https://img.freepik.com/premium-vector/student-icon_159242-32825.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
          />
        </div>
        <ul>
          <li>
            {data?.surname} {data?.firstName}
          </li>
          <li>{data?.class?.name}</li>
          <li>{data?.gender}</li>
        </ul>
      </div>
      <div className="flex justify-center gap-10 mt-10">
        <button
          onClick={handleViewResult}
          className="py-3 px-10 border text-white rounded-md bg-purple-500 hover:bg-purple-800"
        >
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
