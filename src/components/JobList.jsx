"use client";
import React, { useState, useEffect } from 'react';
import { getJobPosts } from '../api';
import JobCard from './JobCard';
import Navbar from './Navbar';  // Import Navbar component
import Footer from './Footer';  // Import Footer component

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ location: '', experience: '', salary: '' });
  const [sort, setSort] = useState('desc');
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    const { data } = await getJobPosts({
      jobTitle: search,
      location: filters.location,
      experienceRequired: filters.experience,
      salary: filters.salary,
      sort,
      page,
    });
    setJobs(data.jobPosts);
  };

  useEffect(() => {
    fetchJobs();
  }, [search, filters, sort, page]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
      {/* Navbar at the top */}
     

      <main className="flex-grow container mx-auto px-6 sm:px-8 py-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          Job Listings
        </h2>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Job Title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 p-3 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSort(e.target.value)}
            className="w-full sm:w-1/4 p-3 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>

          {/* Location Filter */}
          <select
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="w-full sm:w-1/4 p-3 bg-white border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="New York">New York</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Job Cards Container */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center space-x-4">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            className="px-6 py-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:from-teal-500 hover:via-cyan-600 hover:to-teal-700 transition-all duration-300"

          >
            Previous
          </button>
          <button
            onClick={() => setPage((prevPage) => prevPage + 1)}
            className="px-6 py-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 text-white font-semibold rounded-full shadow-lg hover:from-teal-500 hover:via-cyan-600 hover:to-teal-700 transition-all duration-300"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default JobList;
