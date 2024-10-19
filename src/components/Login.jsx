// components/AdminLogin.jsx
'use client';
import { useState } from 'react';
import { useAuth } from '@/context/authcontext'; // Adjust the import path accordingly
import { useRouter } from 'next/navigation';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from '@/components/Navbar'; // Assuming you have a Navbar component
import Footer from '@/components/Footer'; // Assuming you have a Footer component
import Image from 'next/image';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth(); // Use the login function from the auth context
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password); // Call login function from context
    if (success) {
      router.push('/admin'); // Redirect to the admin dashboard or another page
    } else {
      setError('Invalid login credentials');
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
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">Admin Login</h1>
                </div>
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-400">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-gray-400">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
                  >
                    Login
                  </button>
                </form>
          </div>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
