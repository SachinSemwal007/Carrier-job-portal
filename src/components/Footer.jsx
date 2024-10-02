import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className="flex flex-col md:flex-row text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-pulse">
              Designed and Developed by ACM
            </h2>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right mt-4 md:mt-0">
            &copy;ACM. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
