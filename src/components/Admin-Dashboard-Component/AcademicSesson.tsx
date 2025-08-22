/* eslint-disable @typescript-eslint/no-explicit-any */
import { FiLogOut } from 'react-icons/fi'
import AcademicSessionForm from './academic-session/AcademicSessionForm'
import TermForm from './academic-session/TermForm'
import AcademicSessionTable from './academic-session/AcademicSessionTable'

const AcademicSession = () => {
  return (
    <div
      className="min-h-screen bg-gray-50 p-4 font-sans w-full
    "
    >
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

      {/* Result */}

      {/* Form input */}
      <div className="flex justify-between gap-50 my-10">
        <AcademicSessionForm />
        <TermForm />
      </div>

      {/* Table */}
      <div className="w-full  rounded-lg ">
        <AcademicSessionTable />
      </div>
    </div>
  )
}

export default AcademicSession
