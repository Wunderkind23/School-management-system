/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useEffect, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Input from '../CustomInput'
import ForgotPasswordModal from '../Login-Component/ForgotPasswordModal'
import OtpModal from '../Login-Component/OtpModal'
import ResetPasswordModal from '../Login-Component/ResetPasswordModal'
import { useLogin } from '@/hooks/auth/useLogin'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from '@/contexts/AuthContext'
import { LoadingButton } from '../custom/Button'

const Login = () => {
  const { mutate, isPending } = useLogin()
  const { logout, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    mutate(
      { ...formData },
      {
        onSuccess: (res) => {
          toast.success('Login successful.')

          login(res.data.accessToken, res.data.user)

          if (res?.data.user.role === 'admin') {
            navigate('/admin/dashboard-layout')
          }

          if (res?.data.user.role === 'teacher') {
            navigate('/Tadmin/Tdashboard-layout')
          }

          if (res?.data.user.role === 'student') {
            navigate('/Sadmin/Sdashboard-layout')
          }
        },
        onError: (error: any) => {
          // If API sends custom error message
          console.log(error)
          const message =
            error?.response?.data?.message || 'Something went wrong. Please try again.'
          toast.error(message)
        },
      },
    )
  }

  const handleContinue = () => {
    // do validation, API call, etc.
    setShowOtpModal(true) // 👈 this displays the OTP modal
    setShowForgotModal(false) // optionally hide forgot modal
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="px-5 w-1/2 h-full">
        <h4 className="text-center font-bold text-xl mt-4">Login</h4>

        {/* Role Selector */}
        <div className="border w-[100%] mx-auto p-1 flex justify-between items-center mt-4 rounded-lg">
          <label className="w-[45%] hover:bg-purple-500 hover:text-white flex justify-center gap-2 items-center p-1 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              name="userType"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <span>Admin</span>
          </label>
          <div className="w-px bg-black self-stretch"></div>

          <label className="w-[45%] hover:bg-purple-500 hover:text-white flex justify-center gap-2 items-center p-1 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              name="userType"
              value="teacher"
              checked={formData.role === 'teacher'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <span>Teacher</span>
          </label>

          <div className="w-px bg-black self-stretch"></div>

          <label className="w-[45%] hover:bg-purple-500 hover:text-white flex justify-center gap-2 items-center p-1 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              name="userType"
              value="student"
              checked={formData.role === 'student'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <span>Student</span>
          </label>
        </div>

        {/* Email Input */}
        <Input
          type="email"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-6 w-full"
        />

        {/* Password Input */}
        <div className="relative mt-6">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full"
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>

        {/* Forgot Password */}
        <span
          // onClick={() => setShowForgotModal(true)}
          className="text-sm text-blue-500 block mt-2 cursor-pointer hover:underline"
        >
          Forgot password?
        </span>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <LoadingButton
            isLoading={isPending}
            type="submit"
            loadingText="logging in"
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
          >
            Login
          </LoadingButton>
        </div>
      </form>

      {/* ✅ Modal placed here at the bottom of the return */}
      {showForgotModal && (
        <ForgotPasswordModal
          showForgotModal={showForgotModal}
          forgotEmail={forgotEmail}
          handleContinue={handleContinue}
          setForgotEmail={setForgotEmail}
        />
      )}
      {/* OTP Modal */}
      {showOtpModal && (
        <OtpModal
          forgotEmail={forgotEmail}
          onsuccess={() => {
            setShowOtpModal(false)
            setShowResetPasswordModal(true)
          }}
        />
      )}

      {/* New Password */}
      {showResetPasswordModal && (
        <ResetPasswordModal
          forgotEmail={forgotEmail}
          onsuccess={() => {
            setShowResetPasswordModal(false)
            // Optionally reset form, show toast, navigate, etc.
          }}
        />
      )}
    </>
  )
}

export default Login
