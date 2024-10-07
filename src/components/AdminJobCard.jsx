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

const AdminJobCard = ({ job, refreshJobs }) => { 
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState(""); 
  const [showApplicants, setShowApplicants] = useState(false); // State to toggle applicants' visibility 
  const [showPreview, setShowPreview] = useState(false); //state for Preview 
 
  // Handle Apply button click
  const handleToggleApplicants = () => {
    setShowApplicants((prev) => !prev);
  };
 
  // Function to handle job deletion 
  const handleDelete = async (id) => { 
    const confirmed = window.confirm( 
      "Are you sure you want to delete this job?" 
    ); 
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
    const confirmed = window.confirm( 
      "Are you sure you want to delete this applicant?" 
    ); 
    if (!confirmed) return; 

    try { 
      const response = await fetch( 
        `http://localhost:5001/api/posts/${job._id}/applications/${applicantId}`, 
        { 
          method: "DELETE", 
        } 
      ); 
 
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
 
  // Function to handle downloading an individual applicant's data as a PDF
  // Function to handle downloading an individual applicant's data as a PDF
  // const handleDownloadApplicantPDF = (applicant) => {
  //   const doc = new jsPDF();
  //   let line = 20; // Starting line position
  //   const margin = 10;

  //   // Adding logo and title
  //   doc.setFontSize(18);
  //   doc.text("Applicant Information", margin, line);
  //   line += 10;

  //   // Passport Photo on top right
  //   if (applicant.passportPhoto) {
  //     doc.addImage(applicant.passportPhoto, "JPEG", 150, 10, 40, 50);
  //   }

  //   doc.setFontSize(12);
  //   line += 10;

  //   // Personal Details
  //   doc.setFontSize(14);
  //   doc.text("Personal Details", margin, line);
  //   line += 10;
  //   doc.setFontSize(12);
  //   doc.text(
  //     `Name: ${applicant.firstName} ${applicant.middleName} ${applicant.lastName}`,
  //     margin,
  //     line
  //   );
  //   line += 8;
  //   doc.text(`Father/Husband Name: ${applicant.fhName}`, margin, line);
  //   line += 8;
  //   doc.text(`Email: ${applicant.email}`, margin, line);
  //   line += 8;
  //   doc.text(`Gender: ${applicant.gender}`, margin, line);
  //   line += 8;
  //   doc.text(
  //     `Date of Birth: ${new Date(applicant.dob).toLocaleDateString()}`,
  //     margin,
  //     line
  //   );
  //   line += 8;
  //   doc.text(`Marital Status: ${applicant.maritalStatus}`, margin, line);
  //   line += 8;
  //   doc.text(
  //     `Address: ${applicant.address}, ${applicant.district}, ${applicant.state}, ${applicant.country}, ${applicant.pincode}`,
  //     margin,
  //     line
  //   );
  //   line += 8;
  //   doc.text(`Community: ${applicant.community}`, margin, line);
  //   line += 8;
  //   doc.text(
  //     `Is Handicapped: ${applicant.isHandicapped ? "Yes" : "No"}`,
  //     margin,
  //     line
  //   );
  //   line += 12;

  //   // Matriculation Section
  //   doc.setFontSize(14);
  //   doc.text("Matriculation", margin, line);
  //   line += 10;
  //   doc.setFontSize(12);
  //   doc.text(`Year: ${applicant.matriculationYear}`, margin, line);
  //   line += 8;
  //   doc.text(`Grade: ${applicant.matriculationGrade}`, margin, line);
  //   line += 8;
  //   doc.text(`Percentage: ${applicant.matriculationPercentage}%`, margin, line);
  //   line += 8;
  //   doc.text(`Board: ${applicant.matriculationBoard}`, margin, line);
  //   line += 12;

  //   // Intermediate Section
  //   doc.setFontSize(14);
  //   doc.text("Intermediate", margin, line);
  //   line += 10;
  //   doc.setFontSize(12);
  //   doc.text(`Year: ${applicant.interYear}`, margin, line);
  //   line += 8;
  //   doc.text(`Grade: ${applicant.interGrade}`, margin, line);
  //   line += 8;
  //   doc.text(`Percentage: ${applicant.interPercentage}%`, margin, line);
  //   line += 8;
  //   doc.text(`Board: ${applicant.interBoard}`, margin, line);
  //   line += 12;

  //   // Bachelor Section
  //   doc.setFontSize(14);
  //   doc.text("Bachelor's Degree", margin, line);
  //   line += 10;
  //   doc.setFontSize(12);
  //   doc.text(`Year: ${applicant.bachelorYear}`, margin, line);
  //   line += 8;
  //   doc.text(`Course: ${applicant.bachelorCourse}`, margin, line);
  //   line += 8;
  //   doc.text(
  //     `Specialization: ${applicant.bachelorSpecialization}`,
  //     margin,
  //     line
  //   );
  //   line += 8;
  //   doc.text(`Grade: ${applicant.bachelorGrade}`, margin, line);
  //   line += 8;
  //   doc.text(`Percentage: ${applicant.bachelorPercentage}%`, margin, line);
  //   line += 8;
  //   doc.text(`University: ${applicant.bachelorUniversity}`, margin, line);
  //   line += 12;

  //   // Courses Section
  //   if (applicant.courses && applicant.courses.length > 0) {
  //     doc.setFontSize(14);
  //     doc.text("Professional Qualifications", margin, line);
  //     line += 10;
  //     doc.setFontSize(12);
  //     applicant.courses.forEach((course, index) => {
  //       doc.text(`Course ${index + 1}: ${course.name}`, margin, line);
  //       line += 8;
  //     });
  //     line += 12;
  //   }

  //   // Experience Section
  //   if (applicant.experiences && applicant.experiences.length > 0) {
  //     doc.setFontSize(14);
  //     doc.text("Experiences", margin, line);
  //     line += 10;
  //     doc.setFontSize(12);
  //     applicant.experiences.forEach((exp, index) => {
  //       doc.text(
  //         `${exp.title} at ${exp.company} (${exp.years} years)`,
  //         margin,
  //         line
  //       );
  //       line += 8;
  //     });
  //     line += 12;
  //   }

  //   // References Section
  //   if (applicant.references && applicant.references.length > 0) {
  //     doc.setFontSize(14);
  //     doc.text("References", margin, line);
  //     line += 10;
  //     doc.setFontSize(12);
  //     applicant.references.forEach((ref, index) => {
  //       doc.text(`${ref.name} (${ref.relation}): ${ref.contact}`, margin, line);
  //       line += 8;
  //     });
  //     line += 12;
  //   }

  //   // Achievement and Description
  //   doc.setFontSize(14);
  //   doc.text("Achievements", margin, line);
  //   line += 10;
  //   doc.setFontSize(12);
  //   doc.text(applicant.achievement, margin, line);
  //   line += 12;

  //   doc.setFontSize(14);
  //   doc.text("Description", margin, line);
  //   line += 10;
  //   doc.setFontSize(12);
  //   doc.text(applicant.description, margin, line);
  //   line += 12;

  //   // Declaration and Signature
  //   doc.setFontSize(14);
  //   doc.text("Declaration", margin, line);
  //   line += 10;
  //   doc.setFontSize(12);
  //   doc.text(
  //     "I hereby declare that the information furnished in this Application Form is true to the best of my knowledge and belief.",
  //     margin,
  //     line
  //   );
  //   line += 10;

  //   // Signature on the bottom left
  //   if (applicant.signature) {
  //     doc.addImage(applicant.signature, "JPEG", margin, 250, 40, 20);
  //     doc.text("Signature of Candidate", margin, 275);
  //   }

  //   // Certification link at the bottom
  //   if (applicant.certification) {
  //     doc.setTextColor(0, 0, 255); // Blue color for the link
  //     doc.textWithLink("View Certification", margin, 290, {
  //       url: applicant.certification,
  //     });
  //   }

  //   // Save the PDF
  //   doc.save(`${applicant.firstName}_${applicant.lastName}_Info.pdf`);
  // };

  // Function to handle downloading all applicants' data as a single PDF
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
      // Add more fields as in the individual applicant function...

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
  const handlePreview = () => { 
    ; // Check limits based on job ID 
      setShowPreview(true); 
  }; 
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
    <div className="m-5 max-w-[400px] w-full flex-shrink-0 relative bg-white rounded-lg shadow-lg p-4 transition duration-300 hover:shadow-xl">
      {/* Job Card Header */} 
      <div className="flex justify-between items-center mb-4"> 
        <Link 
          href={`/admin/${job._id}`} 
          className="text-blue-600 hover:underline flex items-center" 
        > 
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
        No. of Applicants: {job.applicants.length} 
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
          job.applicants.map((applicant, index) => ( 
            <ul key={index} className="bg-white p-3 mb-2 rounded-lg shadow-sm"> 
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
                onClick={handlePreview} 
                className="mt-2 text-blue-600 hover:text-blue-800 flex items-center" 
              > 
                <FaDownload className="mr-2" /> Show Form 
              </button> 
              <FormDownload 
                show={showPreview} 
                handleClose={() => setShowPreview(false)} 
                firstName={applicant.firstName} 
                middleName={applicant.middleName} 
                lastName={applicant.lastName} 
                fhName={applicant.fhName} 
                email={applicant.email} 
                gender={applicant.gender} 
                maritalStatus={applicant.maritalStatus} 
                address={applicant.address} 
                pincode={applicant.pincode} 
                country={applicant.country} 
                state={applicant.state} 
                district={applicant.district} 
                isHandicapped={applicant.isHandicapped} 
                community={applicant.community} 
                matriculationYear={applicant.matriculationYear} 
                matriculationGrade={applicant.matriculationGrade} 
                matriculationPercentage={applicant.matriculationPercentage} 
                matriculationBoard={applicant.matriculationBoard} 
                interYear={applicant.interYear} 
                interGrade={applicant.interGrade} 
                interPercentage={applicant.interPercentage} 
                interBoard={applicant.interBoard} 
                bachelorYear={applicant.bachelorYear} 
                bachelorCourse={applicant.bachelorCourse} 
                bachelorSpecialization={applicant.bachelorSpecialization} 
                bachelorGrade={applicant.bachelorGrade} 
                bachelorPercentage={applicant.bachelorPercentage} 
                bachelorUniversity={applicant.bachelorUniversity} 
                courses={applicant.courses} 
                experiences={applicant.experiences} 
                references={applicant.references} 
                achievement={applicant.achievement} 
                description={applicant.description} 
                passportPhoto={applicant.passportPhoto} 
                signature={applicant.signature} 
                certification={applicant.certification} 
                _id={applicant._id} 
              /> 
              {/* Remove Applicant */} 
              <li 
                className="text-red-600 cursor-pointer mt-2 hover:text-red-800" 
                onClick={() => deleteApplicant(applicant.id)} 
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
