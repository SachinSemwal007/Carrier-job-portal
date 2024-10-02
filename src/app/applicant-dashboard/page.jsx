"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const ApplicantDashboard = () => {
  const [active, setActive] = useState(""); // No active section on initial load

  const handleSetActive = (section) => {
    setActive(section);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <header className="w-full bg-teal-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src="/JSSPS-Logo.png" // Replace with your logo path
            alt="Company Logo"
            width={60}
            height={80}
            className=" mr-4" // Adjust size as necessary
          />
          <h1 className="text-2xl font-bold text-blue-900">JSSPS Careers</h1>
        </div>
        <div className="flex items-center">
          <p className="mr-4">Applicant Name</p>{" "}
          {/* Replace with dynamic name if needed */}
          <Image
            src="/" // Replace with the actual profile picture
            alt="Profile"
            width={100}
            height={100}
            className="h-10 w-10 rounded-full"
          />
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-4">
            <h2 className="text-2xl font-bold text-center mb-4">
              Applicant Dashboard
            </h2>
            <nav>
              <ul>
                <li className="mb-2">
                  <Link
                    href="/applicant-dashboard/vacancies"
                    className={`block p-2 rounded transition duration-300 
                      ${
                        active === "ad-vacancies"
                          ? "bg-teal-600 text-white"
                          : "text-gray-700 hover:bg-teal-100"
                      }`}
                    onClick={() => handleSetActive("vacancies")}
                  >
                    Vacancies
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/applicant-dashboard/profile"
                    className={`block p-2 rounded transition duration-300 
                      ${
                        active === "profile"
                          ? "bg-teal-600 text-white"
                          : "text-gray-700 hover:bg-teal-100"
                      }`}
                    onClick={() => handleSetActive("profile")}
                  >
                    Profile
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/applicant-dashboard/change-password"
                    className={`block p-2 rounded transition duration-300 
                      ${
                        active === "change-password"
                          ? "bg-teal-600 text-white"
                          : "text-gray-700 hover:bg-teal-100"
                      }`}
                    onClick={() => handleSetActive("change-password")}
                  >
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={`block p-2 rounded transition duration-300 
                      ${
                        active === "logout"
                          ? "bg-teal-600 text-white"
                          : "text-gray-700 hover:bg-teal-100"
                      }`}
                    onClick={() => handleSetActive("logout")}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8 flex items-center justify-center">
          {active === "" ? (
            <div className="text-center">
              <Image
                src="/JSSPS-Logo.png" // Replace with your logo's path
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
            {active === "vacancies" && <div>Vacancies Content</div>}
            {active === "profile" && <div>Profile Content</div>}
            {active === "change-password" && <div>Change Password Content</div>}
            {active === "logout" && <div>Logout Content</div>}
          </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ApplicantDashboard;
