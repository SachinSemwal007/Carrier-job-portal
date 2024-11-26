"use client"; 
import Link from "next/link"; 
import React, { useState } from "react"; 
import { deleteJob } from "@/api"; // Assuming the deleteJob function is in api.js 
import * as XLSX from "xlsx"; // Import xlsx for Excel file generation 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { 
  faEdit, 
  faTrashAlt, 
  faArrowDown, 
  faArrowUp, 
} from "@fortawesome/free-solid-svg-icons"; 
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation 
import { FaDownload } from "react-icons/fa"; // Import the download icon 
import FormDownload from "./FormDownload"; 
import FormPreview from "./FormPreview"; 

 
const AdminJobCard = ({ job, refreshJobs }) => { 
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState(""); 
  const [showApplicants, setShowApplicants] = useState(false); // State to toggle applicants' visibility 
  const [showPreview, setShowPreview] = useState(false); //state for Preview 
  const [previewApplicantId, setPreviewApplicantId] = useState(null); // Track the current applicant ID being previewed 
 
  const handlePreview = (id) => { 
    setPreviewApplicantId(id); // Set the applicant ID when the preview button is clicked 
  }; 
 
  const handleClosePreview = () => { 
    setPreviewApplicantId(null); // Close the modal by resetting the applicant ID 
  }; 
  // Handle Apply button click 
  const handleToggleApplicants = () => {
    setShowApplicants((prev) => !prev); 
  }; 
 
  // Function to delete an applicant using `applicantId` 
  const deleteApplicant = async (applicantId) => { 
    const url = `https://9dwb3ngewc.execute-api.ap-south-1.amazonaws.com/dev/api/posts/${job._id}/applications/${applicantId}`; 
    console.log(url); 
    try { 
      const response = await fetch(url, { 
        method: "DELETE", 
        headers: { 
          "Content-Type": "application/json", 
        }, 
      }); 
 
      if (response.ok) { 
        const data = await response.json(); 
        console.log("Application deleted successfully:", data.message); 
        if (refreshJobs) { 
          refreshJobs(); 
        } 
        // Optionally, update the UI or navigate the user away 
        return data.message; 
      } else { 
        const errorData = await response.json(); 
        console.error("Failed to delete application:", errorData.message); 
        // Handle errors (e.g., show error message to the user) 
        return errorData.message; 
      } 
    } catch (error) { 
      console.error("Error occurred during deletion:", error); 
      // Handle the error (e.g., show error notification) 
      return error.message; 
    } 
  }; 
  // Function to handle downloading the applicant list as an Excel file 
  const handleDownloadApplicants = () => { 
    // Filter only applicants with `submitted` set to `true` 
    const submittedApplicants = job.applicants.filter( 
      (applicant) => applicant.submitted 
    ); 
 
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
 
  const handleDownloadAllApplicantsPDF = () => {
    const doc = new jsPDF();
    let line = 10; // Initial line position

    submittedApplicants.forEach((applicant, index) => {
      // Add a header for each applicant
      doc.setFontSize(16);
      doc.text(`Applicant ${index + 1}`, 10, line);
      doc.setFontSize(12);
      line += 10; // Move to the next line

      doc.text(`Applicant ID: ${applicant.applicantId}`, 10, line); 
      line += 10; 
      doc.text( 
        `Name: ${applicant.firstName} ${applicant.middleName || ""} ${ 
          applicant.lastName 
        }`, 
        10, 
        line 
      ); 
      line += 10; 

      // Add space between applicants
      line += 20;

      // Add a new page if needed (if content exceeds page length)
      if (line > 270) {
        doc.addPage();
        line = 10;
      }
    });

    // Save the PDF
    doc.save(`All_Applicants_Info.pdf`);
  };

  // Filter applicants to show only those with `submitted` set to `true` 
  const submittedApplicants = job.applicants.filter( 
    (applicant) => applicant.submitted 
  ); 
  const calculateAge = (dob) => { 
    const birthDate = new Date(dob); 
    const today = new Date(); 
 
    // Check if the birth date is in the future 
    if (birthDate > today) { 
      alert("Date of birth cannot be in the future."); 
      return -1; // Indicate invalid age 
    } 
 
    let age = today.getFullYear() - birthDate.getFullYear(); 
    const monthDiff = today.getMonth() - birthDate.getMonth(); 
 
    if ( 
      monthDiff < 0 || 
      (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
    ) { 
      age--; 
    } 
    return age; 
  }; 


  return ( 
    <div className="max-w-[400px] w-full flex-shrink-0 relative bg-white rounded-lg shadow-xl border border-gray-300 p-4 transition duration-300 hover:shadow-2xl hover:border-gray-400"> 
      {/* Job Card Header */} 
      <div className="flex justify-between items-center mb-4"> 
        {/* <Link  
          href={`/admin/${job._id}`} 
          className="text-blue-600 hover:underline flex items-center" 
        > 
          <FontAwesomeIcon icon={faEdit} className="mr-2" /> 
          Edit 
        </Link>  */}
        {/* <h2 
          className="cursor-pointer text-red-600 hover:text-red-800 flex items-center" 
          onClick={() => handleDelete(job._id)} 
        > 
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> 
          Delete Job 
        </h2> */}
         {/* Print Icon */}
      
      </div>
 
      {/* Job Information */} 
      <h2 className="text-lg font-semibold text-green-600 mb-2"> 
        No. of Applicants: {submittedApplicants.length} 
      </h2> 
      <h3 className="text-xl font-bold mb-1">{job.jobTitle}</h3> 
      <h4 className="text-gray-600 text-sm mb-1">Job ID: {job._id}</h4> 
      <p className="text-gray-800 mb-1">Location: {job.location}</p> 
      {/* <p className="text-gray-800 mb-1">Salary: {job.salary}</p> 
      <p className="text-gray-500 mb-4"> 
        Posted: {new Date(job.postedDate).toLocaleDateString()} 
      </p>  */}
 
      {/* Download Button */} 
      <button 
        onClick={handleDownloadApplicants} 
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300" 
      > 
        Download Submitted Applicants 
      </button> 
 
      {/* Show Submitted Applicants */} 
      <div className="border mt-4 p-2 rounded-lg overflow-hidden bg-gray-100 transition-all duration-300"> 
        <h2 
          className="text-md font-semibold mb-2 flex items-center cursor-pointer" 
          onClick={handleToggleApplicants} 
        > 
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
        {showApplicants && 
          submittedApplicants.map((applicant, index) => ( 
            <ul key={index} className="bg-white p-3 mb-2 rounded-lg shadow-sm"> 
              <li className="text-gray-700"> 
                <strong>Application ID: </strong> 
                <span className="text-blue-700 font-bold"> 
                  {applicant.applicationId} 
                </span> 
              </li> 
              <li className="text-gray-700"> 
                Name: {applicant.firstName} {applicant.middleName}{" "} 
                {applicant.lastName} 
              </li> 
              <li className="text-gray-700">Email: {applicant.email}</li> 
              <li className="text-gray-700">Contact: {applicant.contact}</li> 
              <li className="text-gray-700">Gender: {applicant.gender}</li> 
              <li className="text-gray-700"> 
                DOB: {new Date(applicant.dob).toLocaleDateString()} 
              </li> 
              {/* Download PDF Button */} 
              <button 
                onClick={() => handlePreview(applicant._id)} // Pass the applicant ID to handlePreview 
                className="mt-2 text-blue-600 hover:text-blue-800 flex items-center" 
              > 
                <FaDownload className="mr-2 " /> Show Form 
              </button> 
              <FormDownload 
                show={previewApplicantId === applicant._id} // Conditionally show the modal based on the applicant ID 
                handleClose={handleClosePreview} 
                applicant={applicant} 
                titlejob={job.jobTitle} 
              /> 
              {/* Remove Applicant */} 
              {/* <li 
                className="text-red-600 cursor-pointer mt-2 hover:text-red-800" 
                onClick={() => deleteApplicant(applicant._id)} 
              > 
                Remove Applicant 
              </li> */} 
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
