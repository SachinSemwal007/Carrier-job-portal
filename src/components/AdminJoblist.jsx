"use client";
import React, { useState, useEffect } from "react";
import { getJobPosts } from "../api";
import AdminJobCard from "./AdminJobCard";

const AdminJobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ location: "", experience: "", salary: "" });
  const [sort, setSort] = useState("desc");
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
    <div>
      <h2>Job Listings</h2>
      <input type="text" placeholder="Search Job Title" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select onChange={(e) => setSort(e.target.value)}>
        <option value="desc">Newest</option>
        <option value="asc">Oldest</option>
      </select>
      <select onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
        <option value="">All Locations</option>
        <option value="Remote">Remote</option>
        <option value="New York">New York</option>
        {/* Add more options */}
      </select>
      <div className="flex flex-wrap">
        {jobs.map((job) => (
          <AdminJobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default AdminJobList;
