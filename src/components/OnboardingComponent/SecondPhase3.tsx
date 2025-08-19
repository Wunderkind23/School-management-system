import React, { useState } from "react";

const SecondPhase3: React.FC = () => {
  const [formData, setFormData] = useState({
    test: "",
    exam: "",
    currency: "",
    firstClass: "",
    lastClass: "",
  });

  // Handle changes for inputs/selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white rounded-lg shadow-lg flex w-[900px] overflow-hidden">
        {/* Left Panel */}
        <div className="bg-purple-700 text-white w-1/3 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-bold mb-6">System Preference</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/201/201614.png"
            alt="System Preference"
            className="w-40 h-40"
          />
        </div>

        {/* Right Panel */}
        <div className="w-2/3 p-10">
          {/* Progress Steps */}
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="h-6 w-6 flex justify-center items-center rounded-full border text-purple-500 font-bold hover:bg-purple-500 hover:text-white"
              >
                {num}
              </div>
            ))}
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grading System */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Grading System
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <select
                  name="test"
                  value={formData.test}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Test</option>
                  <option value="20%">20%</option>
                  <option value="30%">30%</option>
                  <option value="40%">40%</option>
                </select>

                <select
                  name="exam"
                  value={formData.exam}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Exam</option>
                  <option value="60%">60%</option>
                  <option value="70%">70%</option>
                  <option value="80%">80%</option>
                </select>
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Currency
              </label>
              <input
                type="text"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
                placeholder="Enter currency"
              />
            </div>

            {/* Default Class Structure */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Default Class Structure
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="firstClass"
                  value={formData.firstClass}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter First"
                />
                <input
                  type="text"
                  name="lastClass"
                  value={formData.lastClass}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter Last"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="flex">
              <button
                type="submit"
                className="w-[40%] mx-auto border border-purple-600 text-purple-600 rounded-md py-2 font-semibold hover:bg-purple-600 hover:text-white transition"
              >
                Next &gt;
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SecondPhase3;
