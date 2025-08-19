// src/components/OnboardingForm.tsx
// import React, { useState } from "react";

const FirstPhase2: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white rounded-lg shadow-lg flex w-[800px] overflow-hidden border p-2">
        {/* Left Section */}
        <div className="bg-purple-600 text-white flex flex-col items-center justify-center p-8 w-[32%] h-[450px] rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome to Glorious Future Academy
          </h2>
          <p>Management System</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center w-[68%] h-[400px]">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-center gap-4">
              <div className="h-6 w-6 flex justify-center items-center rounded-full border text-purple-500 font-bold hover:bg-purple-500 hover:text-white">
                1
              </div>
              <div className="h-6 w-6 flex justify-center items-center rounded-full border text-purple-500 font-bold hover:bg-purple-500 hover:text-white">
                2
              </div>
              <div className="h-6 w-6 flex justify-center items-center rounded-full border text-purple-500 font-bold hover:bg-purple-500 hover:text-white">
                3
              </div>
              <div className="h-6 w-6 flex justify-center items-center rounded-full border text-purple-500 font-bold hover:bg-purple-500 hover:text-white">
                4
              </div>
            </div>
            <div className=" flex flex-col items-start ml-16 ">
              <p>
                Your all-in-one platform for managing students,staff and school
                operation,We'll guide you through a quick setup so you can
              </p>
              <ul className="list-disc ml-10 text-sm">
                <li>Cutomize your school's profile and grading system</li>
                <li>Add Teachers,Bursars, and Student</li>
                <li>Manage result,payment and report seamlessly</li>
              </ul>
              <p>This will only take a few minutes</p>
            </div>

            <button
              type="submit"
              className="w-[40%] mx-auto border border-purple-600 text-purple-600 rounded-md py-2 font-semibold hover:bg-purple-600 hover:text-white transition"
            >
              Start Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPhase2;
