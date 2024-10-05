// //FormPreview-final 
 
// import React from "react"; 
// import { Modal, Button } from "react-bootstrap"; 
// import { useParams } from "next/navigation"; 
// import jsPDF from "jspdf"; 
// import html2canvas from "html2canvas"; 
// import Link from "next/link"; 
 
// const FormDownload = ({ 
//   show, // to control modal visibility 
//   handleClose, // function to close modal 
//   firstName, 
//   middleName, 
//   lastName, 
//   fhName, 
//   email, 
//   gender, 
//   maritalStatus, 
//   address,
//   pincode,
//   country,
//   state,
//   district,
//   isHandicapped,
//   community,
//   matriculationYear,
//   matriculationGrade,
//   matriculationPercentage,
//   matriculationBoard,
//   interYear,
//   interGrade,
//   interPercentage,
//   interBoard,
//   bachelorYear,
//   bachelorCourse,
//   bachelorSpecialization,
//   bachelorGrade,
//   bachelorPercentage,
//   bachelorUniversity,
//   courses,
//   experiences,
//   references,
//   achievement,
//   description,
//   passportPhoto,
//   signature,
//   certification,
//   _id,
// }) => {
//   const dob = 124;
//   const id = _id;
//   const handleDownloadPDF = () => {
//     const modalContent = document.getElementById("modal-content");
//     const closeButton = document.getElementById("close-button");
//     const downloadButton = document.getElementById("download-button");

//     closeButton.style.display = "none";
//     downloadButton.style.display = "none";

//     const originalHeight = modalContent.style.height;
//     const originalOverflow = modalContent.style.overflow;

//     modalContent.style.height = "auto";
//     modalContent.style.maxHeight = "none";
//     modalContent.style.overflow = "visible";

//     html2canvas(modalContent, {
//       scale: 2,
//       useCORS: true,
//       scrollY: 0,
//       scrollX: 0,
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/jpeg", 1.0);
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();

//       const imgWidth = pdfWidth;
//       const imgHeight = (canvas.height * pdfWidth) / canvas.width;

//       let heightLeft = imgHeight;
//       let position = 0;

//       while (heightLeft > 0) {
//         pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
//         heightLeft -= pdfHeight;
//         if (heightLeft > 0) {
//           position -= pdfHeight;
//           pdf.addPage();
//         }
//       }

//       modalContent.style.height = originalHeight;
//       modalContent.style.overflow = originalOverflow;

//       closeButton.style.display = "block";
//       downloadButton.style.display = "block";

//       pdf.save("form-preview.pdf");
//     });
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       size="lg"
//       className=" max-w-6xl mx-auto my-4 p-5 bg-white shadow-lg rounded-lg"
//       id="modal-content"
//     >
//       <Modal.Header className="flex flex-col  border-b-2 border-gray-200 p-4">
//         <div className="flex flex-wrap items-center justify-center ">
//           <img
//             src="/JSSPS-Logo.png"
//             alt="JSSP Logo"
//             className="h-14 object-contain"
//           />
//           <div className="ml-4 text-center">
//             <h1 className="text-lg font-bold">
//               Jharkhand State Sports Promotion Society
//             </h1>
//             <h2 className="text-sm">
//               (A State Govt. of Jharkhand and CCL Joint Initiative)
//             </h2>
//           </div>
//         </div>
//         <div className="flex flex-wrap justify-between items-center">
//           <h2 className="text-base font-bold">
//             Applied For: <span className="text-red-500">{id}</span>
//           </h2>
//           <h2 className="text-base font-bold">
//             Application ID: <span className="text-blue-500">{id}</span>
//           </h2>
//           <h2 className="text-base font-bold">
//             Date:{" "}
//             <span className="text-gray-600">
//               {new Date().toLocaleDateString()}
//             </span>
//           </h2>
//         </div>
//       </Modal.Header>
//       <Modal.Body className="overflow-y-auto max-h-[70vh] p-3 space-y-3">
//         <h4 className="text-xl font-semibold mb-2">Personal Details</h4>
//         {/* Personal Information */}
//         <div className="flex justify-between items-start my-4">
//           <div className="w-2/3 space-y-2">
//             <p>
//               <strong>Name:</strong> {firstName} {middleName} {lastName}
//             </p>
//             <p>
//               <strong>Father/Husband Name:</strong> {fhName}
//             </p>
//             <p>
//               <strong>Email:</strong> {email}
//             </p>
//             <p>
//               <strong>Gender:</strong> {gender}
//             </p>
//             <p>
//               <strong>Date of Birth:</strong> {dob}
//             </p>
//             <p>
//               <strong>Marital Status:</strong> {maritalStatus}
//             </p>
//             <p>
//               <strong>Address:</strong> {address}, {district}, {state},{" "}
//               {country}, {pincode}
//             </p>
//             <p>
//               <strong>Community:</strong> {community}
//             </p>
//             <p>
//               <strong>Is Handicapped:</strong> {isHandicapped}
//             </p>
//           </div>
//           {/* Display Passport Photo */}
//           {passportPhoto && (
//             <div className="w-1/3 flex justify-center">
//               <div className="w-35 h-40 border border-black">
//                 <img
//                   src={passportPhoto}
//                   alt="Passport"
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Matriculation Section */}
//         <h4 className="text-xl font-semibold mt-4">Matriculation</h4>
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-2">Year</th>
//                 <th className="border border-gray-300 p-2">Course/Grade</th>
//                 <th className="border border-gray-300 p-2">Percentage</th>
//                 <th className="border border-gray-300 p-2">Board/University</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border border-gray-300 p-2">
//                   {matriculationYear}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {matriculationGrade}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {matriculationPercentage}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {matriculationBoard}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Intermediate Section */}
//         <h4 className="text-xl font-semibold mt-4">Intermediate/+2</h4>
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-2">Year</th>
//                 <th className="border border-gray-300 p-2">Course/Grade</th>
//                 <th className="border border-gray-300 p-2">Percentage</th>
//                 <th className="border border-gray-300 p-2">Board/University</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border border-gray-300 p-2">{interYear}</td>
//                 <td className="border border-gray-300 p-2">{interGrade}</td>
//                 <td className="border border-gray-300 p-2">
//                   {interPercentage}
//                 </td>
//                 <td className="border border-gray-300 p-2">{interBoard}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Bachelor Section */}
//         <h4 className="text-xl font-semibold mt-4">
//           Bachelor Degree/Graduation/(10+2+3)
//         </h4>
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 p-2">Year</th>
//                 <th className="border border-gray-300 p-2">Course</th>
//                 <th className="border border-gray-300 p-2">Specialization</th>
//                 <th className="border border-gray-300 p-2">Grade/Division</th>
//                 <th className="border border-gray-300 p-2">Percentage</th>
//                 <th className="border border-gray-300 p-2">University</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border border-gray-300 p-2">{bachelorYear}</td>
//                 <td className="border border-gray-300 p-2">{bachelorCourse}</td>
//                 <td className="border border-gray-300 p-2">
//                   {bachelorSpecialization}
//                 </td>
//                 <td className="border border-gray-300 p-2">{bachelorGrade}</td>
//                 <td className="border border-gray-300 p-2">
//                   {bachelorPercentage}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {bachelorUniversity}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Professional Course Details */}
//         <h4 className="text-xl font-semibold mt-4">
//           Professional Qualification/Diploma/Certificate Course
//         </h4>
//         {courses && courses.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-300 p-2">Course Name</th>
//                   <th className="border border-gray-300 p-2">
//                     Special Subject
//                   </th>
//                   <th className="border border-gray-300 p-2">
//                     Year of Passing
//                   </th>
//                   <th className="border border-gray-300 p-2">
//                     Duration(months)
//                   </th>
//                   <th className="border border-gray-300 p-2">Grade/Division</th>
//                   <th className="border border-gray-300 p-2">Percent</th>
//                   <th className="border border-gray-300 p-2">
//                     Name of Institute/College
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {courses.map((course, index) => (
//                   <tr key={index}>
//                     <td className="border border-gray-300 p-2">
//                       {course.courseName}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {course.specialSubject}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {course.yearOfPassing}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {course.duration}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {course.gradeDivision}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {course.percent}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {course.instituteName}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p>No professional courses listed.</p>
//         )}

//         {/* Experience Section */}
//         <h4 className="text-xl font-semibold mt-4">Experience</h4>
//         {experiences && experiences.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-300 p-2">
//                     Office/Instt.Firm/Org
//                   </th>
//                   <th className="border border-gray-300 p-2">Post</th>
//                   <th className="border border-gray-300 p-2">Job Type</th>
//                   <th className="border border-gray-300 p-2">From Date</th>
//                   <th className="border border-gray-300 p-2">Till Date</th>
//                   <th className="border border-gray-300 p-2">Scale of Type</th>
//                   <th className="border border-gray-300 p-2">
//                     Nature of Duties
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {experiences.map((experience, index) => (
//                   <tr key={index}>
//                     <td className="border border-gray-300 p-2">
//                       {experience.orgName}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {experience.post}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {experience.jobType}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {experience.fromDate}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {experience.tillDate}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {experience.scaleOfType}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {experience.natureOfDuties}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p>No experience details available.</p>
//         )}

//         {/* References Section */}
//         <h4 className="text-lg font-semibold mb-4">References</h4>
//         {references && references.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full table-auto border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-300 p-2">Reference Name</th>
//                   <th className="border border-gray-300 p-2">Contact</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {references.map((reference, index) => (
//                   <tr key={index}>
//                     <td className="border border-gray-300 p-2">
//                       {reference.refName}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {reference.refContact}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-gray-500">No references listed.</p>
//         )}

//         {/* Achiement */}
//         <h4 className="text-lg font-semibold mb-4">Achievements</h4>
//         <p>{achievement}</p>

//         {/* Description */}
//         <h4 className="text-lg font-semibold mb-4">Describe Yourself</h4>
//         <p>{description}</p>

//         {/* Declaration*/}
//         <div className="mt-5 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm leading-relaxed text-gray-800 text-justify">
//           <p className="m-0 text-gray-600 text-[0.9rem]">
//             I hereby declare that the information furnished in this Application
//             Form is true to the best of my knowledge and belief. If any wrong
//             information is detected in the future, my candidature for the post
//             may be cancelled at any stage and action can be taken accordingly. I
//             also agree with the terms and conditions mentioned in the detailed
//             advertisement.
//           </p>
//         </div>

//         <div className="flex justify-between items-start mt-5">
//           {/* Left Side: Place and Date */}
//           <div className="flex flex-col">
//             <p>
//               <strong>Place:</strong> {district}
//             </p>{" "}
//             {/* Placeholder for District */}
//             <p>
//               <strong>Date:</strong> {new Date().toLocaleDateString()}
//             </p>{" "}
//             {/* Placeholder for current date */}
//           </div>

//           {/* Right Side: Signature */}
//           <div className="flex flex-col items-center">
//             {signature && (
//               <img
//                 src={signature}
//                 alt="Signature"
//                 className="w-32 h-18 object-contain border border-gray-300"
//               />
//             )}
//             <p className="mt-2 text-sm text-gray-600">Signature of Candidate</p>
//           </div>
//         </div>
//       </Modal.Body>
//       <Modal.Footer className="flex flex-wrap justify-end space-x-4 p-4 border-t-2 border-gray-200">
//         <Button
//           className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
//           onClick={handleClose}
//           id="close-button"
//         >
//           Close
//         </Button>
//         <Button
//           className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
//           onClick={handleDownloadPDF}
//           id="download-button"
//         >
//           Download as PDF
//         </Button>
//         <Link href={certification} target="_blank">
//           Show Certificate
//         </Link>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default FormDownload; 
 
import React from "react"; 
import { Modal, Button } from "react-bootstrap"; 
import jsPDF from "jspdf"; 
import html2canvas from "html2canvas"; 
import Link from "next/link"; 
 
const FormDownload = ({ 
  show, 
  handleClose, 
  firstName, 
  middleName, 
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
  courses, 
 experiences, 
  references, 
  achievement, 
  description, 
  passportPhoto, 
  signature, 
  certification, 
  _id, 
}) => { 
  const dob = 124; // Placeholder for Date of Birth, replace with actual data if needed 
  const id = _id; 
 
  const handleDownloadPDF = () => { 
    const modalContent = document.getElementById("modal-content"); 
    const closeButton = document.getElementById("close-button"); 
    const downloadButton = document.getElementById("download-button"); 
 
    // Hide buttons during capture 
    closeButton.style.display = "none"; 
    downloadButton.style.display = "none"; 
 
    // Temporarily set modal content to auto height and visible overflow to capture full content 
    const originalStyle = { 
      height: modalContent.style.height, 
      maxHeight: modalContent.style.maxHeight, 
      overflow: modalContent.style.overflow, 
    }; 
 
    modalContent.style.height = "auto"; 
    modalContent.style.maxHeight = "none"; 
    modalContent.style.overflow = "visible"; 
 
    // Capture the full modal content using html2canvas 
    html2canvas(modalContent, { 
      scale: 2, 
      useCORS: true, 
    }).then((canvas) => { 
      const imgData = canvas.toDataURL("image/jpeg", 1.0); 
      const pdf = new jsPDF("p", "mm", "a4"); 
      const pdfWidth = pdf.internal.pageSize.getWidth(); 
      const imgHeight = (canvas.height * pdfWidth) / canvas.width; 
      let heightLeft = imgHeight; 
      let position = 0; 
 
      while (heightLeft > 0) { 
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight); 
        heightLeft -= pdf.internal.pageSize.getHeight(); 
        position -= pdf.internal.pageSize.getHeight(); 
        if (heightLeft > 0) { 
          pdf.addPage(); 
        } 
      } 
 
      // Restore the original modal content styles 
      modalContent.style.height = originalStyle.height; 
      modalContent.style.maxHeight = originalStyle.maxHeight; 
      modalContent.style.overflow = originalStyle.overflow; 
 
      // Show buttons back 
      closeButton.style.display = "block"; 
      downloadButton.style.display = "block"; 
 
      // Download the PDF 
      pdf.save("form-preview.pdf"); 
    }); 
  }; 
 
  return ( 
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg" 
      className=" max-w-6xl mx-auto my-4 p-5 bg-white shadow-lg rounded-lg" 
      id="modal-content" 
    > 
      <Modal.Header className="flex flex-col  border-b-2 border-gray-200 p-4"> 
        <div className="flex flex-wrap items-center justify-center "> 
          <image 
            src="/JSSPS-Logo.png" 
            alt="JSSP Logo" 
            className="h-14 object-contain" 
          /> 
          <div className="ml-4 text-center"> 
            <h1 className="text-lg font-bold"> 
              Jharkhand State Sports Promotion Society 
            </h1> 
            <h2 className="text-sm"> 
              (A State Govt. of Jharkhand and CCL Joint Initiative) 
            </h2> 
          </div> 
        </div> 
        <div className="flex flex-wrap justify-between items-center"> 
          <h2 className="text-base font-bold"> 
            Applied For: <span className="text-red-500">{id}</span> 
          </h2> 
          <h2 className="text-base font-bold"> 
            Application ID: <span className="text-blue-500">{id}</span> 
          </h2> 
          <h2 className="text-base font-bold"> 
            Date:{" "} 
            <span className="text-gray-600"> 
              {new Date().toLocaleDateString()} 
            </span> 
          </h2> 
        </div> 
      </Modal.Header> 
      <Modal.Body className="overflow-y-auto max-h-[70vh] p-3 space-y-3"> 
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
              <strong>Date of Birth:</strong> {dob} 
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
              <strong>Is Handicapped:</strong> {isHandicapped} 
            </p> 
          </div> 
          {/* Display Passport Photo */} 
          {passportPhoto && ( 
            <div className="w-1/3 flex justify-center"> 
              <div className="w-35 h-40 border border-black"> 
                <image
                  src={passportPhoto} 
                  alt="Passport" 
                  className="w-full h-full object-cover" 
                /> 
              </div> 
            </div> 
          )} 
        </div> 
 
        {/* Matriculation Section */} 
        <h4 className="text-xl font-semibold mt-4">Matriculation</h4> 
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
        <h4 className="text-xl font-semibold mt-4">Intermediate/+2</h4> 
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
        <h4 className="text-xl font-semibold mt-4"> 
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
 
        {/* Professional Course Details */} 
        <h4 className="text-xl font-semibold mt-4"> 
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
                      {course.courseName} 
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
        <h4 className="text-xl font-semibold mt-4">Experience</h4> 
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
                      {experience.orgName} 
                    </td> 
                    <td className="border border-gray-300 p-2"> 
                      {experience.post} 
                    </td> 
                    <td className="border border-gray-300 p-2"> 
                      {experience.jobType} 
                    </td> 
                    <td className="border border-gray-300 p-2"> 
                      {experience.fromDate} 
                    </td> 
                    <td className="border border-gray-300 p-2"> 
                      {experience.tillDate} 
                    </td> 
                    <td className="border border-gray-300 p-2"> 
                      {experience.scaleOfType} 
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
                </tr> 
              </thead> 
              <tbody> 
                {references.map((reference, index) => ( 
                  <tr key={index}> 
                    <td className="border border-gray-300 p-2"> 
                      {reference.refName} 
                    </td> 
                    <td className="border border-gray-300 p-2"> 
                      {reference.refContact} 
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
              <img 
                src={signature} 
                alt="Signature" 
                className="w-32 h-18 object-contain border border-gray-300" 
              /> 
            )} 
            <p className="mt-2 text-sm text-gray-600">Signature of Candidate</p> 
          </div> 
        </div> 
      </Modal.Body> 
      <Modal.Footer className="flex flex-wrap justify-end space-x-4 p-4 border-t-2 border-gray-200"> 
        <Button 
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" 
          onClick={handleClose} 
          id="close-button" 
        > 
          Close 
        </Button> 
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" 
          onClick={handleDownloadPDF} 
          id="download-button" 
        > 
          Download as PDF 
        </Button> 
        <Link href={certification} target="_blank"> 
          Show Certificate 
        </Link> 
      </Modal.Footer> 
    </Modal> 
  ); 
}; 
 
export default FormDownload; 
 