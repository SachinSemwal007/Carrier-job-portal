import Link from 'next/link';
import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.jobTitle}</h3>
      <p>Company: {job.companyName}</p>
      <p>Location: {job.location}</p>
      <p>Salary: {job.salary}</p>
      <p>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
      <Link href={`/${job._id}`}><button>Apply</button></Link>
    </div>
  );
};

export default JobCard;
