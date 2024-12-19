"use client"; 
import React, { useState, useEffect } from "react"; 
import { getJobPosts } from "../api"; 
import AdminJobCard from "./AdminJobCard"; // Make sure AdminJobCard supports props for edit and delete actions
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome icons
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"; // Edit and delete icons

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
    <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-hidden">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <div className="mb-4 flex flex-col md:flex-row md:justify-between">
        <input type="text" placeholder="Search Job Title" value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 p-2 rounded w-full md:w-1/2 mr-2 mb-2 md:mb-0" />
        <div className="flex items-center">
          <select onChange={(e) => setSort(e.target.value)} className="border border-gray-300 p-2 rounded mr-2">
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select> 
        </div>
      </div>

      <div className=" overflow-y-auto"> 
        {" "} 
        {/* Scrollable area */} 
        {jobs.length > 0 ? ( 
          jobs.map((job) => ( 
            <div key={job._id} className="flex justify-between items-center p-4 border-b border-gray-300"> 
              <AdminJobCard job={job} refreshJobs={fetchJobs} /> 
            </div>
          ))
        ) : (
          <p className="text-gray-600">No job listings available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminJobList;
