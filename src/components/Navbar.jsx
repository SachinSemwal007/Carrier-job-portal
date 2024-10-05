"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ApplicantAuthProvider, useApplicantAuth } from "@/context/ApplicantAuthProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { applicant, applicantLogout, checkUser } = useApplicantAuth();
  // console.log(applicant);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   const checkApplicant = async () => {
     try {
       await checkUser();
     } catch (error) {
       console.error("Error during user check:", error);
     } finally {
       setLoading(false); // Ensure loading state is updated
     }
   };

   checkApplicant();
 }, [checkUser]);


  return (
    <nav className="bg-teal-900 text-white">
      <div className="container mx-auto px-4 h-30 flex justify-between items-center">
        {" "}
        {/* Set fixed height */}
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/JSSPS-Logo.png" // Replace with the actual image file name in the public folder
              alt="MyBrand Logo"
              width={120} // Adjust the width if needed
              height={20} // Adjust the height if needed
              className="h-full object-contain" // Adds a smooth hover effect
            />
          </Link>
        </div>
        {/* Hamburger Menu (Mobile) */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
        <div className={`lg:flex items-center ${isOpen ? "block" : "hidden"}`}>
          <Link
            href="/"
            className="block mt-2 lg:mt-0 lg:ml-4 hover:text-gray-400"
          >
            Home
          </Link>
          { applicant ? ( 
            <div className="flex gap-2">
            <h2 
              onClick={() => applicantLogout()} 
              className="block mt-2 lg:mt-0 lg:ml-4 hover:text-gray-400" 
            > 
              Logout 
            </h2> 
           <Link href='/applicant-dashboard'>
            Applicant Dashboard
            </Link> 
            </div>
          ) : (
            <Link
              href="/login" 
              className="block mt-2 lg:mt-0 lg:ml-4 hover:text-gray-400" 
            > 
              Login 
            </Link> 
          )} 
        </div> 
      </div>
    </nav>
  );
};


export default function HomeWrapper() {
  return (
    <ApplicantAuthProvider>
      <Navbar />
    </ApplicantAuthProvider>
  );
}
