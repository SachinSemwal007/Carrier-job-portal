"use client";
import React from "react";
import Link from "next/link";
import ApplicantLogin from "@/components/ApplicantLogin";
import ApplicantSignup from "@/components/ApplicantSignup";
import JobList from "@/components/JobList";
import {
  useApplicantAuth,
  ApplicantAuthProvider,
} from "@/context/ApplicantAuthProvider";
import Navbar from "@/components/Navbar";

const App = () => {
  const { applicant, applicantLogout } = useApplicantAuth(); // Use auth context

  return (
    <div>
      {!applicant ? (
        <>
          <ApplicantLogin />
        </>
      ) : (
        <div>
           <Navbar/>  
          <button onClick={applicantLogout}>Log Out</button>
          <div className="flex justify-center items-center ">
            <Link href="/applicant-dashboard">
              <button className="px-6 py-3 text-white bg-blue-500 rounded-md text-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Applicant Dashboard
              </button>
            </Link>
          </div>

          <JobList />
        </div>
      )}
    </div>
  );
};

// Wrap the App component with AuthProvider so the context is available throughout the app
export default function AppWrapper() {
  return (
    <ApplicantAuthProvider>
      <App />
    </ApplicantAuthProvider>
  );
}
