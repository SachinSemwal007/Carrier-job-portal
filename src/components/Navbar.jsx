import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-2xl font-bold">
          <Link href="/">MyBrand</Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
              />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className={`lg:flex items-center ${isOpen ? 'block' : 'hidden'}`}>
          <Link href="/" className="block mt-2 lg:mt-0 lg:ml-4 hover:text-gray-400">Home</Link>
          <Link href="/login" className="block mt-2 lg:mt-0 lg:ml-4 hover:text-gray-400">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
