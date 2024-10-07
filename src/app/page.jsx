"use client";
import React from "react";
import Image from "next/image";
import NewVacancyBanner from "../components/NewVacancyBanner";
import {
  useApplicantAuth,
  ApplicantAuthProvider,
} from "@/context/ApplicantAuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import ApplicantLogin from "@/components/ApplicantLogin";

const Home = () => {
  const vacancies = [
    { title: "Head Coach", location: "Chicago", url: "/vacancies/1" },
    { title: "Coach", location: "Miami", url: "/vacancies/4" },
    { title: "Assistant Coach", location: "Houston", url: "/vacancies/5" },
  ];

  return (
    <>
      <Head>
        <title>JSSPS Careers</title>
        <link
          rel="icon"
          href="/JSSPS-Logo.png"
          sizes="32x32"
          type="image/png"
        />
      </Head>
      <div className="bg-gray-100 min-h-screen flex flex-col">
         {/* <Navbar />  */}
        <main className="flex-grow container mx-auto p-6 sm:p-8">
          {/* Flex container for logo/text and login */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6">
            {/* Logo and text section */}
            <div className="flex flex-col w-full sm:w-1/2 lg:w-2/5 sm:ml-20 items-center mx-auto">
              <Image
                src="/JSSPS.webp"
                alt="JSSPS Logo"
                width={500}
                height={300}
                quality={100}
                className="w-3/4 sm:w-1/2 lg:w-4/5 h-auto mb-4"
              />
              <h2 className="text-[26px] sm:text-[36px] lg:text-[52px]  font-extrabold text-gray-800 mb-2 whitespace-nowrap">
                JSSPS Career Portal
              </h2>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-600">
                (A State Govt. of Jharkhand and CCL Joint Initiative)
              </h4>
            </div>
            {/* Applicant Login section */}
            <div className="w-full sm:w-1/2 lg:w-2/5 mt-6 sm:mt-0">
              <ApplicantLogin />
            </div>
          </div>
        </main>
        <div className="bg-[#252425] py-4 px-2 text-center">
          <p className="text-[16px] sm:text-[26px] font-bold text-yellow-500">
            IMPORTANT ANNOUNCEMENTS REGARDING COACHES HIRING{" "}
            <a
              href="/path/to/your/pdf-file.pdf"
              download
              className="text-red-500 underline hover:text-red-700 blinking-text"
            >
              Click Here
            </a>
          </p>
        </div>

        <Footer /> 
      </div> 
    </> 
  ); 
}; 
 
//export default Home;

// Wrap the App component with AuthProvider so the context is available throughout the app
export default function HomeWrapper() {
  return (
    <ApplicantAuthProvider>
      <Home />
    </ApplicantAuthProvider>
  );
}
