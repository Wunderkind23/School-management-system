import { FiLogOut } from "react-icons/fi";

type Student = {
  studentName: string;
  Test1: number;
  Test2: number;
  Exam: number;
  Total: number;
  Grade: string;
};

const studentList: Student[] = [
  {
    studentName: "Paul David",
    Test1: 10,
    Test2: 20,
    Exam: 40,
    Total: 70,
    Grade: "B",
  },
  {
    studentName: "Emeka Johnson",
    Test1: 18,
    Test2: 12,
    Exam: 55,
    Total: 85,
    Grade: "A",
  },
];

const Result = () => {
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

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-gray-200">
            <tr>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Test 1</th>
              <th className="px-4 py-2">Test 2</th>
              <th className="px-4 py-2">Exam</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((staff, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-4 py-2">{staff.studentName}</td>
                <td className="px-4 py-2">{staff.Test1}</td>
                <td className="px-4 py-2">{staff.Test2}</td>
                <td className="px-4 py-2">{staff.Exam}</td>
                <td className="px-4 py-2">{staff.Total}</td>
                <td className="px-4 py-2">{staff.Grade}</td>
                <td className="px-4 py-2">⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
