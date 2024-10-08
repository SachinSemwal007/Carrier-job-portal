"use client";

import { useState } from "react";
import { useApplicantAuth } from "@/context/ApplicantAuthProvider"; // Adjust the import path accordingly
import Footer from "./Footer";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto p-6 sm:p-8">
        {/* Flex container for logo/text and login */}
        <div className="flex flex-col sm:flex-row items-center lg: justify-between mt-0 mb-6">
            {/* Logo and text section */}
            <div className="flex flex-col w-full sm:w-1/2 lg:w-2/5 sm:ml-20 items-center mx-auto -mt-20">
              <Image
                src="/JSSPS.webp"
                alt="JSSPS Logo"
                width={500}
                height={300}
                quality={100}
                className="w-1/3 mt-20 sm:w-1/2 lg:w-4/5 h-auto mb-4"
              />
              <h2 className="text-[26px] sm:text-[36px] lg:text-[52px]  font-extrabold text-gray-800 mb-2 whitespace-nowrap">
                JSSPS Career Portal
              </h2>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-600">
                (A State Govt. of Jharkhand and CCL Joint Initiative)
              </h4>
            </div>
          
          {/* Applicant Login section */}
          <div className='w-full max-w-md bg-white p-8 rounded-md shadow-xl'>
              <div className="flex flex-col items-center mb-4">
                  <Image
                    src="/JSSPS.webp" // Updated to use your admin logo
                    alt="Admin Logo"
                    width={220}
                    height={120}
                    className="w-36 h-auto mb-4"
                  />
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Applicant Signup</h1>
              </div>
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
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <Link href='/'
              className="bg-blue-600 text-white text-[14px] py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full sm:w-auto">
                Already Registered ? Click Here to Login
              </Link>
            </div>
            </div>
          </div>
      </main>
      <div className="bg-[#252425] py-4 px-2 text-center">
          <p className="text-[16px] sm:text-[26px] font-bold text-yellow-500">
            IMPORTANT ANNOUNCEMENTS REGARDING COACHES HIRING{" "}
            <a
              href="/path/to/your/pdf-file.pdf"
              download
              className="text-red-500 underline hover:text-red-700 blinking-text"
            >
              Click Here
            </a>
          </p>
        </div>
      <Footer/>
    </div>
  );
};

export default ApplicantSignup;
