"use client";
import React, { useState } from "react";
import {
  ApplicantAuthProvider,
  useApplicantAuth,
} from "@/context/ApplicantAuthProvider";
import { sendPasswordResetEmail } from "@/api"; // Assume this function makes an API call to the server
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome icons
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons"; // Import toggle icons
import { FaDownload } from "react-icons/fa";
import FormDownloadApp from "@/components/FormDownloadApplicant";

const ApplicantDashboard = () => {
  const { applicant, applicantLogout } = useApplicantAuth(); // Make sure logout is available from your context
  const [active, setActive] = useState("vacancies"); // State to track active sidebar option
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [menuOpen, setMenuOpen] = useState(false); // State for toggle menu visibility
  const [message, setMessage] = useState("");
  const [previewIndex, setPreviewIndex] = useState(null);

  // console.log(applicant);
  const handlePreview = (id) => {
    setPreviewIndex(id); // Set the applicant ID when the preview button is clicked
  };

  const handleClosePreview = () => {
    setPreviewIndex(null); // Close the modal by resetting the applicant ID
  };
  const handleSetActive = (section) => {
    setActive(section); // Set the active section in the sidebar
    setSidebarOpen(false); // Close the sidebar when an option is selected
    setMenuOpen(false); // Close the toggle menu when an option is selected
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  const deleteApplicant = async (jobid, applicantId) => {
    const url = `https://9dwb3ngewc.execute-api.ap-south-1.amazonaws.com/dev/api/posts/${jobid}/applications/${applicantId}`;
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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle mobile menu visibility
    setSidebarOpen(false); // Close the sidebar when the toggle menu is opened
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPasswordResetEmail(applicant.email);
      if (response.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage("Failed to send password reset email. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    // Reset the active state or perform any other action when "No" is clicked
    setActive(""); // Assuming you use setActive to control the displayed content
  };
  function checkTitle(code) {
    // Extract the first two characters from the input code
    const title = code.substring(0, 2);

    // Check the title and return the corresponding value
    if (title === "CO") return "Coach";
    else if (title === "AC") return "Assistant Coach";
    else if (title === "HC") return "Head Coach";
    else return "Unknown Title"; // Optional default case if no match
  }
  return (
    <div>
      {applicant ? (
        <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-300 ease-in-out">
          {/* Top Navbar */}
          <header className="w-full bg-teal-50 text-white py-2 px-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
              <Link href="/jobs">
                <Image
                  src="/JSSPS.webp"
                  alt="Company Logo"
                  width={190}
                  height={100}
                  quality={100}
                  className="h-10 sm:h-20 w-auto object-contain"
                />
              </Link>
              <div className="ml-2 sm:ml-5">
                <h1 className="text-xs sm:text-xl font-bold text-teal-950">
                  Jharkhand State Sports Promotion Society
                </h1>
                <p className="text-xs sm:text-md text-teal-950">
                  (A State Govt. of Jharkhand and CCL Joint Initiative)
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="hidden lg:flex items-center">
                {" "}
                {/* Hide on mobile */}
                <p className="mr-2 text-black font-bold">{applicant.email}</p>
                <span className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-600">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-blue-950 text-2xl"
                  />
                </span>
              </div>
              {/* Mobile Toggle Button */}
              <button onClick={toggleMenu} className="lg:hidden p-2 text-black">
                <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />{" "}
                {/* Toggle icon */}
              </button>
            </div>
          </header>

          {/* Sidebar and Main Content */}
          <div className="flex flex-grow">
            {/* Sidebar */}
            <aside
              className={`fixed lg:static bg-gray-800 text-white w-64 lg:block lg:translate-x-0 transition-transform duration-300 ease-in-out    
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold text-center mb-4">
                  Applicant Dashboard
                </h2>
                <nav>
                  <ul>
                    <li className="mb-2">
                      <h2
                        className={`block p-2 rounded transition duration-300    
                      ${
                        active === "vacancies"
                          ? "bg-teal-600 text-white"
                          : "text-white hover:bg-teal-700"
                      }`}
                        onClick={() => handleSetActive("vacancies")}
                      >
                        Vacancies
                      </h2>
                    </li>
                    <li className="mb-2">
                      <h2
                        className={`block p-2 rounded transition duration-300    
                    ${
                      active === "change-password"
                        ? "bg-teal-600 text-white"
                        : "text-white hover:bg-teal-700"
                    }`}
                        onClick={() => handleSetActive("change-password")}
                      >
                        Change Password
                      </h2>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className={`block p-2 rounded transition duration-300    
                    ${
                      active === "logout"
                        ? "bg-red-600 text-white"
                        : "text-white hover:bg-red-500"
                    }`}
                      >
                        <button onClick={applicantLogout}> Logout </button>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Mobile Toggle Menu */}
            {menuOpen && (
              <div className="absolute top-20 left-0 right-0 bg-gray-800 text-white z-50 p-4 shadow-lg">
                <div className="flex items-center justify-center">
                  <p className="mr-2 text-white font-bold">{applicant.email}</p>
                  <span className="h-8 w-8 flex items-center justify-center rounded-full bg-teal-600">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-blue-950 text-xl"
                    />{" "}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-center mb-4">
                  Applicant Menu
                </h2>
                <nav>
                  <ul>
                    <li className="mb-2">
                      <h2
                        className={`block p-2 rounded transition duration-300     
                      ${
                        active === "vacancies"
                          ? "bg-teal-600 text-white"
                          : "text-white hover:bg-teal-700"
                      }`}
                        onClick={() => handleSetActive("vacancies")}
                      >
                        Vacancies
                      </h2>
                    </li>
                    <li className="mb-2">
                      <h2
                        className={`block p-2 rounded transition duration-300     
                      ${
                        active === "change-password"
                          ? "bg-teal-600 text-white"
                          : "text-white hover:bg-teal-700"
                      }`}
                        onClick={() => handleSetActive("change-password")}
                      >
                        Change Password
                      </h2>
                    </li>
                    <li>
                      <li>
                        <Link
                          href="/"
                          className={`block p-2 rounded transition duration-300     
                    ${
                      active === "logout"
                        ? "bg-teal-600 text-white"
                        : "text-white hover:bg-teal-700"
                    }`}
                        >
                          <button onClick={applicantLogout}> Logout </button>
                        </Link>
                      </li>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

            {/* Main Content Area */}
            <main className="flex-grow p-4 lg:p-8 transition-all duration-300 ease-in-out">
              {active === "" ? (
                <div className="text-center">
                  <Image
                    src="/JSSPS.webp"
                    alt="Logo"
                    width={220}
                    height={120}
                    className="mb-4 h-auto w-auto mx-auto"
                  />
                  <h1 className="text-3xl font-bold mb-4">
                    Welcome to Your Dashboard
                  </h1>
                  <p className="text-lg text-gray-600">
                    Please select an option from the menu to get started.
                  </p>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  {/* Render content based on the active state */}
                  {active === "vacancies" && (
                    <div>
                      {applicant.appliedPositions.map((item, index) => {
                        return (
                          <div key={index} className="m-5">
                            <div className="p-4 bg-white rounded-lg shadow-lg mb-4">
                              {/* Submission Status */}
                              <h2
                                className={`text-lg font-semibold ${
                                  item.submitted
                                    ? "text-green-600"
                                    : "text-yellow-500"
                                }`}
                              >
                                {item.submitted
                                  ? "Application Submitted Successfully"
                                  : "Saved Draft"}
                              </h2>

                              {/* Application ID */}
                              <h2 className="text-gray-700 text-sm mt-2">
                                <span className="font-semibold">
                                  Application ID:
                                </span>{" "}
                                {item.applicationId}
                              </h2>

                              {/* Application Title */}
                              <h2 className="text-gray-700 text-sm mb-4">
                                <span className="font-semibold">Title:</span>{" "}
                                {checkTitle(item.applicationId)}
                              </h2>

                              {/* Edit Link: Only show if the application is not submitted */}
                              {!item.submitted && (
                                <Link href={`/applicant-dashboard/${index}`}>
                                  <button className="text-blue-600 hover:text-blue-800 font-semibold underline">
                                    Edit Application
                                  </button>
                                </Link>
                              )}
                              {item.submitted && (
                                <div>
                                  <button
                                    onClick={() => handlePreview(index)} // Pass the applicant ID to handlePreview
                                    className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
                                  >
                                    <FaDownload className="mr-2 " /> View &
                                    Download
                                  </button>
                                  <FormDownloadApp
                                    show={previewIndex === index} // Conditionally show the modal based on the applicant ID
                                    handleClose={handleClosePreview}
                                    applicant={item}
                                  />
                                </div>
                              )}
                            </div>

                            {/* <h2 
                              className="text-red-600"  
                              onClick={() => 
                                deleteApplicant(item.jobId, item._id) 
                              } // Wrap in an arrow function 
                            >  
                              Delete  
                            </h2> */}
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {active === "change-password" && (
                    <div className="bg-white p-4 rounded-md shadow-md max-w-md mx-auto">
                      <h2 className="text-xl font-semibold mb-4">
                        Change Password
                      </h2>
                      <p className="text-gray-700 mb-2">
                        Are you sure you want to change your password?
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={handleForgotPassword}
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                        >
                          Yes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-300"
                        >
                          No
                        </button>
                      </div>
                      {message && (
                        <span className="block mt-4 text-green-500">
                          {message}
                        </span>
                      )}
                    </div>
                  )}

                  {active === "logout" && <div>Logout Content</div>}
                </div>
              )}
            </main>
          </div>
        </div>
      ) : (
        "Please Login First"
      )}
    </div>
  );
};

export default function AppWrapper({ params }) {
  return (
    <ApplicantAuthProvider>
      <ApplicantDashboard />
    </ApplicantAuthProvider>
  );
}
