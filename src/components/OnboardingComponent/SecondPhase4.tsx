/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react";

const SecondPhase4: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50">
      <div className="bg-white rounded-lg shadow-lg flex w-[900px] h-[450px] overflow-hidden">
        {/* Left Panel */}
        <div className="bg-purple-700 text-white w-1/3 flex flex-col items-center justify-center p-6">
          <h2 className="text-2xl font-bold mb-6">Add Staff</h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            alt="Add Staff"
            className="w-40 h-40"
          />
        </div>

        {/* Right Panel */}
        <div className="w-2/3 p-10 flex flex-col items-center">
          {/* Progress Steps */}
          <div className="flex justify-center gap-4 mb-25">
            {[1, 2, 3, 4].map((num, _index) => (
              <div
                key={num}
                className={`h-6 w-6 flex justify-center items-center rounded-full border font-bold 
                  ${
                    num === 4
                      ? "bg-purple-600 text-white border-purple-600"
                      : "text-purple-500 border-purple-500 hover:bg-purple-500 hover:text-white"
                  }`}
              >
                {num}
              </div>
            ))}
          </div>

          {/* Staff Role Buttons */}
          <div className="bg-purple-50 p-8 rounded-md shadow-inner flex gap-8">
            <button className="px-8 py-3 border border-purple-600 text-purple-600 font-semibold rounded-md hover:bg-purple-600 hover:text-white transition">
              Teacher
            </button>
            <button className="px-8 py-3 border border-purple-600 text-purple-600 font-semibold rounded-md hover:bg-purple-600 hover:text-white transition">
              Bursar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPhase4;
