import React, { useState, type FormEvent } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import schoollogo from "../assets/images/schoollogo.png";
import Input from "../components/CustomInput";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // You can add API call here
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-50">
      <div className="w-[60%] h-[400px] mx-auto border flex items-center shadow-md rounded-md bg-white">
        {/* Logo Section */}
        <div className="border-r h-full w-1/2 flex items-center justify-center">
          <img src={schoollogo} className="w-[70%]" alt="School Logo" />
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="px-5 w-1/2 h-full">
          <h4 className="text-center font-bold text-xl mt-4">Login</h4>

          {/* Role Selector */}
          <div className="border w-[70%] mx-auto p-1 flex justify-between items-center mt-4 rounded-lg">
            <label className="w-[45%] hover:bg-purple-500 hover:text-white flex justify-center gap-2 items-center p-1 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                name="userType"
                value="teacher"
                checked={formData.userType === "teacher"}
                onChange={(e) =>
                  setFormData({ ...formData, userType: e.target.value })
                }
              />
              <span>Teacher</span>
            </label>

            {/* Divider */}
            <div className="w-px bg-black self-stretch"></div>

            <label className="w-[45%] hover:bg-purple-500 hover:text-white flex justify-center gap-2 items-center p-1 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                name="userType"
                value="student"
                checked={formData.userType === "student"}
                onChange={(e) =>
                  setFormData({ ...formData, userType: e.target.value })
                }
              />
              <span>Bursary</span>
            </label>
          </div>

          {/* Email Input */}
          <Input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="mt-6"
          />

          {/* Password Input with Toggle */}
          <div className="relative mt-6">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          {/* Forgot Password */}
          <span className="text-sm text-blue-500 block mt-2 cursor-pointer hover:underline">
            Forgot password?
          </span>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
