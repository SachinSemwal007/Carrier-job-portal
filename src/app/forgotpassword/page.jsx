// app/forgotpassword/page.jsx
'use client';
import React, { useState } from 'react';
import { sendPasswordResetEmail } from '@/api'; // Assume this function makes an API call to the server
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPasswordResetEmail(email);
      if (response.ok) {
        setMessage('Password reset link sent to your email.');
      } else {
        setMessage('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <main className="flex-grow container mx-auto p-6 sm:p-8">
        {/* Flex container for logo/text and login */}
        <div className="flex flex-col sm:flex-row items-center lg: justify-between ">
            {/* Logo and text section */}
            <div className="flex flex-col w-full sm:w-1/2 lg:w-2/5 sm:ml-20 items-center mx-auto ">
              <Image
                src="/JSSPS.webp"
                alt="JSSPS Logo"
                width={400}
                height={300}
                quality={100}
                className="w-1/3 mt-20 sm:w-1/2 lg:w-3/5 h-auto mb-1"
              />
              <h2 className="text-[26px] sm:text-[36px] lg:text-[40px]  font-extrabold text-gray-800  whitespace-nowrap">
                JSSPS Career Portal
              </h2>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-600">
                (A CCL and State Govt. of Jharkhand Joint Initiative)
              </h4>
            </div>
          
          {/* Forgot Password section */}
          <div className='w-full max-w-md bg-white p-8 rounded-md shadow-xl mt-20'>
              <div className="flex flex-col items-center mb-4">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Forgot Password</h1>
              </div>
              {message && <p className="text-center text-red-500 mb-4">{message}</p>}
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors text-sm md:text-base"
                >
                  Send Reset Link
                </button>
              </form>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
              <Link href='/'
              className="bg-blue-600 text-white text-[14px] py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full sm:w-auto">
                Click Here to Login
              </Link>
            </div>
            </div>
          </div>
      </main>
      <Footer/>
    </div>
  );
};

export default ForgotPassword;
