"use client";

import { useState } from "react";
import { useApplicantAuth } from "@/context/ApplicantAuthProvider"; // Adjust the import path accordingly

const ApplicantSignup = () => {
  const { applicantSignup } = useApplicantAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
  
    try {
      // Only send name, email, and password to the backend
      const success = await applicantSignup(name, email, password);
      if (success) {
        setMessage("Signup successful! Please check your email to verify your account.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage("Signup failed. Please check the form and try again.");
      }
    } catch (error) {
      // Check for specific error messages from the server
      if (error.message.includes("Applicant already exists")) {
        setMessage("Email already in use. Please use a different email.");
      } else {
        setMessage("Signup failed. Error: " + error.message);
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-center">
          Applicant Signup
        </h1>
        {message && (
          <p className="text-center text-red-500 mb-4 text-sm md:text-base">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors text-sm md:text-base"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicantSignup;
