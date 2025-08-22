import useAuth from '@/contexts/AuthContext'
import { useFetchStudentReport } from '@/hooks/student-management/useFetchReport'
import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReportCardLoading from './student-report/Loading'
import { useReactToPrint } from 'react-to-print'

const gradeDescriptions = [
  { grade: 'A1', range: '75-100', description: 'Excellent', color: 'text-green-600' },
  { grade: 'B2', range: '70-74', description: 'Very Good', color: 'text-blue-600' },
  { grade: 'B3', range: '65-69', description: 'Very Good', color: 'text-blue-600' },
  { grade: 'C4', range: '60-64', description: 'Good', color: 'text-yellow-600' },
  { grade: 'C5', range: '55-59', description: 'Good', color: 'text-yellow-600' },
  { grade: 'C6', range: '50-54', description: 'Good', color: 'text-yellow-600' },
  { grade: 'D7', range: '45-49', description: 'Fair', color: 'text-orange-600' },
  { grade: 'E8', range: '40-44', description: 'Poor', color: 'text-red-600' },
  { grade: 'F9', range: '0-39', description: 'Fail', color: 'text-red-600' },
]

const ReportCard: React.FC = () => {
  const { token, user } = useAuth()
  const { studentId: id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)

  const studentId = Number(id)
  const termId = Number(queryParams.get('termId'))
  const classId = Number(queryParams.get('classId'))

  const query = { studentId, termId, classId }

  const { data, isPending, error } = useFetchStudentReport(query, token)

  const contentRef = useRef<HTMLDivElement>(null)
  const reactToPrintFn = useReactToPrint({ contentRef })

  useEffect(() => {
    if (error) {
      const message = error['response']?.data.message

      if (user.role === 'admin') {
        navigate('/admin/session-report')
      }

      if (user.role === 'teacher') {
        navigate('/Tadmin/result-entry')
      }

      if (user.role === 'student') {
        navigate('/Sadmin/Sdashboard-layout')
      }

      toast.error(message)
    }
  }, [termId, classId, studentId, isPending])

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A1':
        return 'text-green-600 font-semibold'
      case 'B2':
      case 'B3':
        return 'text-blue-600 font-semibold'
      case 'C4':
      case 'C5':
      case 'C6':
        return 'text-yellow-600 font-semibold'
      case 'D7':
        return 'text-orange-600 font-semibold'
      case 'E8':
      case 'F9':
        return 'text-red-600 font-semibold'
      default:
        return 'text-gray-600'
    }
  }

  if (isPending) {
    return <ReportCardLoading />
  }

  if (!data) {
    return <div>No report found</div>
  }

  return (
    <>
      <div ref={contentRef} className="max-w-4xl mx-auto bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="border-4 border-purple-600 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-purple-800 uppercase">
                  {data?.sessionInfo.name} Progress Report
                </h1>
                <p className="text-purple-600 font-medium">Academic Excellence Institute</p>
              </div>
            </div>

            {/* <div className="w-20 h-20 bg-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">PHOTO</span>
            </div>
          </div> */}
          </div>
        </div>

        {/* Student Information */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Student Information</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium">
                  {data?.student?.surname} {data?.student?.firstName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-medium">{data?.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Admission No:</span>
                <span className="font-medium">{data?.student?.admissionNumber}</span>
              </div>
            </div>
          </div>

          {/* Academic records */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Academic Period</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Session:</span>
                <span className="font-medium">{data?.sessionInfo?.academicSession?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Term:</span>
                <span className="font-medium">{data?.sessionInfo?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Position:</span>
                <span className="font-medium">{data?.studentPosition}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Performance</h2>
          <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full bg-white border border-gray-200">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">SUBJECTS</th>
                  <th className="px-3 py-3 text-center font-semibold text-sm">CA</th>
                  <th className="px-3 py-3 text-center font-semibold text-sm">Exam</th>
                  <th className="px-3 py-3 text-center font-semibold text-sm">GRADE</th>
                  <th className="px-3 py-3 text-center font-semibold text-sm">POSITION</th>
                  <th className="px-3 py-3 text-center font-semibold text-sm">HIGHEST</th>
                  <th className="px-3 py-3 text-center font-semibold text-sm">LOWEST</th>
                  <th className="px-4 py-3 text-center font-semibold text-sm">CLASS AVERAGE</th>
                </tr>
              </thead>
              <tbody>
                {data?.academics.map((academic, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    } hover:bg-purple-50 transition-colors`}
                  >
                    <td className="px-3 py-3 text-center">{academic.subject}</td>
                    <td className="px-3 py-3 text-center">{academic.ca}</td>
                    <td className="px-3 py-3 text-center">{academic.exam}</td>
                    <td className={`px-3 py-3 text-center ${getGradeColor(academic.grade)}`}>
                      {academic.grade}
                    </td>
                    <td className="px-3 py-3 text-center">{academic.position}</td>
                    <td className="px-3 py-3 text-center font-semibold">{academic.highestScore}</td>
                    <td className="px-3 py-3 text-center font-bold text-lg">
                      {academic.lowestScore}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-medium">
                      {data?.classAverage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Total Subjects</h3>
            <p className="text-3xl font-bold">{data?.totalSubject}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Total Score</h3>
            <p className="text-3xl font-bold">{data?.totalScore}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Average</h3>
            <p className="text-3xl font-bold">{data?.studentAverage}%</p>
          </div>
        </div>

        {/* Grading Scale */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Grading Scale</h3>
          <div className="grid grid-cols-3 gap-4 text-sm justify-start">
            {gradeDescriptions.map(({ grade, range, description, color }) => (
              <div key={grade} className="">
                <span className={`font-semibold ${color}`}>{grade}:</span> {range} ({description})
              </div>
            ))}
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 pb-8"></div>
            <p className="text-sm font-semibold">CLASS TEACHER</p>
          </div>
          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 pb-8"></div>
            <p className="text-sm font-semibold">PRINCIPAL</p>
          </div>
          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 pb-8"></div>
            <p className="text-sm font-semibold">PARENT/GUARDIAN</p>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="text-center mt-6 pt-4 border-t border-purple-200">
        <p onClick={reactToPrintFn} className="text-sm cursor-pointer text-purple-600 font-medium">
          Print Result
        </p>
      </div>
    </>
  )
}

export default ReportCard
