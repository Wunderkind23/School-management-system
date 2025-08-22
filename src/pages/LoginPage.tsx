import schoollogo from '../assets/images/schoollogo.png'

import Login from '@/components/auth/Login'

const LoginPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50 relative shadow">
      <div className="w-[1200px] py-10 mx-auto overflow-hidden flex items-center shadow-md rounded-md bg-white z-10">
        {/* Logo Section */}
        <div className="border-r h-full w-1/2 flex items-center justify-center">
          <img src={schoollogo} className="w-[70%]" alt="School Logo" />
        </div>

        {/* Form Section */}
        <Login />
      </div>
    </div>
  )
}

export default LoginPage
