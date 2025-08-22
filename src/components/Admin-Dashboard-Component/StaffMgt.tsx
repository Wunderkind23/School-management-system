/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuth from '@/contexts/AuthContext'
import { useDeactivateStaff } from '@/hooks/staff-management/useDeactivateStaff'
import { useFetchStaff } from '@/hooks/staff-management/userFetchStaff'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import LogoutBtn from '../Logout'
import TableSkeleton from '../TableLoading'

const StaffMgt = () => {
  const { token } = useAuth()
  const { data, refetch, isPending } = useFetchStaff(token)
  const { mutate } = useDeactivateStaff(token)

  const handleDeactivateStaff = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        toast.success('Staff Deactivated Successfully')
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
          <LogoutBtn />
        </div>
      </div>

      {/* Add Staff Button */}
      <Link to="/admin/staffmgt/staffReg">
        <div className="flex justify-end mb-4">
          <button className="bg-pink-100 border border-pink-300 px-3 py-1 rounded text-sm hover:bg-pink-200">
            Add New Staff
          </button>
        </div>
      </Link>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Email</th>
              {/* <th className="px-4 py-2">Employee Number</th> */}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>

          {isPending ? (
            <TableSkeleton rows={4} cols={4} />
          ) : (
            <tbody>
              {data?.result?.map((staff, index) => (
                <tr
                  key={index}
                  className={`${staff.isActive ? 'bg-white' : 'bg-red-100'}`}
                  // className={`border ${staff.isActive ? ' border-white' : 'border border-red-500'}`}
                >
                  <td className="px-4 py-2">{staff.fullName}</td>
                  <td className="px-4 py-2">{staff.role}</td>
                  <td className="px-4 py-2">{staff.email}</td>
                  {/* <td className="px-4 py-2">{staff.employeeNumber}</td> */}
                  <td className="px-4 py-2">
                    <Popover>
                      <PopoverTrigger>⋯</PopoverTrigger>
                      <PopoverContent className="bg-red">
                        <div className="gap-2 bg-white p-2 flex shadow-sm rounded-sm">
                          <button className="py-1 px-2 font-bold text-black border rounded-sm border-[#9D0E9E] text-[7px]">
                            View
                          </button>
                          <button
                            onClick={() => {
                              handleDeactivateStaff(staff.id)
                            }}
                            className="py-1 px-2 font-bold text-white border rounded-sm bg-red-600 text-[7px] "
                          >
                            Deactivate
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
          )}
        </table>
      </div>
    </div>
  )
}

export default StaffMgt
