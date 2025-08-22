/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '@/contexts/AuthContext'
import { useFetchClass } from '@/hooks/global/useFetchClass'
import { useFetchTerm } from '@/hooks/global/useFetchTerm'
import { useDeleteStudentSubjectScore } from '@/hooks/student-management/useDeleteStudentScore'
import { useFetchStudentScore } from '@/hooks/student-management/useFetchStudentScore'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Result = () => {
  const { token } = useAuth()
  const { data, refetch } = useFetchStudentScore(token)
  const { mutate } = useDeleteStudentSubjectScore(token)

  const { data: classData } = useFetchClass(token)
  const { data: termData } = useFetchTerm(token)

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

  const handleDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        toast.success('Student score deleted successfully.')
        refetch()
      },
      onError: (error: any) => {
        // If API sends a custom error message
        console.log(error)
        const message = error?.response?.data?.message || 'Something went wrong. Please try again.'
        toast.error(message)
      },
    })
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
        <button className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
          <FiLogOut className="mr-2" /> Logout
        </button>
      </div>

      <div className="flex justify-between items-center">
        {/* <div>Enter Student Result</div> */}
        <div className="flex gap-4 justify-end w-full">
          <select
            onChange={(e) => setTerm(e.target.value)}
            className=" border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option>Select Term</option>
            {termData?.map((term) => {
              return (
                <option key={term.id} value={term.id}>
                  {term.name}
                </option>
              )
            })}

            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
          </select>

          <select
            onChange={(e) => setClassRoom(e.target.value)}
            className=" border border-gray-300 rounded px-3 py-2 text-sm"
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
      <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Continuos Assessment</th>
              <th className="px-4 py-2">Exam</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Grade</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map((student, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-4 py-2">
                  {student?.student?.firstName} {student?.student?.surname}
                </td>
                <td className="px-4 py-2">{student.studentId}</td>
                <td className="px-4 py-2">{student.contAssessment}</td>
                <td className="px-4 py-2">{student.examScore}</td>
                <td className="px-4 py-2">{student.total}</td>
                <td className="px-4 py-2">{student.grade}</td>

                <td className="px-4 py-2">
                  <Popover>
                    <PopoverTrigger>⋯</PopoverTrigger>
                    <PopoverContent className="bg-red">
                      <div className="gap-2 bg-white p-2 flex shadow-sm rounded-sm">
                        <button
                          onClick={() => {
                            handleDelete(student.id)
                          }}
                          className="py-1 px-2 font-bold text-white border rounded-sm bg-red-600 text-[7px]"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            goToReport(student.id)
                            // handleDeactivateStaff(staff.
                          }}
                          className="py-1 px-2 font-bold text-white border rounded-sm bg-green-600 text-[7px] "
                        >
                          Generate Report
                        </button>
                        {/* // TODO: ASSIGN ROLE TO BE FIXED */}
                        {/* <button className="py-3 px-3 font-bold text-black border rounded-lg border-[#9D0E9E]">
                          Assign Role
                        </button> */}
                      </div>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Result
