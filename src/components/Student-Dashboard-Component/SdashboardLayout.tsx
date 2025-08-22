import useAuth from '@/contexts/AuthContext'
import { useFetchSingleStudent } from '@/hooks/student-management/useFetchSingleStudent'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'
import { useFetchAllTerms } from '@/hooks/global/useFetchAllTerms'
import LogoutBtn from '../Logout'

const SdashboardLayout = () => {
  const { token, user } = useAuth()
  const { data } = useFetchSingleStudent(user?.id, token)
  const { data: termData, refetch } = useFetchAllTerms(token)
  const navigate = useNavigate()

  const handleViewResult = () => {
    refetch()

    const today = moment()

    const currentTerm = termData.find((term) =>
      today.isBetween(moment(term.startDate), moment(term.endDate)),
    )

    if (!currentTerm) {
      toast.error('No active term as of now')
      return
    }

    const termId = currentTerm.id

    const { id, classId } = user

    if (!termId) {
      toast.error('Please select a term')
      return
    }

    if (!classId) {
      toast.error('Please select a classroom')
      return
    }

    navigate(`/Sadmin/report-card/${id}?termId=${termId}&classId=${classId}`)
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
