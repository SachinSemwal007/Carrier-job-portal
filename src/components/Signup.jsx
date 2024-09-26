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
    <div>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
