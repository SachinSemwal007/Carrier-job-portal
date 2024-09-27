// components/ApplicantSignup.js
'use client';

import { useState } from 'react';
import { useApplicantAuth } from "@/context/ApplicantAuthProvider"; // Adjust the import path accordingly

const ApplicantSignup = () => {
  const { applicantSignup } = useApplicantAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    resume: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, age, resume } = formData;
    
    try {
      const success = await applicantSignup(name, email, password, age, resume);
      if (success) {
        setMessage('Signup successful! Please check your email to verify your account.');
        setFormData({
          name: '',
          email: '',
          password: '',
          age: '',
          resume: '',
        });
      } else {
        setMessage('Signup failed. Please check the form and try again.');
      }
    } catch (error) {
      setMessage('Signup failed. Error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Applicant Signup</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="resume"
        placeholder="Resume URL"
        value={formData.resume}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  </div>
  );
};

export default ApplicantSignup;
