import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type ReusableButtonProps = {
  icon?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const LogoutBtn: React.FC<ReusableButtonProps> = ({ className = '', type = 'button' }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    toast.success('Log out successful.')
    navigate('/')
  }

  return (
    <button
      type={type}
      onClick={handleLogout}
      className={`flex items-center bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 ${className}`}
    >
      <FiLogOut className="mr-2" />
      Logout
    </button>
  )
}

export default LogoutBtn
