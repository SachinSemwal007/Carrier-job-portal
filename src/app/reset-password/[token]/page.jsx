// app/reset-password/[token]/page.jsx
'use client';
import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { resetPassword } from '@/api'; // Assume this function makes an API call to reset the password

const ResetPassword = () => {
  const router = useRouter();
  const { token } = useParams(); // Get the token from the URL
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(token, password); // Call API to reset the password
      if (response.ok) {
        setMessage('Password has been reset successfully.');
        setTimeout(() => router.push('/login'), 2000); // Redirect to login after a delay
      } else {
        setMessage('Failed to reset password. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Reset Password</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition-colors"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
