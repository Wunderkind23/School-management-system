/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '@/contexts/AuthContext'
import { useDeleteStudent } from '@/hooks/student-management/useDeleteStudent'
import { useFetchStudent } from '@/hooks/student-management/userFetchStudent'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { FiLoader } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { PromoteModal } from './modal/PromoteModal'
import { toast } from 'react-toastify'
import { useState } from 'react'

const StudentMgt = () => {
  const { token } = useAuth()
  const { data, refetch } = useFetchStudent(token)
  const { mutate: mutateStudent, isPending } = useDeleteStudent(token)

  const [isPromoteOpen, setIsPromoteOpen] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null)

  const openPromoteModal = (id: number) => {
    setSelectedStudentId(id)
    setIsPromoteOpen(true)
  }

  const handleDeleteStudent = (id: number) => {
    mutateStudent(id, {
      onSuccess: () => {
        toast.success('Student Deleted Successfully')
        refetch()
      },
      onError: (error: any) => {
        const message = error?.response?.data?.message || 'Something went wrong. Please try again.'
        toast.error(message)
      },
    })
  }

  return (
    <div className="p-4 bg-pink-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex w-[60%] items-center gap-2 relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-1 rounded-full border border-gray-300 w-full text-sm focus:outline-none"
          />
          <span className="absolute  right-4 text-gray-400 text-xs">🔍</span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/30"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* Add Staff Button */}
      <Link to="/admin/studentmgt/studentReg">
        <div className="flex justify-end mb-4">
          <button className="bg-pink-100 border border-pink-300 px-3 py-1 rounded text-sm hover:bg-pink-200">
            Add New Student
          </button>
        </div>
      </Link>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Gender</th>
              {/* <th className="px-4 py-2">Email</th> */}
              {/* <th className="px-4 py-2">Last login</th> */}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.result?.map((student, index) => (
              <tr
                key={index}
                className={`${student ? 'bg-white' : 'bg-red-100'}`}
                // className={`border ${staff.isActive ? ' border-white' : 'border border-red-500'}`}
              >
                <td className="px-4 py-2">
                  {student.surname} {student.firstName}
                </td>
                <td className="px-4 py-2">{student.gender}</td>
                {/* <td className="px-4 py-2">{student.email}</td> */}
                {/* <td className="px-4 py-2">{student.employeeNumber}</td> */}
                <td className="px-4 py-2">
                  <Popover>
                    <PopoverTrigger>⋯</PopoverTrigger>
                    <PopoverContent className="bg-red">
                      <div className="gap-2 bg-white p-2 flex shadow-sm rounded-sm">
                        <button
                          onClick={() => openPromoteModal(student.id)}
                          className="py-1 px-2 font-bold text-white rounded-sm bg-green-600 text-[7px]"
                        >
                          Promote
                        </button>
                        <button
                          onClick={() => {
                            handleDeleteStudent(student.id)
                          }}
                          className="py-1 px-2 font-bold text-white border rounded-sm bg-red-600 text-[7px] "
                        >
                          {isPending ? <FiLoader /> : 'Delete'}
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

      {/* Promote Modal */}
      <PromoteModal open={isPromoteOpen} setOpen={setIsPromoteOpen} studentId={selectedStudentId} />
    </div>
  )
}

export default StudentMgt
