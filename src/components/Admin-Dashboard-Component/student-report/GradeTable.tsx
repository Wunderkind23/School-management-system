// const GradeTable = () => {
//   return (
//     <div className="mb-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Academic Performance</h2>
//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="w-full bg-white border border-gray-200">
//           <thead className="bg-purple-600 text-white">
//             <tr>
//               <th className="px-4 py-3 text-left font-semibold">SUBJECTS</th>
//               <th className="px-3 py-3 text-center font-semibold text-sm">
//                 1ST TERM
//                 <br />
//                 (15)
//               </th>
//               <th className="px-3 py-3 text-center font-semibold text-sm">
//                 MID TERM
//                 <br />
//                 (10)
//               </th>
//               <th className="px-3 py-3 text-center font-semibold text-sm">
//                 2ND TERM
//                 <br />
//                 (15)
//               </th>
//               <th className="px-3 py-3 text-center font-semibold text-sm">
//                 3RD TERM
//                 <br />
//                 (15)
//               </th>
//               <th className="px-3 py-3 text-center font-semibold text-sm">
//                 ANNUAL
//                 <br />
//                 (60)
//               </th>
//               <th className="px-3 py-3 text-center font-semibold text-sm">
//                 TOTAL
//                 <br />
//                 (100)
//               </th>
//               <th className="px-3 py-3 text-center font-semibold text-sm">GRADE</th>
//               <th className="px-4 py-3 text-center font-semibold text-sm">REMARK</th>
//             </tr>
//           </thead>
//           <tbody>
//             {subjects.map((subject, index) => (
//               <tr
//                 key={index}
//                 className={`border-b ${
//                   index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
//                 } hover:bg-purple-50 transition-colors`}
//               >
//                 <td className="px-4 py-3 font-medium text-gray-800">{subject.name}</td>
//                 <td className="px-3 py-3 text-center">{subject.firstTerm}</td>
//                 <td className="px-3 py-3 text-center">{subject.midTerm}</td>
//                 <td className="px-3 py-3 text-center">{subject.secondTerm}</td>
//                 <td className="px-3 py-3 text-center">{subject.thirdTerm}</td>
//                 <td className="px-3 py-3 text-center font-semibold">{subject.annual}</td>
//                 <td className="px-3 py-3 text-center font-bold text-lg">{subject.total}</td>
//                 <td className={`px-3 py-3 text-center ${getGradeColor(subject.grade)}`}>
//                   {subject.grade}
//                 </td>
//                 <td className="px-4 py-3 text-center text-sm font-medium">{subject.remark}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default GradeTable
