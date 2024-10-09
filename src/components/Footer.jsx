import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Footer Links */}
          <div className="flex-1 text-center mb-4 md:mb-0">
            <h2 className="text-[18px] font-bold text-white">
              Powered by
              <Link href='https://www.acmindia.co.in' rel="noopener noreferrer" target="_blank"> Artificial Computing Machines</Link>
            </h2>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
