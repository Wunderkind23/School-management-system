import React from "react";
import { Link } from "react-router-dom";

interface Student {
  name: string;
  gender: string;
  average: number;
  grade: string;
}

const AcademicReport: React.FC = () => {
  const students: Student[] = [
    { name: "Abraham Jane Sim", gender: "Female", average: 70.6, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 71.6, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 71.5, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 70.5, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 70.8, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 71.6, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 71.5, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 70.5, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 70.8, grade: "A" },
    { name: "Abraham Jane Sim", gender: "Female", average: 71.0, grade: "A" },
  ];

  return (
    <div className="py-6">
      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-gray-700 font-semibold text-lg">
          Enter Student Result
        </h2>
        <div className="flex gap-4">
          <select className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm">
            <option>Select Term</option>
            <option>1st</option>
            <option>2nd</option>
            <option>3rd</option>
          </select>
          <select className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm">
            <option>Class</option>
            <option>JSS 1</option>
            <option>JSS 2</option>
            <option>JSS 3</option>
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
              <th className="py-3 px-4 border-b">Class Average</th>
              <th className="py-3 px-4 border-b">Grade</th>
              <th className="py-3 px-4 border-b text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className={`text-sm ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-purple-50`}
              >
                <td className="py-3 px-4 border-b">{student.name}</td>
                <td className="py-3 px-4 border-b">{student.gender}</td>
                <td className="py-3 px-4 border-b">{student.average}</td>
                <td className="py-3 px-4 border-b">{student.grade}</td>
                <td className="py-3 px-4 border-b text-center">
                  <button className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition text-xs">
                    <Link to="report-card">View</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicReport;
