// components/ApplicantLogin.jsx
'use client';

import { useState } from 'react';
import { useApplicantAuth } from "@/context/ApplicantAuthProvider"; // Adjust the import path accordingly
import { useRouter } from 'next/navigation';

const ApplicantLogin = () => {
  const { applicantLogin } = useApplicantAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const success = await applicantLogin(email, password);
      if (success) {
        setMessage('Login successful!');
        router.push('/'); // Redirect to a dashboard or another page
      } else {
        setMessage('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h1>Applicant Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default ApplicantLogin;
