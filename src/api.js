import axios from "axios"; 
 
// Set up the base URL for your backend 
const API = axios.create({
  baseURL: "https://backendtest-beryl.vercel.app/api",
}); 
 
// Sign Up 
export const signUp = (userData) => API.post("/signup", userData); 
 
// Log In 
export const logIn = (userData) => API.post("/login", userData); 
 
// Get Job Posts with optional filters 
export const getJobPosts = (params) => API.get("/posts", { params }); 
 
// Create a Job Post with token 
export const createJobPost = (postData, token) => 
  API.post("/createpost", postData, { 
    headers: { 
      Authorization: `Bearer ${token}`, 
    }, 
  }); 
 
export const deleteJob = (id, applicantData) => API.delete(`/posts/${id}`, applicantData); 
 
export const applyForJob = async (jobId, applicantData, files) => { 
  const formData = new FormData(); 
 
  // Append applicant data to FormData 
  formData.append("applicationData", JSON.stringify(applicantData)); 
 
  // Append files to FormData 
  if (files.passportPhoto) { 
    formData.append("passportPhoto", files.passportPhoto); 
  } 
  if (files.certification) { 
    formData.append("certification", files.certification); 
  } 
  if (files.signature) { 
    formData.append("signature", files.signature); 
  } 
 
  try { 
    const response = await fetch(
      `https://backendtest-beryl.vercel.app/api/posts/${jobId}/apply`,
      {
        method: "POST",
        body: formData,
        headers: {
          // Only add the Authorization header if needed
          // 'Authorization': `Bearer ${yourToken}`,
        },
      }
    ); 
 
    return response; 
  } catch (error) { 
    console.error("Error applying for job:", error); 
    throw error; 
  } 
}; 
 
 
 
export const deleteApplicant = async (postId, email) => { 
  try { 
    const response = await fetch(`https://backendtest-beryl.vercel.app/api/posts/${postId}/applicants/${email}`, { 
      method: "DELETE", 
    }); 
 
    if (response.ok) { 
      console.log("Applicant removed successfully."); 
    } else { 
      const data = await response.json(); 
      console.error("Error:", data.message); 
    } 
  } catch (error) { 
    console.error("Error removing applicant:", error); 
  } 
}; 
 
// api.js  
 
export const applicantSignUp = async ({ name, email, password }) => { 
 
  const response = await fetch('https://backendtest-beryl.vercel.app/api/applicant/signup', { 
    method: 'POST', 
    headers: { 
      'Content-Type': 'application/json', 
    }, 
    body: JSON.stringify({ name, email, password }), 
  }); 
 
  if (!response.ok) { 
    throw new Error('Failed to sign up'); 
  } 
 
  return response.json(); 
}; 
 
export const applicantLogIn = async ({ email, password }) => { 
  try { 
    const response = await fetch('https://backendtest-beryl.vercel.app/api/applicant/login', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ name, email, password }), // Ensure only the necessary data is sent 
    }); 
 
    if (!response.ok) { 
      throw new Error('Failed to sign up'); 
    } 
 
    return response.json(); 
  } catch (error) { 
    console.error('Error during signup:', error); 
    throw error; 
  } 
}; 
 
// API call to get applicant details 
export const getApplicantDetails = async (token) => { 
  try { 
  const response = await fetch(
    "https://backendtest-beryl.vercel.app/api/applicant/details",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ); 
 
  // Log response status for debugging 
  console.log('Response status:', response.status); 
  if (!response.ok) { 
    const errorData = await response.json(); 
    console.error('Error response from server:', errorData); 
    throw new Error('Failed to fetch applicant details.'); 
  } 
 
  const data = await response.json(); 
  return data; 
} catch (error) { 
  console.error('Error in getApplicantDetails:', error); 
  throw error; 
} 
} 
 
export const sendPasswordResetEmail = async (email) => { 
  try { 
    const response = await fetch('https://backendtest-beryl.vercel.app/api/forgot-password', {  
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ email }), 
    }); 
    return response; 
  } catch (error) { 
    console.error('Error sending password reset email:', error); 
    throw error; 
  } 
}; 
 
export const resetPassword = async (token, newPassword) => { 
  try { 
    const response = await fetch(`https://backendtest-beryl.vercel.app/api/reset-password/${token}`, {  
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ password: newPassword }), 
    }); 
 
    return response; // This returns the response object; make sure you handle this in your frontend code 
  } catch (error) { 
    console.error('Error resetting password:', error); 
    throw error; 
  } 
}; 
 
export const refreshAccessToken = async () => { 
  const refreshToken = localStorage.getItem('refreshToken'); 
 
  if (!refreshToken) { 
    throw new Error('Refresh token not found'); 
  } 
 
  try { 
    const response = await fetch('https://backendtest-beryl.vercel.app/api/refresh-token', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify({ refreshToken }), 
    }); 
 
    const data = await response.json(); 
 
    if (!response.ok) { 
      throw new Error(data.message || 'Failed to refresh token'); 
    } 
 
    // Store the new access token 
    localStorage.setItem('token', data.accessToken); 
    return data.accessToken; 
 
  } catch (error) { 
    console.error('Error in refreshAccessToken:', error); 
    throw new Error('Failed to refresh token. Please log in again.'); 
  } 
}; 
 
 
