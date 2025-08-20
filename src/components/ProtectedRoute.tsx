// src/components/ProtectedRoute.tsx

import useAuth from '@/contexts/AuthContext'
import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: JSX.Element
  roles: string[]
}) {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
