"use client";
import Link from "next/link";
import React, { useState } from "react";
import { deleteJob } from "@/api"; // Assuming the deleteJob function is in api.js
import * as XLSX from "xlsx"; // Import xlsx for Excel file generation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const AdminJobCard = ({ job, refreshJobs }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showApplicants, setShowApplicants] = useState(false); // State to toggle applicants' visibility

  // Handle Apply button click
  const handleToggleApplicants = () => {
    setShowApplicants((prev) => !prev);
  };

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
    <div className="m-5 max-w-[400px] w-full flex-shrink-0 relative bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl">
      {/* Job Card Header */}
      <div className="flex justify-between items-center mb-4">
        <Link href={`/admin/${job._id}`} className="text-blue-600 hover:underline flex items-center">
          <FontAwesomeIcon icon={faEdit} className="mr-2" />
          Edit
        </Link>
        <h2
          className="cursor-pointer text-red-600 hover:text-red-800 flex items-center"
          onClick={() => handleDelete(job._id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          Delete Job
        </h2>
      </div>

      {/* Job Information */}
      <h2 className="text-lg font-semibold text-green-600 mb-2">
        No. of Applicants: {submittedApplicants.length}
      </h2>
      <h3 className="text-xl font-bold mb-1">{job.jobTitle}</h3>
      <h4 className="text-gray-600 text-sm mb-1">Job ID: {job._id}</h4>
      <p className="text-gray-800 mb-1">Location: {job.location}</p>
      <p className="text-gray-800 mb-1">Salary: {job.salary}</p>
      <p className="text-gray-500 mb-4">
        Posted: {new Date(job.postedDate).toLocaleDateString()}
      </p>

      {/* Download Button */}
      <button
        onClick={handleDownloadApplicants}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Download Submitted Applicants
      </button>

      {/* Show Submitted Applicants */}
      <div className="border mt-4 p-4 rounded-lg overflow-hidden bg-gray-100 transition-all duration-300">
        <h2 className="text-md font-semibold mb-2 flex items-center cursor-pointer" onClick={handleToggleApplicants}>
          {showApplicants ? (
            <>
              <FontAwesomeIcon icon={faArrowUp} className="mr-2" />
              Hide Submitted Applicants
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
              Show Submitted Applicants
            </>
          )}
        </h2>
        {showApplicants && submittedApplicants.map((applicant, index) => (
          <ul key={index} className="bg-white p-3 mb-2 rounded-lg shadow-sm">
            <li className="text-gray-700">
              Name: {applicant.firstName} {applicant.middleName} {applicant.lastName}
            </li>
            <li className="text-gray-700">Email: {applicant.email}</li>
            <li className="text-gray-700">Contact: {applicant.contact}</li>
            <li className="text-gray-700">Gender: {applicant.gender}</li>
            <li className="text-gray-700">DOB: {new Date(applicant.dob).toLocaleDateString()}</li>
            {/* Remove Applicant */}
            <li
              className="text-red-600 cursor-pointer mt-2 hover:text-red-800"
              onClick={() => deleteApplicant(applicant.applicantId)}
            >
              Remove Applicant
            </li>
          </ul>
        ))}
      </div>

      {/* Success and Error Messages */}
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default AdminJobCard;
