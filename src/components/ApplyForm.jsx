'use client';
import React, { useState } from 'react';
import { applyForJob } from '../api'; // Make sure this function makes a POST request to `/api/posts/:id/apply`

const ApplyForm = ({ jobId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); // State for error messages

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const applicantData = { name, email, resume };
      const response = await applyForJob(jobId, applicantData); // Send applicant data to the backend

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setError('');
      } else {
        const data = await response.json();
        setMessage('');
        setError(data.message || 'Error submitting application. Please try again.');
      }
    } catch (error) {
      setMessage('');
      setError('Error submitting application. Please try again.');
    }
  };

  return (
    <div className="apply-form">
      <h3>Apply for this job</h3>
      <form onSubmit={handleApply}>
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="url"
            placeholder="Link to your Resume"
            value={resume}
            onChange={(e) => setResume(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Application</button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default ApplyForm;
