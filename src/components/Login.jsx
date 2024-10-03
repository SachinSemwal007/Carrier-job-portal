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
      router.push('/admin/dashboard'); // Redirect to the admin dashboard or another page
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
          <div className="flex flex-col items-center mb-4">
            <Image
              src="/Jharkhand-Govt-Logo.png" // Updated to use your admin logo
              alt="Admin Logo"
              width={100}
              height={50}
              className="w-24 h-auto mb-4"
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
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;
