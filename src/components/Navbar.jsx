"use client"; 
import React, { useEffect, useState } from "react"; 
import Link from "next/link";
import Image from "next/image";
import {
  ApplicantAuthProvider,
  useApplicantAuth,
} from "@/context/ApplicantAuthProvider";

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
    <nav className="bg-teal-50 text-black shadow-lg">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
            <Image
              src="/JSSPS.webp"
              alt="JSSPS Logo"
              width={190}
              height={100}
              quality={100}
              className="h-20 w-auto object-contain"
            />
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
        <div
          className={`lg:flex items-center ${isOpen ? "block" : "hidden"}`}>
          {/* <Link
            href="/"
            className="block mt-2 lg:mt-0 lg:ml-4 px-2 py-1 rounded  hover:bg-teal-700 transition duration-300"
          >
            Home
          </Link> */}
          {applicant ? (
            <div className="flex flex-col lg:flex-row gap-0 lg:gap-2">
              <Link
                href="/applicant-dashboard"
                className="block mt-2 lg:mt-0 px-2 py-1 rounded hover:bg-teal-500 transition duration-300"
              >
                Applicant Dashboard
              </Link>
              {/* <Link
                href="/jobs"
                className="block mt-2 lg:mt-0 px-2 py-1 rounded hover:bg-teal-500 transition duration-300"
              >
                Jobs
              </Link> */}
              <Link
                href="/"
                onClick={() => applicantLogout()}
                className="block mt-2 lg:mt-0 px-2 py-1 rounded hover:bg-red-500 cursor-pointer transition duration-300"
              >
                Logout
              </Link>
            </div>
          ) : (
            <Link
              href="/login"
              className="block mt-2 lg:mt-0 px-2 py-1 rounded hover:bg-teal-500 transition duration-300"
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
