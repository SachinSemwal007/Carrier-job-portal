'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // App Router's useRouter for navigation
import { AuthProvider, useAuth } from '@/context/authcontext';

const UpdatePost = ({ params }) => {
  const id = params.updateJob; // Get the dynamic post id from the params
  const { user, checkUser } = useAuth(); // Check if the user is authenticated
  const router = useRouter();

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

  // Check user authentication on component mount
  useEffect(() => {
    checkUser(); // Ensure the user is authenticated
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [user, checkUser, router]);

  // Handle form submission for updating the job post
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        companyName,
        jobTitle,
        skillsRequired: skillsRequired.split(',').map((skill) => skill.trim()), // Convert to array
        experienceRequired,
        educationalBackground,
        location,
        salary,
        jobDescription,
      };

      const response = await fetch(`https://9dwb3ngewc.execute-api.ap-south-1.amazonaws.com/dev/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setMessage('Job post updated successfully!');
        setError('');
        router.push('/admin'); // Redirect after successful update
      } else {
        setMessage('');
        setError('Error updating job post. Please try again.');
      }
    } catch (err) {
      console.error('Error updating job post:', err);
      setMessage('');
      setError('Error updating job post. Please try again.');
    }
  };

  // If user is not authenticated, show a message
  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-semibold mb-6">Update Job Post</h2>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-gray-700">Company Name</label>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Job Title</label>
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Skills Required</label>
              <input
                type="text"
                placeholder="Skills Required (comma-separated)"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Experience Required</label>
              <input
                type="text"
                placeholder="Experience Required"
                value={experienceRequired}
                onChange={(e) => setExperienceRequired(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Educational Background</label>
              <input
                type="text"
                placeholder="Educational Background"
                value={educationalBackground}
                onChange={(e) => setEducationalBackground(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Salary</label>
              <input
                type="text"
                placeholder="Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">Job Description</label>
              <textarea
                placeholder="Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors"
            >
              Update Job Post
            </button>
          </form>
          {message && <p className="mt-4 text-green-500">{message}</p>}
          {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
      </main>
    </div>
  );
};

// Exporting with AuthProvider
export default function AppWrapper({ params }) {
  return (
    <AuthProvider>
      <UpdatePost params={params} />
    </AuthProvider>
  );
}
