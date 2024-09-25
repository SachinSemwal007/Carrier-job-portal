
import Link from "next/link";
import React, { useState } from "react";

const AdminJobCard = ({ job }) => {
  return (
    <div className="flex">
      <div className="job-card border w-[50%]">
        <h3>{job.jobTitle}</h3>
        <p>Company: {job.companyName}</p>
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}</p>
        <p>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>
        <h2 onClick={()=>setHide(false)}>Show Applicants</h2>
      </div>
    </div>
  );
};

export default AdminJobCard;
