"use client";
import React from "react";
import Image from "next/image";
import NewVacancyBanner from "../components/NewVacancyBanner";
import { useApplicantAuth , ApplicantAuthProvider } from "@/context/ApplicantAuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  const vacancies = [
    { title: "Head Coach", location: "Chicago", url: "/vacancies/1" },
    { title: "Coach", location: "Miami", url: "/vacancies/4" },
    { title: "Assistant Coach", location: "Houston", url: "/vacancies/5" },
  ];

  return (
   
    <div className="bg-gray-100 min-h-screen flex flex-col">
       <Navbar/>
      <main className="flex-grow container mx-auto p-6 sm:p-8">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/Jharkhand-Govt-Logo.png" // Updated to use a simpler filename
            alt="Jharkhand-Govt. Logo"
            width={200} // Replace with the actual width of your image
            height={100} // Replace with the actual height of your image
            className="w-1/3 sm:w-1/4 h-auto mb-4"
          />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-2">
            Welcome to Jharkhand State Sports Promotion Society
          </h2>
          <h4 className="text-lg text-center text-gray-600">
            (A State Govt. of Jharkhand and CCL Joint Initiative)
          </h4>
        </div>
        <div className="mt-8 sm:mt-10">
          <NewVacancyBanner vacancies={vacancies} />
        </div>
      </main>
      <Footer/>
    </div>
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

