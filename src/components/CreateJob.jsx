"use client";
import React, { useState } from "react";
import { AuthProvider, useAuth } from "@/context/authcontext";
import { useRouter } from "next/router"; // For redirection after creating the post
import Link from "next/link";

const CreateJob = () => {
  const { user, checkUser } = useAuth(); // Use auth context

  React.useEffect(() => {
    checkUser(); // Check if user is logged in when the app loads
  }, [checkUser]);

  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [ageEligibility, setAgeEligibility] = useState("");
  const [ageEligibilityDate, setAgeEligibilityDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobDetail, setJobDetail] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        jobTitle,
        skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()), // Convert to array
        experienceRequired,
        ageEligibility,
        ageEligibilityDate,
        deadline,
        location,
        salary,
        jobDescription,
        jobDetail
      };

      const response = await fetch("https://9dwb3ngewc.execute-api.ap-south-1.amazonaws.com/dev/api/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setMessage("Job post created successfully!");
        setError("");
      } else {
        setMessage("");
        setError("Error creating job post. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("");
      setError("Error creating job post. Please try again.");
    }
  };

  // Check if user is authenticated and allowed to create a post
  if (!checkUser) {
    return (
      <Link href="/admin" className="text-teal-600">
        Please Log In To Create Post
      </Link>
    ); // Redirecting message if the user is not authenticated
  }

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-teal rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Create Job Post
        </h2>
        <div className="overflow-y-auto max-h-96">
          {/* Scrollable container */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mb-3">
              {/* Row for Job Title */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Job Title
                </label>
                <input
                  type="text"
                  placeholder="Enter the job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Row for Skills Required */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Skills Required
                </label>
                <input
                  type="text"
                  placeholder="Comma-separated skills"
                  value={skillsRequired}
                  onChange={(e) => setSkillsRequired(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Row for Experience */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Experience Required
                </label>
                <input
                  type="text"
                  placeholder="Enter required experience"
                  value={experienceRequired}
                  onChange={(e) => setExperienceRequired(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Row for Deadline */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Row for Age Eligibility */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Age Eligibility
                </label>
                <input
                  type="text"
                  placeholder="Enter age eligibility"
                  value={ageEligibility}
                  onChange={(e) => setAgeEligibility(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Row for Age Eligibility Date */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Age Eligibility Date
                </label>
                <input
                  type="date"
                  value={ageEligibilityDate}
                  onChange={(e) => setAgeEligibilityDate(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            

              {/* Row for Location */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter job location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Row for Salary */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Salary
                </label>
                <input
                  type="text"
                  placeholder="Enter salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Row for Job Description */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Job Description
                </label>
                <textarea
                  placeholder="Enter job description"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                  className="w-full md:w-3/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows="4"
                ></textarea>
              </div>

              {/* Row for Job Detail PDF Upload */}
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="w-full md:w-1/4 mb-2 md:mb-0 font-semibold text-teal-600">
                  Job Detail PDF
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  value={jobDetail}
                  onChange={(e) => setJobDetail(e.target.value)}
                  className="w-full md:w-3/4 p-3 border rounded-lg text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-500 transition duration-300"
            >
              Create Job Post
            </button>
          </form>
        </div>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default CreateJob;
