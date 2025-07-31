import { useState } from "react";
import Input from "../CustomInput";

type ResetPasswordModalProps = {
  forgotEmail: string;
  onsuccess: () => void;
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  forgotEmail,
  onsuccess,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    console.log("Password reset submitted:", {
      email: forgotEmail,
      newPassword,
    });
    // Add API call here

    // after successful password reset:
    onsuccess();
  };

  return (
    <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50">
      <div className="bg-white/90 backdrop-blur-sm w-[400px] p-4 rounded-md shadow-xl flex flex-col justify-between gap-4 border border-purple-300">
        <div>
          <h3 className="text-lg font-bold mb-2 text-center">Reset Password</h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            Create new password for{" "}
            <span className="font-medium">{forgotEmail}</span>
          </p>

          <Input
            type="password"
            placeholder="Enter New Password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Confirm New Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2"
          />

          {error && (
            <p className="text-sm text-red-500 mt-1 text-center">{error}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-[60%] mx-auto py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
