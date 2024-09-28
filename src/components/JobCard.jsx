'use client'
import { useApplicantAuth } from '@/context/ApplicantAuthProvider';
import { applyForJob } from '@/api'; // Import the API function
import React, { useState } from 'react';

const JobCard = ({ job }) => {
  const { applicant } = useApplicantAuth();
  const [message, setMessage] = useState(''); // State to show messages

  // Handle Apply button click
  const handleApply = async () => {
    if (!applicant) {
      setMessage('You need to log in to apply for this job.');
      return;
    }

    try {
      const applicantData = {
        name: applicant.name,
        email: applicant.email,
        age: applicant.age, // Include the age field
        resume: applicant.resume, // Assuming `resume` is part of the applicant object
      };
      
      const response = await applyForJob(job._id, applicantData);

      if (response.ok) {
        setMessage('Application submitted successfully!');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      setMessage('An error occurred. Please try again.');
    }
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
