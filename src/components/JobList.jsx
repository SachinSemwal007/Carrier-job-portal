"use client";
import React, { useState, useEffect } from 'react';
import { getJobPosts } from '../api';
import JobCard from './JobCard';

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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Job Listings</h2>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Job Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Sort Dropdown */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>

        {/* Location Filter */}
        <select
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-full md:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Locations</option>
          <option value="Remote">Remote</option>
          <option value="New York">New York</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Job Cards Container */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobList;
