'use client'
import React, { useState } from 'react';
import { applyForJob } from '../api';

const ApplyForm = ({ jobId }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');
  const [message, setMessage] = useState('');

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const applicantData = { name, email, resume };
      await applyForJob(jobId, applicantData); // Send applicant data to the backend
      setMessage('Application submitted successfully!');
    } catch (error) {
      setMessage('Error submitting application. Please try again.');
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyForm;
