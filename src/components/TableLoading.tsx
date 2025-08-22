// components/ui/TableSkeleton.tsx
import React from "react"

interface TableSkeletonProps {
  rows?: number
  cols?: number
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ rows = 3, cols = 3 }) => {
  return (
    <tbody>
      {[...Array(rows)].map((_, rowIdx) => (
        <tr key={rowIdx} className="animate-pulse">
          {[...Array(cols)].map((_, colIdx) => (
            <td key={colIdx} className="px-4 py-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

export default TableSkeleton
