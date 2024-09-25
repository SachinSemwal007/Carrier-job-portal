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

// Apply for a Job
export const applyForJob = (id, applicantData) => API.post(`/posts/${id}/apply`, applicantData);
