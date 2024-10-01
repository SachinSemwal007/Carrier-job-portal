"use client";
import Link from "next/link";
import React, { useState } from "react";
import { deleteJob } from "@/api"; // Assuming the deleteJob function is in api.js
import * as XLSX from "xlsx"; // Import xlsx for Excel file generation

const AdminJobCard = ({ job, refreshJobs }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to handle job deletion
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    try {
      await deleteJob(id);
      setMessage("Job deleted successfully!");
      setError("");

      // Trigger a re-fetch of the job list
      if (refreshJobs) {
        refreshJobs();
      }
    } catch (err) {
      console.error("Error deleting job:", err);
      setMessage("");
      setError("Error deleting job. Please try again.");
    }
  };

  // Function to delete an applicant using `applicantId`
  const deleteApplicant = async (applicantId) => {
    const confirmed = window.confirm("Are you sure you want to delete this applicant?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${job._id}/applications/${applicantId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Applicant removed successfully.");
        setError("");

        // Trigger a re-fetch of the job list
        if (refreshJobs) {
          refreshJobs();
        }
      } else {
        const data = await response.json();
        setMessage("");
        setError("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error removing applicant:", error);
      setMessage("");
      setError("An error occurred. Please try again.");
    }
  };

  // Function to handle downloading the applicant list as an Excel file
  const handleDownloadApplicants = () => {
    // Filter only applicants with `submitted` set to `true`
    const submittedApplicants = job.applicants.filter((applicant) => applicant.submitted);

    if (submittedApplicants.length === 0) {
      alert("No submitted applicants to download");
      return;
    }

    const applicantData = submittedApplicants.map((applicant) => ({
      ApplicantId: applicant.applicantId,
      FirstName: applicant.firstName,
      MiddleName: applicant.middleName,
      LastName: applicant.lastName,
      FathersOrHusbandName: applicant.fhName,
      Email: applicant.email,
      Contact: applicant.contact,
      Whatsapp: applicant.whatsapp,
      Gender: applicant.gender,
      DOB: new Date(applicant.dob).toLocaleDateString(),
      MaritalStatus: applicant.maritalStatus,
      Address: applicant.address,
      Pincode: applicant.pincode,
      Country: applicant.country,
      State: applicant.state,
      District: applicant.district,
      IsHandicapped: applicant.isHandicapped ? "Yes" : "No",
      Community: applicant.community,
      MatriculationYear: applicant.matriculationYear,
      MatriculationGrade: applicant.matriculationGrade,
      MatriculationPercentage: applicant.matriculationPercentage,
      MatriculationBoard: applicant.matriculationBoard,
      InterYear: applicant.interYear,
      InterGrade: applicant.interGrade,
      InterPercentage: applicant.interPercentage,
      InterBoard: applicant.interBoard,
      BachelorYear: applicant.bachelorYear,
      BachelorCourse: applicant.bachelorCourse,
      BachelorSpecialization: applicant.bachelorSpecialization,
      BachelorGrade: applicant.bachelorGrade,
      BachelorPercentage: applicant.bachelorPercentage,
      BachelorUniversity: applicant.bachelorUniversity,
      Courses: applicant.courses.map((course) => course.name).join(", "),
      Experiences: applicant.experiences
        .map((exp) => `${exp.title} at ${exp.company} (${exp.years} years)`)
        .join("; "),
      References: applicant.references
        .map((ref) => `${ref.name} (${ref.relation}): ${ref.contact}`)
        .join("; "),
      Achievement: applicant.achievement,
      Description: applicant.description,
      PassportPhoto: applicant.passportPhoto,
      Certification: applicant.certification,
      Signature: applicant.signature,
      Submitted: applicant.submitted ? "Yes" : "No",
      JobId: applicant.jobId,
    }));

    const worksheet = XLSX.utils.json_to_sheet(applicantData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
    const fileName = `${job.jobTitle}_${job._id}_applicants.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  // Filter applicants to show only those with `submitted` set to `true`
  const submittedApplicants = job.applicants.filter((applicant) => applicant.submitted);

  return (
    <div className="m-5 max-w-[400px] w-[100%] flex-shrink-0 relative">
      <div className="job-card border">
        <div>
          <Link href={`/admin/${job._id}`}>Edit</Link>
        </div>
        <h2 className="cursor-pointer text-red-600" onClick={() => handleDelete(job._id)}>
          Delete Job
        </h2>
        <h2 className="cursor-pointer text-green-600" >
          No. of Applicants{submittedApplicants.length}
        </h2>
        <h3>{job.jobTitle}</h3>
        <h3>{job._id}</h3>
        <p>Location: {job.location}</p>
        <p>Salary: {job.salary}</p>
        <p>Posted: {new Date(job.postedDate).toLocaleDateString()}</p>

        {/* Button to download the applicant list as an Excel file */}
        <button onClick={handleDownloadApplicants} className="bg-blue-500 text-white px-4 py-2 mt-4">
          Download Submitted Applicants
        </button>
      </div>
      <div className="border h-6 overflow-hidden hover:h-auto bg-white">
        <h2>Show Submitted Applicants</h2>
        {submittedApplicants.map((applicant, index) => (
          <ul key={index} className="p-5">
            <li>Name: {applicant.firstName} {applicant.middleName} {applicant.lastName}</li>
            <li>Email: {applicant.email}</li>
            <li>Contact: {applicant.contact}</li>
            <li>Gender: {applicant.gender}</li>
            <li>DOB: {new Date(applicant.dob).toLocaleDateString()}</li>
            {/* Render more fields as needed */}
            <li className="text-red-600 cursor-pointer" onClick={() => deleteApplicant(applicant.applicantId)}>
              Remove Applicant
            </li>
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
