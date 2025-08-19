import React, { useRef, useState } from "react";
import Input from "../CustomInput";

const SecondPhase2: React.FC = () => {
  const [formData, setFormData] = useState({
    schoolName: "",
    schoolAddress: "",
    contactNumber: "",
    email: "",
    academicSession: "",
    termStartDate: "",
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Trigger hidden file input click
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection & preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white rounded-lg shadow-lg flex w-[800px] overflow-hidden border p-2">
        {/* Left Section */}
        <div className="bg-purple-600 text-white flex flex-col items-center justify-center p-8 w-[32%] h-[450px] rounded-lg">
          <h2 className="text-lg font-bold mb-6 text-center">
            Add School Logo
          </h2>

          {/* Upload Section */}
          <div
            onClick={handleClick}
            className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 h-36 w-36 cursor-pointer hover:bg-gray-50 bg-white"
          >
            {preview ? (
              <img
                src={preview}
                alt="Logo Preview"
                className="h-full w-full object-contain rounded"
              />
            ) : (
              <span className="text-sm text-gray-500 text-center">+</span>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center w-[68%] h-[400px] px-6 ">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className="h-6 w-6 flex justify-center items-center rounded-full border text-purple-500 font-bold hover:bg-purple-500 hover:text-white"
                >
                  {num}
                </div>
              ))}
            </div>

            <form className="flex flex-col">
              <Input
                type="text"
                label="School Name"
                placeholder="Type school name"
                name="schoolName"
                value={formData.schoolName}
                onChange={(e) =>
                  setFormData({ ...formData, schoolName: e.target.value })
                }
                className="mb-6 w-full"
              />

              <Input
                type="text"
                label="School Address"
                placeholder="Type full address"
                name="schoolAddress"
                value={formData.schoolAddress}
                onChange={(e) =>
                  setFormData({ ...formData, schoolAddress: e.target.value })
                }
                className="mb-6 w-full"
              />

              <div className="flex gap-4">
                <Input
                  type="text"
                  label="Contact NUmber"
                  placeholder="+23400000000"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, contactNumber: e.target.value })
                  }
                  className="mb-6 w-full"
                />

                <Input
                  type="text"
                  label="Email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="mb-6 w-full"
                />
              </div>

              <div className="flex gap-4">
                <Input
                  type="text"
                  label="Academic Session"
                  placeholder="2022/2023"
                  name="academicSession"
                  value={formData.academicSession}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      academicSession: e.target.value,
                    })
                  }
                  className="mb-6 w-full"
                />

                <Input
                  type="date"
                  label="Term Start Date"
                  placeholder="02/03/2023"
                  name="email"
                  value={formData.termStartDate}
                  onChange={(e) =>
                    setFormData({ ...formData, termStartDate: e.target.value })
                  }
                  className="mb-6 w-full"
                />
              </div>

              <button
                type="submit"
                className="w-[40%] mx-auto border border-purple-600 text-purple-600 rounded-md py-2 font-semibold hover:bg-purple-600 hover:text-white transition"
              >
                Next &gt;
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPhase2;
