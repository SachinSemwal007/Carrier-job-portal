import axios from 'axios';

// Set up the base URL for your backend
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Sign Up
export const signUp = (userData) => API.post('/signup', userData);

// Log In
export const logIn = (userData) => API.post('/login', userData);

// Get Job Posts with optional filters
export const getJobPosts = (params) => API.get('/posts', { params });

// Create a Job Post with token
export const createJobPost = (postData, token) =>
  API.post('/createpost', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteJob = (id, applicantData) => API.delete(`/posts/${id}`, applicantData);

export const applyForJob = async (jobId, applicantData) => {
  const response = await fetch(`http://localhost:5000/api/posts/${jobId}/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(applicantData),
  });

  return response; // Return the full response to handle status in the component
};

export const deleteApplicant = async (postId, email) => {
  try {
    const response = await fetch(`http://localhost:5000/api/posts/${postId}/applicants/${email}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Applicant removed successfully.');
    } else {
      const data = await response.json();
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error removing applicant:', error);
  }
};