"use client";
import React, { useState } from 'react';
import { AuthProvider, useAuth } from "@/context/authcontext";
import { useRouter } from 'next/router'; // For redirection after creating the post
import Link from 'next/link';

const App = () => {
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
      // Assume the user is authenticated, and we make a simple API call to create the post
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

      // Make the API call to create the post (replace this URL with your actual backend endpoint)
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
    return <Link href='/admin'>Please Log In To Create Post</Link>; // Redirecting message if the user is not authenticated
  }

  return (
    <div>
      <h2>Create Job Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Skills Required (comma-separated)"
          value={skillsRequired}
          onChange={(e) => setSkillsRequired(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Experience Required"
          value={experienceRequired}
          onChange={(e) => setExperienceRequired(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Educational Background"
          value={educationalBackground}
          onChange={(e) => setEducationalBackground(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit">Create Job Post</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
