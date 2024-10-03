"use client";
import { useAuth } from '@/context/authcontext';
import React, { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { signup } = useAuth(); // Access signup function from the auth context

  const handleSignup = async (e) => {
    e.preventDefault();
    const success = await signup(name, email, password); // Call signup function from context
    if (success) {
      setMessage('Signup successful. You can now log in.');
      setError('');
    } else {
      setError('Error during signup. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-teal-600">Create Admin</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full p-2 bg-teal-600 text-white rounded hover:bg-teal-500 transition duration-200"
          >
            Create
          </button>
        </form>
        {message && <p className="text-green-600 text-center mt-4">{message}</p>}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
