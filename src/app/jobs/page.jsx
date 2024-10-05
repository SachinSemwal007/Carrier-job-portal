"use client";
import React, { useEffect, useState } from "react";
import {
  useApplicantAuth,
  ApplicantAuthProvider,
} from "@/context/ApplicantAuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import JobList from "@/components/JobList";

const Page = () => {
  const { applicant, checkUser } = useApplicantAuth();
  const [loading, setLoading] = useState(true);

  // Run checkUser on mount to check if applicant is logged in
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

  // Show loading spinner while checking user status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!applicant ? (
        <Link href="/login" className="underline">
          Please Login First
        </Link>
      ) : (
        <div>
          <div className="bg-gray-100 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto p-6 sm:p-8">
              <JobList />
            </main>
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default function HomeWrapper() {
  return (
    <ApplicantAuthProvider>
      <Page />
    </ApplicantAuthProvider>
  );
}
