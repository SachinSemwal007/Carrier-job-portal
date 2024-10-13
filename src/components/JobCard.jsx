"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const JobCard = ({ job }) => {
  const router = useRouter();
  const [message, setMessage] = useState(""); // State to show messages

  function getFirstLetters(inputString) {
    const words = inputString.split(" ");
    let firstLetters = words.map((word) => word.charAt(0));
    if (inputString == "Coach") {
      firstLetters = `${firstLetters}O`;
      return firstLetters;
    } else {
      return firstLetters.join("");
    }
  }

  // Handle Apply button click
  const handleApply = () => {
    router.push(
      `/applicant-form/${job._id}?title=${getFirstLetters(job.jobTitle)}`
    );
  };

  return (
    <div className="relative bg-white bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg p-5 w-[320px] h-[360px] mx-auto flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-white duration-300 ease-in-out">
      {/* Decorative Circles for a Stylish Look */}
      <div className="absolute top-[-10px] right-[-10px] bg-blue-400 rounded-full h-16 w-16 opacity-20 blur-2xl"></div>
      <div className="absolute bottom-[-20px] left-[-20px] bg-purple-400 rounded-full h-20 w-20 opacity-20 blur-3xl"></div>

      {/* Application Deadline */}
      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-3 rounded-full animate-bounce shadow-lg z-10">
        Deadline:{" "}
        {new Date().toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </div>

      {/* Job Title */}
      <h3 className="text-xl font-bold text-gray-800 mb-3 truncate-2-lines">
        {job.jobTitle}
      </h3>

      {/* Job Details */}
      <div>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-semibold">Company:</span> {job.companyName}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-semibold">Location:</span> {job.location}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-semibold">Salary:</span> {job.salary}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Posted:</span>{" "}
          {new Date(job.postedDate).toLocaleDateString()}
        </p>
      </div>

      {/* Call to Action Button */}
      <button
        onClick={handleApply}
        className="mt-4 py-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 text-white rounded-full font-medium hover:from-teal-500 hover:via-cyan-600 hover:to-teal-700 transition-all duration-300 shadow-md"
      >
        Apply Now
      </button>

      {/* Message Display */}
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default JobCard;
