// src/components/OnboardingForm.tsx
import React, { useState } from "react";

const OnboardingForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white rounded-lg shadow-lg flex w-[800px] overflow-hidden">
        {/* Left Section */}
        <div className="bg-purple-600 text-white flex flex-col items-center justify-center p-8 w-1/2">
          <h2 className="text-lg font-semibold mb-6">Input details for</h2>
          <img
            src="https://illustrations.popsy.co/white/work-from-home.svg"
            alt="Onboarding"
            className="w-40 mb-6"
          />
          <p className="text-md font-medium">Onboarding</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center p-8 w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full border border-purple-600 text-purple-600 rounded-md py-2 font-semibold hover:bg-purple-600 hover:text-white transition"
            >
              Next &gt;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
