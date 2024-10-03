"use client";
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/authcontext"; // Import your Auth Context
import AdminJobList from "@/components/AdminJoblist"; // Import AdminJobList component
import Login from "@/components/Login"; // Login component
import Signup from "@/components/Signup"; // Signup component
import Image from "next/image"; // Next.js optimized image component
import CreateJob from "@/components/CreateJob";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome icons
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; // Import toggle icons

const AdminDashboard = () => {
  const { user, checkUser, logout } = useAuth(); // Use auth context
  const [active, setActive] = useState(""); // State to track active sidebar option
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [menuOpen, setMenuOpen] = useState(false); // State for toggle menu visibility

  useEffect(() => {
    checkUser(); // Check if user is logged in when the app loads
  }, [checkUser]);

  const handleSetActive = (section) => {
    setActive(section); // Set the active section in the sidebar
    setSidebarOpen(false); // Close the sidebar when an option is selected
    setMenuOpen(false); // Close the toggle menu when an option is selected
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu visibility
    setSidebarOpen(false); // Close the sidebar when the toggle menu is opened
  };

  const menuItems = [
    { label: "Create Job", value: "create-job" },
    { label: "Job List", value: "job-list" },
    { label: "Admin List", value: "admin-list" },
    { label: "Create Admin", value: "create-admin" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 transition-all duration-300 ease-in-out">
      {!user ? (
        <Login /> // If no user is logged in, show login page
      ) : (
        <>
          {/* Top Navbar */}
          <header className="w-full bg-teal-600 text-white py-4 px-6 flex justify-between items-center shadow-lg">
            <div className="flex items-center">
              <Image
                src="/JSSPS-Logo.png" // Replace with your logo path
                alt="Admin Logo"
                width={60}
                height={80}
                className="mr-4" // Adjust size as necessary
              />
              <h1 className="text-2xl font-bold text-blue-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <p className="mr-4">Admin Name</p> {/* Replace with dynamic name */}
              <Image
                src="/" // Replace with the actual profile picture
                alt="Profile"
                width={100}
                height={100}
                className="h-10 w-10 rounded-full"
              />
            </div>
            <button onClick={toggleMenu} className="lg:hidden p-2 text-white">
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" /> {/* Toggle icon */}
            </button>
          </header>

          {/* Sidebar and Main Content */}
          <div className="flex flex-grow">
            {/* Sidebar */}
            {!menuOpen && (
              <aside
                className={`w-64 bg-gray-800 text-white shadow-md h-screen transition-transform duration-300 ease-in-out
                  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                  lg:translate-x-0 lg:block`} // Fixed height and apply transformations based on sidebar state
              >
                <div className="p-4">
                  <h2 className="text-2xl font-bold text-center mb-4">Admin Panel</h2>
                  <nav>
                    <ul>
                      {menuItems.map(item => (
                        <li className="mb-2" key={item.value}>
                          <button
                            className={`block p-2 rounded transition duration-300 w-full text-left 
                              ${active === item.value ? "bg-teal-600" : "hover:bg-teal-700"}`}
                            onClick={() => handleSetActive(item.value)}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                      <li>
                        <button
                          className="block p-2 rounded transition duration-300 text-gray-300 hover:bg-teal-700 w-full text-left"
                          onClick={() => logout()}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </aside>
            )}

            {/* Toggle Menu */}
            {menuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-gray-800 text-white z-50 p-4 shadow-lg">
                <h2 className="text-xl font-bold text-center mb-4">Admin Menu</h2>
                <nav>
                  <ul>
                    {menuItems.map(item => (
                      <li className="mb-2" key={item.value}>
                        <button
                          className={`block p-2 rounded transition duration-300 w-full text-left 
                            ${active === item.value ? "bg-teal-600" : "hover:bg-teal-700"}`}
                          onClick={() => handleSetActive(item.value)}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        className="block p-2 rounded transition duration-300 text-gray-300 hover:bg-teal-700 w-full text-left"
                        onClick={() => logout()}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

            {/* Main Content */}
            <main className={`flex-grow p-4 lg:p-8 transition-all duration-300 ease-in-out`}>
              {active === "" ? (
                <div className="text-center">
                  <Image
                    src="/JSSPS-Logo.png" // Replace with your logo's path
                    alt="Logo"
                    width={100}
                    height={100}
                    className="mb-4 h-16 w-16 mx-auto"
                  />
                  <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
                  <p className="text-lg text-gray-600">Please select an option from the menu to get started.</p>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md w-full transition-all duration-300 ease-in-out">
                  {/* Render content based on the active state */}
                  {active === "create-job" && <CreateJob />} {/* Job list component */}
                  {active === "job-list" && <AdminJobList />}
                  {active === "admin-list" && <div>Admin List Content</div>} {/* Admin list content */}
                  {active === "create-admin" && <Signup />} {/* Create admin component */}
                </div>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

// Wrap the AdminDashboard component with AuthProvider so the context is available throughout the app
export default function AdminDashboardWrapper() {
  return (
    <AuthProvider>
      <AdminDashboard />
    </AuthProvider>
  );
}
