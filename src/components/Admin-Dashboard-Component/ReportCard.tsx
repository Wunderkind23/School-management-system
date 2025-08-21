import React from "react";

interface Subject {
  name: string;
  firstTerm: number;
  midTerm: number;
  secondTerm: number;
  thirdTerm: number;
  annual: number;
  total: number;
  grade: string;
  remark: string;
}

interface StudentInfo {
  name: string;
  class: string;
  session: string;
  term: string;
  admissionNo: string;
  position: string;
  outOf: string;
}

const ReportCard: React.FC = () => {
  const studentInfo: StudentInfo = {
    name: "JOHN DOE",
    class: "JSS 2B",
    session: "2023/2024",
    term: "FIRST TERM",
    admissionNo: "12345",
    position: "5th",
    outOf: "45",
  };

  const subjects: Subject[] = [
    {
      name: "MATHEMATICS",
      firstTerm: 15,
      midTerm: 8,
      secondTerm: 12,
      thirdTerm: 15,
      annual: 50,
      total: 100,
      grade: "A",
      remark: "EXCELLENT",
    },
    {
      name: "ENGLISH LANGUAGE",
      firstTerm: 14,
      midTerm: 7,
      secondTerm: 11,
      thirdTerm: 14,
      annual: 46,
      total: 92,
      grade: "A",
      remark: "EXCELLENT",
    },
    {
      name: "BASIC SCIENCE",
      firstTerm: 13,
      midTerm: 6,
      secondTerm: 10,
      thirdTerm: 13,
      annual: 42,
      total: 84,
      grade: "B",
      remark: "VERY GOOD",
    },
    {
      name: "BASIC TECHNOLOGY",
      firstTerm: 12,
      midTerm: 7,
      secondTerm: 9,
      thirdTerm: 12,
      annual: 40,
      total: 80,
      grade: "B",
      remark: "VERY GOOD",
    },
    {
      name: "COMPUTER STUDIES",
      firstTerm: 14,
      midTerm: 8,
      secondTerm: 11,
      thirdTerm: 14,
      annual: 47,
      total: 94,
      grade: "A",
      remark: "EXCELLENT",
    },
    {
      name: "CIVIC EDUCATION",
      firstTerm: 13,
      midTerm: 6,
      secondTerm: 10,
      thirdTerm: 13,
      annual: 42,
      total: 84,
      grade: "B",
      remark: "VERY GOOD",
    },
    {
      name: "AGRICULTURAL SCIENCE",
      firstTerm: 12,
      midTerm: 7,
      secondTerm: 9,
      thirdTerm: 12,
      annual: 40,
      total: 80,
      grade: "B",
      remark: "VERY GOOD",
    },
    {
      name: "BUSINESS STUDIES",
      firstTerm: 11,
      midTerm: 6,
      secondTerm: 8,
      thirdTerm: 11,
      annual: 36,
      total: 72,
      grade: "C",
      remark: "GOOD",
    },
    {
      name: "CULTURAL & CREATIVE ART",
      firstTerm: 13,
      midTerm: 7,
      secondTerm: 10,
      thirdTerm: 13,
      annual: 43,
      total: 86,
      grade: "B",
      remark: "VERY GOOD",
    },
    {
      name: "FRENCH",
      firstTerm: 10,
      midTerm: 5,
      secondTerm: 7,
      thirdTerm: 10,
      annual: 32,
      total: 64,
      grade: "C",
      remark: "GOOD",
    },
    {
      name: "HISTORY",
      firstTerm: 12,
      midTerm: 6,
      secondTerm: 9,
      thirdTerm: 12,
      annual: 39,
      total: 78,
      grade: "B",
      remark: "VERY GOOD",
    },
    {
      name: "HOME ECONOMICS",
      firstTerm: 14,
      midTerm: 7,
      secondTerm: 11,
      thirdTerm: 14,
      annual: 46,
      total: 92,
      grade: "A",
      remark: "EXCELLENT",
    },
    {
      name: "IGBO LANGUAGE",
      firstTerm: 11,
      midTerm: 6,
      secondTerm: 8,
      thirdTerm: 11,
      annual: 36,
      total: 72,
      grade: "C",
      remark: "GOOD",
    },
    {
      name: "PHYSICAL & HEALTH EDU.",
      firstTerm: 13,
      midTerm: 7,
      secondTerm: 10,
      thirdTerm: 13,
      annual: 43,
      total: 86,
      grade: "B",
      remark: "VERY GOOD",
    },
    {
      name: "SOCIAL STUDIES",
      firstTerm: 12,
      midTerm: 6,
      secondTerm: 9,
      thirdTerm: 12,
      annual: 39,
      total: 78,
      grade: "B",
      remark: "VERY GOOD",
    },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600 font-semibold";
      case "B":
        return "text-blue-600 font-semibold";
      case "C":
        return "text-yellow-600 font-semibold";
      case "D":
        return "text-orange-600 font-semibold";
      case "F":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };

  const totalMarks = subjects.reduce((sum, subject) => sum + subject.total, 0);
  const averageScore = Math.round(totalMarks / subjects.length);

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-2xl">
      {/* Header */}
      <div className="border-4 border-purple-600 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-purple-800 uppercase">
                First Term Progress Report
              </h1>
              <p className="text-purple-600 font-medium">
                Academic Excellence Institute
              </p>
            </div>
          </div>
          <div className="w-20 h-20 bg-purple-600 rounded-lg flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-md flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">PHOTO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Student Information */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Student Information
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{studentInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Class:</span>
              <span className="font-medium">{studentInfo.class}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Admission No:</span>
              <span className="font-medium">{studentInfo.admissionNo}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Academic Period
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Session:</span>
              <span className="font-medium">{studentInfo.session}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Term:</span>
              <span className="font-medium">{studentInfo.term}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Position:</span>
              <span className="font-medium">
                {studentInfo.position} out of {studentInfo.outOf}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grades Table */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Academic Performance
        </h2>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full bg-white border border-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">SUBJECTS</th>
                <th className="px-3 py-3 text-center font-semibold text-sm">
                  1ST TERM
                  <br />
                  (15)
                </th>
                <th className="px-3 py-3 text-center font-semibold text-sm">
                  MID TERM
                  <br />
                  (10)
                </th>
                <th className="px-3 py-3 text-center font-semibold text-sm">
                  2ND TERM
                  <br />
                  (15)
                </th>
                <th className="px-3 py-3 text-center font-semibold text-sm">
                  3RD TERM
                  <br />
                  (15)
                </th>
                <th className="px-3 py-3 text-center font-semibold text-sm">
                  ANNUAL
                  <br />
                  (60)
                </th>
                <th className="px-3 py-3 text-center font-semibold text-sm">
                  TOTAL
                  <br />
                  (100)
                </th>
                <th className="px-3 py-3 text-center font-semibold text-sm">
                  GRADE
                </th>
                <th className="px-4 py-3 text-center font-semibold text-sm">
                  REMARK
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-purple-50 transition-colors`}
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {subject.name}
                  </td>
                  <td className="px-3 py-3 text-center">{subject.firstTerm}</td>
                  <td className="px-3 py-3 text-center">{subject.midTerm}</td>
                  <td className="px-3 py-3 text-center">
                    {subject.secondTerm}
                  </td>
                  <td className="px-3 py-3 text-center">{subject.thirdTerm}</td>
                  <td className="px-3 py-3 text-center font-semibold">
                    {subject.annual}
                  </td>
                  <td className="px-3 py-3 text-center font-bold text-lg">
                    {subject.total}
                  </td>
                  <td
                    className={`px-3 py-3 text-center ${getGradeColor(
                      subject.grade
                    )}`}
                  >
                    {subject.grade}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-medium">
                    {subject.remark}
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
          <p className="text-3xl font-bold">{subjects.length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Total Score</h3>
          <p className="text-3xl font-bold">{totalMarks}</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold mb-2">Average</h3>
          <p className="text-3xl font-bold">{averageScore}%</p>
        </div>
      </div>

      {/* Grading Scale */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Grading Scale
        </h3>
        <div className="grid grid-cols-5 gap-4 text-sm">
          <div className="text-center">
            <span className="font-semibold text-green-600">A:</span> 80-100
            (Excellent)
          </div>
          <div className="text-center">
            <span className="font-semibold text-blue-600">B:</span> 70-79 (Very
            Good)
          </div>
          <div className="text-center">
            <span className="font-semibold text-yellow-600">C:</span> 60-69
            (Good)
          </div>
          <div className="text-center">
            <span className="font-semibold text-orange-600">D:</span> 50-59
            (Fair)
          </div>
          <div className="text-center">
            <span className="font-semibold text-red-600">F:</span> 0-49 (Fail)
          </div>
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

      {/* Footer */}
      <div className="text-center mt-6 pt-4 border-t border-purple-200">
        <p className="text-sm text-purple-600 font-medium">
          Next Term Begins: Monday, 8th January 2024
        </p>
      </div>
    </div>
  );
};

export default ReportCard;
