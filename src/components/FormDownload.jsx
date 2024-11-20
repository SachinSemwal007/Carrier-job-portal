import React from "react";
import { Modal, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Link from "next/link";
import Image from "next/image";

const FormDownload = ({ show, handleClose, applicant, titlejob }) => {
  const {
    applicationId,
    firstName,
    middleName,
    sport,
    lastName,
    fhName,
    email,
    gender,
    maritalStatus,
    address,
    pincode,
    country,
    state,
    district,
    isHandicapped,
    isExService,
    community,
    matriculationYear,
    matriculationGrade,
    matriculationPercentage,
    matriculationBoard,
    interYear,
    interGrade,
    interPercentage,
    interBoard,
    bachelorYear,
    bachelorCourse,
    bachelorSpecialization,
    bachelorGrade,
    bachelorPercentage,
    bachelorUniversity,
    masterYear,
    masterCourse,
    masterSpecialization,
    masterGrade,
    masterPercentage,
    masterUniversity,
    courses,
    experiences,
    references,
    achievement,
    description,
    passportPhoto,
    signature,
    certification,
    dob,
    _id,
    createdAt, 
    updatedAt, 
  } = applicant;
  const id = applicationId;
  function getStringBeforeQuestionMark(inputString) {
    const index = inputString.indexOf("?");
    return index !== -1 ? inputString.substring(0, index) : inputString;
  }
  function calculateAge(dobString) {
    const dob = new Date(dobString); // Parse the date string into a Date object
    const now = new Date(); // Get the current date

    let age = now.getFullYear() - dob.getFullYear(); // Calculate the year difference

    // Adjust the age if the current date is before the birthday this year
    const monthDiff = now.getMonth() - dob.getMonth();
    const dayDiff = now.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }
  function formatDate(dobString) {
    const date = new Date(dobString); // Parse the date string into a Date object

    // Helper function to get ordinal suffix for a date (st, nd, rd, th)
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return "th"; // Special case for 11th, 12th, 13th, etc.
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    // Format day with ordinal suffix
    const day = date.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);

    function getStringBeforeQuestionMark(inputString) {
      const index = inputString.indexOf("?");
      return index !== -1 ? inputString.substring(0, index) : inputString;
    }
    // Format month names
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()]; // Get the month name

    // Get the full year
    const year = date.getFullYear();

    return `${day}${ordinalSuffix} ${month} ${year}`;
  }

  const handlePrint = () => {
    const modalContent = document.getElementById("modal-content"); // Ensure this ID matches your modal's content container
  
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
  
    // Write the modal's content into the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            /* Add styles to format your content for printing */
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            #modal-content {
              width: 100%;
            }
            /* Hide elements you don't want printed (e.g., buttons) */
            .print-button {
              display: none;
            }
          </style>
        </head>
        <body>
          ${modalContent.innerHTML}
        </body>
      </html>
    `);
  
    printWindow.document.close();
  
    // Trigger the browser's print dialog
    printWindow.print();
  
    // Automatically close the print window after printing
    printWindow.onafterprint = () => printWindow.close();
  };
  

  const handleDownloadPDF = () => {
    const modalHeader = document.getElementById("modal-header");
    const modalContent = document.getElementById("modal-content");

    // Reset styles to capture full content
    modalContent.style.height = "auto";
    modalContent.style.maxHeight = "none";
    modalContent.style.overflow = "visible";

    // Create a temporary wrapper for capturing the content
    const wrapper = document.createElement("div");
    wrapper.style.width = modalContent.clientWidth + "px"; // Ensure the wrapper width matches modal
    wrapper.appendChild(modalHeader.cloneNode(true));
    wrapper.appendChild(modalContent.cloneNode(true));
    document.body.appendChild(wrapper);

    // Use html2canvas to capture the content
    html2canvas(wrapper, {
      scale: 2, // Adjust scale if needed for better quality
      useCORS: true, // Handle cross-origin issues for images
      scrollY: 0,
      scrollX: 0,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 0;

      // Add the captured image content to PDF
      while (heightLeft > 0) {
        // const pageHeight = Math.min(heightLeft, pdfHeight); // Height that fits on the page
        // pdf.addImage(imgData, "JPEG", 0, position, imgWidth, pageHeight);
        // heightLeft -= pageHeight; // Decrease remaining height
        // position = -heightLeft; // Move position for next page
        const sourceY = pageCount * pdfHeight * (canvas.height / imgHeight); // Pixel position in canvas
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        //pageCanvas.height = (pdfHeight * canvas.height) / imgHeight;
        const sliceHeight =
        heightLeft < pdfHeight
            ? (heightLeft * canvas.height) / imgHeight
            : (pdfHeight * canvas.height) / imgHeight;
    pageCanvas.height = sliceHeight;

        const pageCtx = pageCanvas.getContext("2d");
        pageCtx.drawImage(canvas, 0, sourceY, canvas.width, sliceHeight, 0, 0, pageCanvas.width, sliceHeight);
  
        const pageImgData = pageCanvas.toDataURL("image/jpeg", 1.0);

        // Only add a new page if there is more content
      //   if (heightLeft > 0) {
      //     pdf.addPage();
      //   }
      // }
      if (pageCount > 0) pdf.addPage();
      pdf.addImage(pageImgData, "JPEG", 0, position, imgWidth, (sliceHeight * imgWidth) / canvas.width);

      heightLeft -= pdfHeight;
      pageCount++;

      //position = 5;
    }

      // === Add Clickable Link to PDF ===
      const linkText = "View certificate"; // Replace with your link text
      const linkUrl = getStringBeforeQuestionMark(certification); // Replace with your actual URL

      if (heightLeft <= 0) {
       // Get the current position after the content
       const lastPageHeight = pdf.internal.pageSize.getHeight(); 
       const lastContentY = position + imgHeight % pdfHeight;
      // Set link position in the top-right corner
      //const linkX = pdfWidth - pdf.getTextWidth(linkText) - 10; // 10 is for some padding from the right
      // const linkY = lastPageHeight - 10; // Top margin
      const linkY = Math.min(lastContentY + 10, pdfHeight - 10);

      // Add link text and create clickable area
      pdf.text(linkText, 10, linkY);
      pdf.link(10, linkY - 3, pdf.getTextWidth(linkText), 10, {
        url: linkUrl,
        target: "_blank", // Suggest to open in new tab (Note: some PDF viewers may not support this)
      });
    }

      // === Restore original modal styles ===
      modalContent.style.height = "";
      modalContent.style.maxHeight = "";
      modalContent.style.overflow = "auto";
      document.body.removeChild(wrapper);

      // Save the PDF
      pdf.save(id);

       // Optional: Print the PDF directly
    // pdf.autoPrint();
    // window.open(pdf.output("bloburl"));
    });
  };

   function formatDate(isoDate) { 
     const date = new Date(isoDate); 
 
     const day = date.getDate(); 
     const monthNames = [ 
       "Jan", 
       "Feb", 
       "Mar", 
       "Apr", 
       "May", 
       "Jun", 
       "Jul",  
       "Aug", 
       "Sep", 
       "Oct", 
       "Nov", 
       "Dec", 
     ]; 
     const month = monthNames[date.getMonth()]; 
     const year = date.getFullYear(); 
 
     const daySuffix = (day) => { 
       if (day % 10 === 1 && day !== 11) return "st"; 
       if (day % 10 === 2 && day !== 12) return "nd"; 
       if (day % 10 === 3 && day !== 13) return "rd"; 
       return "th"; 
     }; 
 
     return `${day}${daySuffix(day)} ${month} ${year}`; 
   } 
 
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      className=" max-w-6xl mx-auto my-4 p-5 bg-white shadow-lg rounded-lg w-full sm:w-[90vw] md:w-[80vw]  h-[100svh] overflow-hidden"
      // id="modal-content"
     // overflowY="auto"
    >
      <Modal.Header
        className="flex flex-col  border-b-2 border-gray-200 p-4 w-full bg-white z-10 rounded-t-lg"
        id="modal-header"
      >
        <div className="flex flex-wrap items-center justify-center sm:flex-wrap ">
          <div className="max-w-[100px]">
            <Image
              src="/JSSPS-Logo.png"
              alt="JSSP Logo"
              width={100}
              height={100}
              className="w-full h-full object-cover max-w-[100px]"
            />
          </div>
          <div className="ml-4 text-center">
            <h1 className="text-sm sm:text-lg font-bold">
              Jharkhand State Sports Promotion Society
            </h1>
            <h2 className="text-xs">
              (A State Govt. of Jharkhand and CCL Joint Initiative)
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center mt-2">
          <h2 className="text-xs sm:text-base font-bold">
            Applied For: <span className="text-red-500">{titlejob}</span>
          </h2>
          <h2 className="text-xs sm:text-base font-bold">
            Application ID: <span className="text-blue-500">{id}</span>
          </h2>
          <h2 className="text-xs sm:text-base font-bold">
            Date:{" "} 
            <span className="text-gray-600">
              {updatedAt ? formatDate(updatedAt) : formatDate(createdAt)} 
            </span>
          </h2>
          {/* <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handlePrint}
          id="download-button"
        >
          Print
        </Button> */}
        </div>
      </Modal.Header>
      <Modal.Body
        className="w-full max-w-full overflow-y-auto max-h-[calc(100vh-250px)] p-4"
        id="modal-content"
      >
        <h4 className="text-xl font-semibold mb-2">Personal Details</h4>
        {/* Personal Information */}
        <div className="flex justify-between items-start my-4">
          <div className="w-2/3 space-y-2">
            <p>
              <strong>Name:</strong> {firstName} {middleName} {lastName}
            </p>
            <p>
              <strong>Father/Husband Name:</strong> {fhName}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Gender:</strong> {gender}
            </p>
            <p>
              <strong>Sport:</strong> {sport}
            </p>

            <p>
              <strong>Date of Birth:</strong> {formatDate(dob)}{" "}
              <strong>Age:</strong> {calculateAge(dob)}
            </p>
            <p>
              <strong>Marital Status:</strong> {maritalStatus}
            </p>
            <p>
              <strong>Address:</strong> {address}, {district}, {state},{" "}
              {country}, {pincode}
            </p>
            <p>
              <strong>Community:</strong> {community}
            </p>
            <p>
              <strong>Is Handicapped:</strong> {isHandicapped ? "Yes" : "No"}
            </p>
            <p>
              <strong>Is ExService Man:</strong> {isExService ? "Yes" : "No"}
            </p>
          </div>
          {/* Display Passport Photo */}
          {passportPhoto && (
            <div className="w-1/3 flex justify-center">
              <div className="max-w-35 h-40 border border-black">
                <Image
                  src={getStringBeforeQuestionMark(passportPhoto)}
                  alt="Passport"
                  className="w-full h-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          )}
        </div>

        {/* Matriculation Section */}
        <h4 className="text-xl font-semibold mt-4 mb-2">Matriculation</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course/Grade</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">Board/University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  {matriculationYear}
                </td>
                <td className="border border-gray-300 p-2">
                  {matriculationGrade}
                </td>
                <td className="border border-gray-300 p-2">
                  {matriculationPercentage}
                </td>
                <td className="border border-gray-300 p-2">
                  {matriculationBoard}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Intermediate Section */}
        <h4 className="text-xl font-semibold mt-4 mb-2">Intermediate/+2</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course/Grade</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">Board/University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{interYear}</td>
                <td className="border border-gray-300 p-2">{interGrade}</td>
                <td className="border border-gray-300 p-2">
                  {interPercentage}
                </td>
                <td className="border border-gray-300 p-2">{interBoard}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bachelor Section */}
        <h4 className="text-xl font-semibold mt-4 mb-2">
          Bachelor Degree/Graduation/(10+2+3)
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">Specialization</th>
                <th className="border border-gray-300 p-2">Grade/Division</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{bachelorYear}</td>
                <td className="border border-gray-300 p-2">{bachelorCourse}</td>
                <td className="border border-gray-300 p-2">
                  {bachelorSpecialization}
                </td>
                <td className="border border-gray-300 p-2">{bachelorGrade}</td>
                <td className="border border-gray-300 p-2">
                  {bachelorPercentage}
                </td>
                <td className="border border-gray-300 p-2">
                  {bachelorUniversity}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Master Section */}
        <h4 className="text-xl font-semibold mt-4 mb-2">
          Master Degree/Post Graduation/(10+2+3+2)
        </h4>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Course</th>
                <th className="border border-gray-300 p-2">Specialization</th>
                <th className="border border-gray-300 p-2">Grade/Division</th>
                <th className="border border-gray-300 p-2">Percentage</th>
                <th className="border border-gray-300 p-2">University</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">{masterYear}</td>
                <td className="border border-gray-300 p-2">{masterCourse}</td>
                <td className="border border-gray-300 p-2">
                  {masterSpecialization}
                </td>
                <td className="border border-gray-300 p-2">{masterGrade}</td>
                <td className="border border-gray-300 p-2">
                  {masterPercentage}
                </td>
                <td className="border border-gray-300 p-2">
                  {masterUniversity}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Professional Course Details */}
        <h4 className="text-xl font-semibold mt-4 mb-2">
          Professional Qualification/Diploma/Certificate Course
        </h4>
        {courses && courses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Course Name</th>
                  <th className="border border-gray-300 p-2">
                    Special Subject
                  </th>
                  <th className="border border-gray-300 p-2">
                    Year of Passing
                  </th>
                  <th className="border border-gray-300 p-2">
                    Duration(months)
                  </th>
                  <th className="border border-gray-300 p-2">Grade/Division</th>
                  <th className="border border-gray-300 p-2">Percent</th>
                  <th className="border border-gray-300 p-2">
                    Name of Institute/College
                  </th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {course.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.specialSubject}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.yearOfPassing}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.duration}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.gradeDivision}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.percent}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {course.instituteName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No professional courses listed.</p>
        )}

        {/* Experience Section */}
        <h4 className="text-xl font-semibold mt-4 mb-2">Experience</h4>
        {experiences && experiences.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">
                    Office/Instt.Firm/Org
                  </th>
                  <th className="border border-gray-300 p-2">Post</th>
                  <th className="border border-gray-300 p-2">Job Type</th>
                  <th className="border border-gray-300 p-2">From Date</th>
                  <th className="border border-gray-300 p-2">Till Date</th>
                  <th className="border border-gray-300 p-2">Scale of Type</th>
                  <th className="border border-gray-300 p-2">
                    Nature of Duties
                  </th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((experience, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {experience.company}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.post}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.jobType}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {formatDate(experience.fromDate)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {formatDate(experience.tillDate)}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.jobType}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {experience.natureOfDuties}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No experience details available.</p>
        )}

        {/* References Section */}
        <h4 className="text-lg font-semibold mb-4">References</h4>
        {references && references.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Reference Name</th>
                  <th className="border border-gray-300 p-2">Contact</th>
                  <th className="border border-gray-300 p-2">Relation</th>
                </tr>
              </thead>
              <tbody>
                {references.map((reference, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      {reference.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {reference.contact}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {reference.relation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No references listed.</p>
        )}

        {/* Achievements */}
        <h4 className="text-lg font-semibold mb-4">Achievements</h4>
        <p>{achievement}</p>

        {/* Description */}
        <h4 className="text-lg font-semibold mb-4">Describe Yourself</h4>
        <p>{description}</p>

        {/* Declaration */}
        <div className="mt-5 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm leading-relaxed text-gray-800 text-justify">
          <p className="m-0 text-gray-600 text-[0.9rem]">
            I hereby declare that the information furnished in this Application
            Form is true to the best of my knowledge and belief. If any wrong
            information is detected in the future, my candidature for the post
            may be cancelled at any stage and action can be taken accordingly. I
            also agree with the terms and conditions mentioned in the detailed
            advertisement.
          </p>
        </div>

        <div className="flex justify-between items-start mt-5">
          {/* Left Side: Place and Date */}
          <div className="flex flex-col">
            <p>
              <strong>Place:</strong> {district}
            </p>{" "}
            {/* Placeholder for District */}
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>{" "}
            {/* Placeholder for current date */}
          </div>

          {/* Right Side: Signature */}
          <div className="flex flex-col items-center">
            {signature && (
              <Image
                src={getStringBeforeQuestionMark(signature)}
                alt="Signature"
                className="w-32 h-18 object-contain border border-gray-300"
                class="avoid-page-break"
                width={100}
                height={100}
              />
            )}
            <p className="mt-2 text-sm text-gray-600">Signature of Candidate</p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="w-full bg-white border-t-2 border-gray-200 p-4 flex justify-end rounded-b-lg">
        <Button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleClose}
          id="close-button"
        >
          Close
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          <Link
            href={getStringBeforeQuestionMark(certification)}
            target="_blank"
            className="text-white underline"
          >
            View Certificate
          </Link>
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          onClick={handleDownloadPDF}
          id="download-button"
        >
          Download as PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormDownload;
