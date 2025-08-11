import { FiLogOut } from "react-icons/fi";
import Input from "../CustomInput";

const ResultEntry = () => {
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

      {/* Result */}
      <div className="flex justify-between items-center">
        <div>Enter Student Result</div>
        <div className="flex gap-4">
          <select className=" border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Select Term</option>

            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
          </select>

          <select className=" border border-gray-300 rounded px-3 py-2 text-sm">
            <option>Class</option>

            <option>JSS 1</option>
            <option>JSS 2</option>
            <option>JSS 3</option>
          </select>
        </div>
      </div>

      {/* Form input */}
      <form className=" p-4">
        <Input label="Student Name" className="w-[50%]" />
        <div className="flex mt-4 ">
          <Input label="Subject" className="w-[30%]" />
          <Input label="Exam" className="w-[30%]" />
        </div>
        <div className="flex mt-4">
          <Input label="Test 1" className="w-[15%]" />
          <Input label="Grade" className="w-[30%]" />
        </div>
        <div className="flex mt-4">
          <Input label="Test 2" className="w-[15%]" />
          <Input label="Total" className="w-[30%]" />
        </div>

        <button
          type="submit"
          className=" block mx-auto mt-6 py-2 px-4 rounded-lg bg-purple-500 hover:bg-purple-800 hover:text-white"
        >
          Enter Result
        </button>
      </form>
    </div>
  );
};

export default ResultEntry;
