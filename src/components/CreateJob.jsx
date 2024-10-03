"use client";
import React, { useState } from 'react';
import { AuthProvider, useAuth } from "@/context/authcontext";
import { useRouter } from 'next/router'; // For redirection after creating the post
import Link from 'next/link';

const CreateJob = () => {
  const { user, checkUser } = useAuth(); // Use auth context

  React.useEffect(() => {
    checkUser(); // Check if user is logged in when the app loads
  }, [checkUser]);

  // Form state
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [experienceRequired, setExperienceRequired] = useState('');
  const [educationalBackground, setEducationalBackground] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        companyName,
        jobTitle,
        skillsRequired: skillsRequired.split(',').map(skill => skill.trim()), // Convert to array
        experienceRequired,
        educationalBackground,
        location,
        salary,
        jobDescription,
      };

      const response = await fetch('http://localhost:5000/api/createpost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setMessage('Job post created successfully!');
        setError('');
        // Optionally redirect after creating the post
        // useRouter().push('/some-page');
      } else {
        setMessage('');
        setError('Error creating job post. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setMessage('');
      setError('Error creating job post. Please try again.');
    }
  };

  // Check if user is authenticated and allowed to create a post
  if (!checkUser) {
    return <Link href='/admin' className="text-teal-600">Please Log In To Create Post</Link>; // Redirecting message if the user is not authenticated
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Create Job Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Skills Required (comma-separated)"
            value={skillsRequired}
            onChange={(e) => setSkillsRequired(e.target.value)}
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Experience Required"
            value={experienceRequired}
            onChange={(e) => setExperienceRequired(e.target.value)}
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Educational Background"
            value={educationalBackground}
            onChange={(e) => setEducationalBackground(e.target.value)}
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <textarea
            placeholder="Job Description"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-500 transition duration-300"
          >
            Create Job Post
          </button>
        </form>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default CreateJob;
