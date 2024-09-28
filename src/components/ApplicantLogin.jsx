// components/ApplicantLogin.jsx
'use client';

import { useState } from 'react';
import { useApplicantAuth } from "@/context/ApplicantAuthProvider"; // Adjust the import path accordingly
import { useRouter } from 'next/navigation';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  // Function to handle the "New User Register Here" button click
  const handleRegisterClick = () => {
    router.push('/signup'); // Navigate to the signup page
  };


  return (
    // <div className='max-w-[700px] '>
    //   <h1>Applicant Login</h1>
    //   {message && <p>{message}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       value={formData.email}
    //       onChange={handleChange}
    //       required
    //     />
    //     <input
    //       type="password"
    //       name="password"
    //       placeholder="Password"
    //       value={formData.password}
    //       onChange={handleChange}
    //       required
    //     />
    //     <button type="submit">Log In</button>
    //   </form>
    // </div>
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
    <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
      <h1 className='text-2xl font-semibold mb-4 text-center'>Applicant Login</h1>
      {message && <p className='text-center text-red-500 mb-4'>{message}</p>}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='relative'>
          <span className='absolute top-3 left-3 text-gray-400'>
            <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="email"
            name="email"
            placeholder="User name"
            value={formData.email}
            onChange={handleChange}
            required
            className='w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <div className='relative'>
          <span className='absolute top-3 left-3 text-gray-400'>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className='w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <button
          type="submit"
          className='w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors'
        >
          Sign In
        </button>
      </form>
      <div className='flex justify-between mt-4 space-x-2'>
        <button className='w-full text-blue-600 hover:underline'>Forgot Password?</button>
        <button className='w-full text-blue-600 hover:underline' onClick={()=>handleRegisterClick()}>
            New User Register Here
          </button>
      </div>
    </div>
  </div>
  );
};

export default ApplicantLogin;
