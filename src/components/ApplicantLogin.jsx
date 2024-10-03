// components/ApplicantLogin.jsx
'use client';
import { useState } from 'react';
import { useApplicantAuth } from "@/context/ApplicantAuthProvider"; // Adjust the import path accordingly
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link from Next.js
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '@/components/Navbar'; // Assuming you have a Navbar component
import Footer from '@/components/Footer'; // Assuming you have a Footer component
import Image from 'next/image';

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

  const handleRegisterClick = () => {
    router.push('/signup'); // Navigate to the signup page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center p-6">
        <div className='w-full max-w-md bg-white p-8 rounded-md shadow-md'>
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/Jharkhand-Govt-Logo.png" // Updated to use your logo
              alt="Jharkhand-Govt. Logo"
              width={100} 
              height={50}
              className="w-24 h-auto mb-4"
            />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Applicant Login</h1>
          </div>
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
          <div className='flex justify-between mt-4'>
            <Link href="/forgotpassword" className='text-blue-600 hover:underline'>
              Forgot Password?
            </Link>
            <button className='text-blue-600 hover:underline' onClick={handleRegisterClick}>
              New User Register Here
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplicantLogin;
