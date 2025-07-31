/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import Input from "../CustomInput";
// import { useLocation } from "react-router-dom";

type OtpModalProps = {
  forgotEmail: string;
  onsuccess: () => void;
};

const OtpModal: React.FC<OtpModalProps> = ({ forgotEmail, onsuccess }) => {
  // const location = useLocation();
  // const { forgotEmail } = location.state || {}; // Email passed from navigate()

  const [otpCode, setOtpCode] = useState("");

  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50">
      <div className="bg-white/90 backdrop-blur-sm w-[400px] h-[200px] p-4 rounded-md shadow-xl flex flex-col justify-between border border-purple-300">
        <div>
          <h3 className="text-lg font-bold mb-2 text-center">Enter OTP</h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            An OTP has been sent to{" "}
            <span className="font-medium">{forgotEmail}</span>
          </p>
          <Input
            type="number"
            placeholder="Enter OTP"
            name="otp"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            console.log("OTP submitted:", otpCode);
            onsuccess(); // show reset password modal
          }}
          className="w-[60%] mx-auto py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
