"use client";
import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/authcontext"; // Import your Auth Context
import AdminJobList from "@/components/AdminJoblist"; // Import AdminJobList component
import Login from "@/components/Login"; // Login component
import Signup from "@/components/Signup"; // Signup component
import Image from "next/image"; // Next.js optimized image component
import CreateJob from "@/components/CreateJob"; // Create Job component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Font Awesome icons
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons'; // Import toggle icons
import Link from "next/link";

const AdminDashboard = () => { 
  const { user, checkUser, logout } = useAuth(); // Use auth context 
  const [active, setActive] = useState(""); // State to track active sidebar option 
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [menuOpen, setMenuOpen] = useState(false); // State for toggle menu visibility
  const [admins, setAdmins] = useState([]); // State to store admin list

  // Check if user is logged in on component mount 
  useEffect(() => {
    checkUser();
  }, [checkUser]);

   // Fetch admins when 'Admin List' is selected
   useEffect(() => {
    if (active === "admin-list") {
      fetchAdmins();
    }
  }, [active]);

  //Fetch Admins
  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admins'); // Fetch from the backend
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Fetched Admins:', data); // Log the fetched data
  
      setAdmins(data);
      console.log('Updated admins state:', data); // Log the updated state
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };
  

  // Handle remove admin
  const handleRemoveAdmin = async (adminId) => {
    try {
      await fetch(`http://localhost:5000/api/admins/${adminId}`, {
        method: 'DELETE',
      });
      setAdmins(admins.filter((admin) => admin._id !== adminId)); // Use _id from MongoDB
    } catch (error) {
      console.error('Error removing admin:', error);
    }
  };

  const handleSetActive = (section) => {
    setActive(section); // Set the active section in the sidebar 
    setSidebarOpen(false); // Close the sidebar when an option is selected (mobile optimization)
    setMenuOpen(false); // Close the toggle menu when an option is selected (mobile optimization)
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle mobile menu visibility
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
      {/* Check if the user is not logged in, and render the login component */}
      {!user ? (
        <Login />
      ) : (
        <>
          {/* Top Navbar */}
          <header className="w-full bg-teal-600 text-white py-4 px-6 flex justify-between items-center shadow-lg">
          <div className="flex items-center">
          <Link href="/"> {/* Wrap the Image component with Link */}
            <Image
              src="/JSSPS-Logo.png" // Replace with your logo path
              alt="Company Logo"
              width={60}
              height={80}
              className="mr-4" // Adjust size as necessary
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
              <p className="mr-4">Admin Name</p> {/* Dynamic admin name */}
              <span className="h-10 w-10 flex items-center justify-center rounded-full bg-teal-600">
              <FontAwesomeIcon icon={faUser} className="text-blue-950 text-2xl" /> {/* Admin Icon */}
              </span>
            </div>

            {/* Mobile Toggle Button */}
            <button onClick={toggleMenu} className="lg:hidden p-2 text-white">
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" /> {/* Toggle icon */}
            </button>
          </header>

          {/* Sidebar and Main Content */}
          <div className="flex flex-grow">
            {/* Sidebar (desktop) */}
            <aside
              className={`fixed lg:static bg-gray-800 text-white w-64 lg:block lg:translate-x-0 transition-transform duration-300 ease-in-out 
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
              <div className="p-4">
                <h2 className="text-2xl font-bold text-center mb-4">Admin Panel</h2>
                <nav>
                  <ul>
                    {menuItems.map((item) => (
                      <li className="mb-2" key={item.value}>
                        <button
                          className={`block p-2 rounded w-full text-left transition duration-300 
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

            {/* Mobile Toggle Menu */}
            {menuOpen && (
              <div className="absolute top-16 left-0 right-0 bg-gray-800 text-white z-50 p-4 shadow-lg">
                <h2 className="text-xl font-bold text-center mb-4">Admin Menu</h2>
                <nav>
                  <ul>
                    {menuItems.map((item) => (
                      <li className="mb-2" key={item.value}>
                        <button
                          className={`block p-2 rounded w-full text-left transition duration-300 
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

            {/* Main Content Area */}
            <main className="flex-grow p-4 lg:p-8 transition-all duration-300 ease-in-out">
              {active === "" ? (
                <div className="text-center">
                  <Image
                    src="/JSSPS-Logo.png" // Replace with your logo path
                    alt="Logo"
                    width={100}
                    height={100}
                    className="mb-4 h-16 w-16 mx-auto"
                  />
                  <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
                  <p className="text-lg text-gray-600">Please select an option from the menu to get started.</p>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md w-full">
                  {/* Render content based on active selection */}
                  {active === "create-job" && <CreateJob />}
                  {active === "job-list" && <AdminJobList />}
                  {active === "admin-list" && (
                    <div>
                      <h2 className="text-2xl font-bold mb-4">Admin List</h2>
                      {admins.length === 0 ? (
                        <p>No admins available.</p>
                      ) : (
                        <ul>
                          {admins.map((admin) => (
                            <li key={admin._id} className="flex justify-between items-center mb-2">
                              <div>
                                <p className="font-bold">{admin.name}</p>
                                <p className="text-sm text-gray-600">{admin.email}</p>
                              </div>
                              <button
                                onClick={() => handleRemoveAdmin(admin._id)}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {active === "create-admin" && <Signup />}
                </div>
              )}
            </main>
          </div>
        </>
      )}
    </div>
  );
};

// Wrap the AdminDashboard component with AuthProvider
export default function AdminDashboardWrapper() {
  return (
    <AuthProvider>
      <AdminDashboard />
    </AuthProvider>
  );
}
