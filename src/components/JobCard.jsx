'use client'
import { useApplicantAuth } from '@/context/ApplicantAuthProvider';
import { applyForJob } from '@/api'; // Import the API function
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const JobCard = ({ job }) => {
  const { applicant } = useApplicantAuth();
  const router = useRouter();
  const [message, setMessage] = useState(''); // State to show messages

  // Handle Apply button click
  const handleApply = () => {
    router.push(`/applicant-form/${job._id}`);
  };

  return (
    <div className="job-card">
      <h3>{job.jobTitle}</h3>
      <p>Company: {job.companyName}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
      <button onClick={handleApply}>Apply</button>
      {message && <p>{message}</p>} {/* Display success or error messages */}
    </div>
  );
};

export default JobCard;
