import React from 'react'
import { motion } from 'framer-motion'

const ReportCardLoading: React.FC = () => {
  const shimmer = 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-2xl rounded-lg">
      <div className="animate-pulse space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center space-x-4">
          <div className={`w-16 h-16 rounded-full ${shimmer} bg-gray-200`}></div>
          <div>
            <div className={`h-5 w-48 mb-2 rounded ${shimmer}`}></div>
            <div className={`h-4 w-32 rounded ${shimmer}`}></div>
          </div>
        </div>

        {/* Student info skeleton */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className={`h-4 w-28 rounded ${shimmer}`}></div>
            <div className={`h-4 w-40 rounded ${shimmer}`}></div>
            <div className={`h-4 w-36 rounded ${shimmer}`}></div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className={`h-4 w-28 rounded ${shimmer}`}></div>
            <div className={`h-4 w-36 rounded ${shimmer}`}></div>
            <div className={`h-4 w-32 rounded ${shimmer}`}></div>
          </div>
        </div>

        {/* Table skeleton */}
        <div>
          <div className={`h-6 w-48 mb-4 rounded ${shimmer}`}></div>
          <table className="w-full border border-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                {[
                  'SUBJECTS',
                  'CA',
                  'Exam',
                  'GRADE',
                  'POSITION',
                  'HIGHEST',
                  'LOWEST',
                  'CLASS AVERAGE',
                ].map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left text-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((row) => (
                <tr key={row} className="border-b">
                  {Array(5)
                    .fill(0)
                    .map((_, col) => (
                      <td key={col} className="px-3 py-3">
                        <div className={`h-4 w-20 rounded ${shimmer}`}></div>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fun footer message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="text-center text-purple-600 font-medium pt-6"
        >
          ✏️ Calculating results... Please wait!
        </motion.div>
      </div>
    </div>
  )
}

export default ReportCardLoading
