import classImg from '../../assets/fonts/classImg.png'
import Pending from '../../assets/fonts/Pending.png'
import subject from '../../assets/fonts/subject.png'
import useAuth from '@/contexts/AuthContext'
import { useFetchTeacherDashboard } from '@/hooks/dashboard/useFetchTeacherDashboard'
import LogoutBtn from '../Logout'

const TdashboardLayout = () => {
  const { token, user } = useAuth()
  const { data, isPending } = useFetchTeacherDashboard(user?.id, token)

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
        <LogoutBtn />
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {isPending ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="My Class"
              value={data?.classRoom.name}
              img={<img src={classImg} alt="Classes" className="w-12 h-12" />}
            />
            <StatCard
              title="Subjects Assigned"
              value={subjectList}
              img={<img src={subject} alt="Subjects" className="w-12 h-12" />}
            />
            <StatCard
              title="Pending Results"
              value="0"
              img={<img src={Pending} alt="Classes" className="w-12 h-12" />}
            />
          </>
        )}
      </div>

      {/* Middle Section */}
      {/* Recent Activities */}
      <div className="bg-white shadow rounded-lg p-4 h-full">
        <h2 className="font-semibold text-lg mb-4">Recent Activities</h2>
        <ul className="space-y-2 text-sm">
          {isPending
            ? Array.from({ length: 5 }).map((_, i) => <ActivitySkeleton key={i} />)
            : data?.activities.map((activity) => (
                <li key={activity.id}>✅ {activity.description}</li>
              ))}
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

export const StatCardSkeleton = () => (
  <div className="bg-white shadow space-y-4 rounded-lg p-4 text-center animate-pulse">
    <div className="flex justify-center items-center gap-2">
      <div className="w-12 h-12 bg-gray-200 rounded" />
      <div className="h-4 w-20 bg-gray-200 rounded" />
    </div>
    <div className="h-5 w-16 mx-auto bg-gray-200 rounded" />
  </div>
)

export const ActivitySkeleton = () => (
  <li className="flex items-center gap-2">
    <div className="h-4 w-4 bg-gray-200 rounded-full" />
    <div className="h-4 w-40 bg-gray-200 rounded" />
  </li>
)
