import React from 'react'

interface LoadingSectionProps {
  message?: string
}

const LoadingSection: React.FC<LoadingSectionProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-blue-100 rounded-md text-blue-700 font-semibold font-sans">
      <div className="w-6 h-6 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
      <span>{message}</span>
    </div>
  )
}

export default LoadingSection
