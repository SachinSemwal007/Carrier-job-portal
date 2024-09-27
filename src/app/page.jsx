"use client";
import React from "react";
import Link from "next/link";
import ApplicantLogin from "@/components/ApplicantLogin";
import ApplicantSignup from "@/components/ApplicantSignup";
import JobList from "@/components/JobList";
import { useApplicantAuth , ApplicantAuthProvider } from "@/context/ApplicantAuthProvider";

const App = () => {
  const { applicant, applicantLogout } = useApplicantAuth(); // Use auth context


  return (
    <div>
      {!applicant ? (
        <>
          <ApplicantLogin /> 
                or
          <ApplicantSignup />
        </>
      ) : (
        <div>
                <button onClick={applicantLogout}>Log Out</button>

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
