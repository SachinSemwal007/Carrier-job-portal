"use client";
import { useApplicantAuth } from "@/context/ApplicantAuthProvider";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const JobCard = ({ job }) => {
  const { applicant } = useApplicantAuth();
  const router = useRouter();
  const [message, setMessage] = useState(""); // State to show messages

  // Handle Apply button click
  const handleApply = () => {
    router.push(`/applicant-form/${job._id}`);
  };

  return (
    <div className="bg-gradient-to-r from-gray-700 via-blue-800 to-gray-900 rounded-xl shadow-lg p-6 text-white min-w-[280px] max-w-[350px] mx-auto">
      <h3 className="text-2xl font-bold mb-2">{job.jobTitle}</h3>
      <p className="text-lg mb-1">Company: <span className="font-medium">{job.companyName}</span></p>
      <p className="text-lg mb-1">Location: <span className="font-medium">{job.location}</span></p>
      <p className="text-lg mb-1">Salary: <span className="font-medium">{job.salary}</span></p>
      <p className="text-lg mb-4">Posted: <span className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</span></p>
      
      <button 
        onClick={handleApply} 
        className="w-full py-2 mt-4 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-100 transition duration-300"
      >
        Apply
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default JobCard;
