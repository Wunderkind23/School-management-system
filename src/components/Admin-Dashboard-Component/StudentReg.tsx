import React, { useRef, useState } from "react";

const StudentReg = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    dob: "",
    studentClass: "",
    gender: "",
    admissionNumber: "",
    email: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // File upload click trigger
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle text/select changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      lastName: "",
      firstName: "",
      middleName: "",
      dob: "",
      studentClass: "",
      gender: "",
      admissionNumber: "",
      email: "",
      guardianName: "",
      guardianPhone: "",
      address: "",
    });
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="p-6 bg-pink-50 min-h-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-1 rounded-full border border-gray-300 w-64 text-sm focus:outline-none"
          />
          <span className="absolute right-3 text-gray-400 text-xs">🔍</span>
        </div>
        <div className="flex items-center gap-4">
          <img
            src="https://via.placeholder.com/30"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">Student Registration</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
          {/* Left Side Inputs */}
          <div className="col-span-2 space-y-4">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <select
              name="studentClass"
              value={formData.studentClass}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Select Class</option>
              <option value="Jss 1">Jss 1</option>
              <option value="Jss 2">Jss 2</option>
              <option value="Jss 3">Jss 3</option>
            </select>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="number"
              name="admissionNumber"
              placeholder="Enter Admission Number"
              value={formData.admissionNumber}
              readOnly
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              name="guardianName"
              placeholder="Enter Guardian Name"
              value={formData.guardianName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              name="guardianPhone"
              placeholder="Enter Guardian Phone"
              value={formData.guardianPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
              type="text"
              name="address"
              placeholder="Enter Contact Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-400"
              >
                Reset form fields
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700"
              >
                Add Student
              </button>
            </div>
          </div>

          {/* Upload Section */}
          <div
            onClick={handleClick}
            className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-4 h-64 cursor-pointer hover:bg-gray-50"
          >
            {preview ? (
              <img
                src={preview}
                alt="Passport Preview"
                className="h-full object-cover rounded"
              />
            ) : (
              <span className="text-sm text-gray-500 text-center">
                Upload Passport Photograph
              </span>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </form>
      </div>
    </div>
  );
};

export default StudentReg;
