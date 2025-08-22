import useAuth from '@/contexts/AuthContext'
import { useFetchAllTerms } from '@/hooks/global/useFetchAllTerms'
import { useFetchClass } from '@/hooks/global/useFetchClass'
import { useFetchStudent } from '@/hooks/student-management/userFetchStudent'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import TableSkeleton from '../TableLoading'

const AcademicReport: React.FC = () => {
  const { token } = useAuth()
  const { data, isPending } = useFetchStudent(token)
  const { data: classData } = useFetchClass(token)
  const { data: termData } = useFetchAllTerms(token)

  const [term, setTerm] = useState('')
  const [classRoom, setClassRoom] = useState('')
  const navigate = useNavigate()

  const goToReport = (id: number) => {
    if (!term) {
      toast.error('Please select a term')
      return
    }

    if (!classRoom) {
      toast.error('Please select a classroom')
      return
    }

    navigate(`report-card/${id}?termId=${term}&classId=${classRoom}`)
  }

  return (
    <div className="py-6">
      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-semibold text-lg">View Student Result</h2>
        <div className="flex gap-4">
          <select
            onChange={(e) => setTerm(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
          >
            <option>Select Term</option>
            {termData?.map((term) => {
              return (
                <option key={term.id} value={term.id}>
                  {term.name}
                </option>
              )
            })}
          </select>
          <select
            onChange={(e) => setClassRoom(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm"
          >
            <option>Class</option>
            {classData?.map((classRoom) => {
              return (
                <option value={classRoom.id} key={classRoom.id}>
                  {classRoom.name}
                </option>
              )
            })}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-100 text-left text-gray-700 text-sm font-semibold">
              <th className="py-3 px-4 border-b">Student Name</th>
              <th className="py-3 px-4 border-b">Gender</th>
              <th className="py-3 px-4 border-b text-center">Action</th>
            </tr>
          </thead>

          {isPending ? (
            <TableSkeleton />
          ) : (
            <tbody>
              {data?.result.map((student, index) => (
                <tr
                  key={index}
                  className={`text-sm ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-purple-50`}
                >
                  <td className="py-3 px-4 border-b">
                    {student.firstName} {student.surname}
                  </td>
                  <td className="py-3 px-4 border-b">{student.gender}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      onClick={() => {
                        goToReport(student.id)
                      }}
                      className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default AcademicReport
