import { FiLogOut } from 'react-icons/fi'
import classImg from '../../assets/fonts/classImg.png'
import Pending from '../../assets/fonts/Pending.png'
import sessionlogo from '../../assets/fonts/sessionlogo.png'
import useAuth from '@/contexts/AuthContext'
import { useFetchTeacherDashboard } from '@/hooks/dashboard/useFetchTeacherDashboard'

const TdashboardLayout = () => {
  const { token } = useAuth()
  const { data } = useFetchTeacherDashboard(token)

  const subjectList = data?.allSubjects.map((subject) => subject.name).join(', ')

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
      <div className="grid grid-cols-3 gap-4 mb-4">
        <StatCard
          title="My Class"
          value={data?.classRoom.name}
          img={<img src={classImg} alt="Classes" className="w-12 h-12" />}
        />
        <StatCard
          title="Subjects Assigned"
          value={subjectList}
          img={<img src={sessionlogo} alt="Subjects" className="w-12 h-12" />}
        />
        <StatCard
          title="Pending Results"
          value="6"
          img={<img src={Pending} alt="Classes" className="w-12 h-12" />}
        />
      </div>

      {/* Middle Section */}
      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg p-4 h-full">
        <h2 className="font-semibold text-lg mb-4">Recent Activities</h2>
        <ul className="space-y-2 text-sm">
          {data?.activities.map((activity) => {
            return <li key={activity.id}>✅ {activity.description}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

//Reusable stat card
interface StatCardProps {
  title: string
  value: string
  img: React.ReactNode // can be <img>, an icon, SVG, etc
}

const StatCard: React.FC<StatCardProps> = ({ title, value, img }) => (
  <div className="bg-white shadow space-y-4 rounded-lg p-4 text-center">
    <div className="flex justify-center items-center gap-2">
      <div>{img}</div>
      <p className="text-gray-500 text-sm font-semibold">{title}</p>
    </div>
    <p className="text-lg">{value}</p>
  </div>
)

export default TdashboardLayout
