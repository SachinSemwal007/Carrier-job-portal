'use client';
import Link from "next/link";
import React, { useState } from "react";
import { deleteJob } from "@/api"; // Assuming the deleteJob function is in api.js
import * as XLSX from "xlsx"; // Import xlsx for Excel file generation

const AdminJobCard = ({ job }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to handle job deletion
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return; // If the user cancels, do nothing

    try {
      // Call the deleteJob function and pass the job id
      await deleteJob(id);
      setMessage("Job deleted successfully!");
      setError("");
      // Optionally, you can trigger a re-fetch of the job list or remove the job from the UI
    } catch (err) {
      console.error("Error deleting job:", err);
      setMessage("");
      setError("Error deleting job. Please try again.");
    }
  };

  // Function to handle downloading the applicant list as an Excel file
  const handleDownloadApplicants = () => {
    if (job.applicants.length === 0) {
      alert("No applicants to download");
      return;
    }

    // Create a worksheet from the applicants array
    const worksheet = XLSX.utils.json_to_sheet(job.applicants);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

    // Generate Excel file name using job title and job ID
    const fileName = `${job.jobTitle}_${job._id}_applicants.xlsx`;

    // Export the workbook to Excel and trigger the download
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="m-5 max-w-[400px] w-[100%] flex-shrink-0 relative">
      <div className="job-card border">
        <div>
          <Link href={`/admin/${job._id}`}>Edit</Link>
        </div>
        <h2
          className="cursor-pointer text-red-600"
          onClick={() => handleDelete(job._id)}
        >
          Delete Job
        </h2>
        <h3>{job.jobTitle}</h3>
        <h3>{job._id}</h3>
        <p>Company: {job.companyName}</p>
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}</p>
        <p>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>

        {/* Button to download the applicant list as an Excel file */}
        <button
          onClick={handleDownloadApplicants}
          className="bg-blue-500 text-white px-4 py-2 mt-4"
        >
          Download Applicant List
        </button>
      </div>
      <div className="border h-6 overflow-hidden hover:h-auto bg-white">
        <h2>Show Applicants</h2>
        {job.applicants.map((item, index) => (
          <ul key={index} className="p-5">
            <li>{item.name}</li>
            <li>{item.email}</li>
            <Link href={item.resume} target="_blank">
              <li>View Resume</li>
            </Link>
            <hr />
          </ul>
        ))}
      </div>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default AdminJobCard;
