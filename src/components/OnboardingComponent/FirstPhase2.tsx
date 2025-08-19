// src/components/OnboardingForm.tsx
// import React, { useState } from "react";

const FirstPhase2: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white rounded-lg shadow-lg flex w-[800px] overflow-hidden">
        {/* Left Section */}
        <div className="bg-purple-600 text-white flex flex-col items-center justify-center p-8 w-[30%] h-[450px]">
          <h2 className="text-lg font-semibold mb-6">Credentials Upload</h2>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center p-8 w-[70%] h-[400px]">
          <div className="flex flex-col justify-between h-full">
            <div className=" flex flex-col items-center">
              <h3 className="font-bold text-xl">Educator's Certificate</h3>
              <p className="text-center">
                We need to veriy your teaching credentials. Please upload a
                valid educator's certificate to proceed{" "}
              </p>
            </div>

            <button
              type="submit"
              className="w-[40%] mx-auto border border-purple-600 text-purple-600 rounded-md py-2 font-semibold hover:bg-purple-600 hover:text-white transition"
            >
              Browse Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstPhase2;
