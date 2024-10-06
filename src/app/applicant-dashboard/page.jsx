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
import Vacancies from "./vacancies/page"; 

const ApplicantDashboard = () => {
  const { applicant, applicantLogout } = useApplicantAuth(); // Make sure logout is available from your context 
  const [active, setActive] = useState(""); // State to track active sidebar option 
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [menuOpen, setMenuOpen] = useState(false); // State for toggle menu visibility
  const [message, setMessage] = useState(""); 

  const handleSetActive = (section) => {
    setActive(section); // Set the active section in the sidebar
    setSidebarOpen(false); // Close the sidebar when an option is selected
    setMenuOpen(false); // Close the toggle menu when an option is selected
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
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

  return (
    <div> 
      {applicant ? ( 
        <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-300 ease-in-out"> 
          {/* Top Navbar */} 
          <header className="w-full bg-teal-500 text-white py-4 px-6 flex justify-between items-center shadow-lg"> 
            <div className="flex items-center"> 
              <Link href="/"> 
                <Image 
                  src="/JSSPS-Logo.png" // Replace with your logo path 
                  alt="Company Logo" 
                  width={60} 
                  height={80} 
                  className="mr-4 h-20 w-auto" // Adjust size as necessary 
                /> 
              </Link> 
              <div> 
                <h1 className="text-xl font-bold text-teal-950"> 
                  Jharkhand State Sports Promotion Society 
                </h1> 
                <p className="text-md text-teal-950"> 
                  (A State Govt. of Jharkhand and CCL Joint Initiative) 
                </p> 
              </div> 
            </div> 
 
            <div className="flex items-center"> 
              <p className="mr-4">Applicant Name</p> 
              <span className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-600"> 
                <FontAwesomeIcon 
                  icon={faUser} 
                  className="text-blue-950 text-2xl" 
                />{" "} 
                {/* Applicant Icon */} 
              </span> 
              {/* Mobile Toggle Button */} 
              <button onClick={toggleMenu} className="lg:hidden p-2 text-white"> 
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
                        ? "bg-teal-600 text-white" 
                        : "text-white hover:bg-teal-700" 
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
                    src="/JSSPS-Logo.png" 
                    alt="Logo" 
                    width={100} 
                    height={100} 
                    className="mb-4 h-16 w-16 mx-auto" 
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
                            <h2> 
                              {item.submitted ? ( 
                                <h2 className="text-green-600"> 
                                  Application Under Review 
                                </h2> 
                              ) : ( 
                                <h2 className="text-yellow-300">Draft</h2> 
                              )} 
                            </h2> 
                            <h2>{item.postId}</h2> 
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
