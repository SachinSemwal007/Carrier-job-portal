// components/ForgotPassword.jsx
'use client';
import React, { useState } from 'react';
import { sendPasswordResetEmail } from '@/api'; // Assume this function makes an API call to the server

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
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
          Send Reset Link
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
