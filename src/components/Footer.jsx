import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Footer Links */}
          <div className="flex flex-col md:flex-row mb-4 md:mb-0">
            <h2 className="text-[18px] font-bold text-white text-right">
              Designed and Developed by ACM
            </h2>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right  mt-4 md:mt-0">
            &copy;JSSPS. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
