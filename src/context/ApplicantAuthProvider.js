import { applicantLogIn, applicantSignUp, getApplicantDetails } from "@/api"; // Import getApplicantDetails API function
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ApplicantAuthContext = createContext();

export const useApplicantAuth = () => useContext(ApplicantAuthContext);

export const ApplicantAuthProvider = ({ children }) => {
  const [applicant, setApplicant] = useState(null);

  // Check if the applicant is already logged in when the app loads
  useEffect(() => {
    checkUser();
  }, []);

  // Function to check for a saved token and set the applicant state
  const checkUser = useCallback(async () => {
    const token = localStorage.getItem("applicantToken");
    if (token) {
      // Fetch applicant details if token exists
      await fetchApplicantDetails(token);
    }
  }, []);

  // Function to fetch applicant details from the server
  const fetchApplicantDetails = async (token) => {
    try {
<<<<<<< HEAD
      console.log('Token used for fetching details:', token);
      const data = await getApplicantDetails(token); 
      console.log('Fetched applicant data:', data);
  
=======
      const data = await getApplicantDetails(token); // Assume this API call returns applicant details
      console.log(data);
>>>>>>> 8527645fecff8c99a9ad23cbffabc3cfef34d3a1
      setApplicant({
        name: data.name,
        email: data.email,
        age: data.age,
        resume: data.resume,
      });
    } catch (error) {
      console.error('Error fetching applicant details:', error);
    }
  };
  
  async function getApplicantDetails(token) {
    try {
      const response = await fetch('http://localhost:5000/api/applicant/details', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure the token is correctly passed in the headers
          'Content-Type': 'application/json',
        },
      });
  
       // Log response status and body for debugging
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorData = await response.text();
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
  

  // Applicant Login function using API call
  const applicantLogin = async (email, password) => {
    try {
      const data = await applicantLogIn({ email, password });

      if (data.token) {
        const { token } = data;
        localStorage.setItem("applicantToken", token);

        // Fetch and store applicant details after login
        await fetchApplicantDetails(token);

        return true;
      } else {
        throw new Error("Invalid login response.");
      }
    } catch (error) {
      console.error("Applicant login failed:", error);
      return false;
    }
  };

  // Applicant Signup function using API call
<<<<<<< HEAD
  const applicantSignup = async (name, email, password ) => {
=======
  const applicantSignup = async (name, email, password) => {
>>>>>>> 8527645fecff8c99a9ad23cbffabc3cfef34d3a1
    try {
      await applicantSignUp({ name, email, password });
      return true;
    } catch (error) {
      console.error("Applicant signup failed:", error);
      return false;
    }
  };

  // Applicant Logout function
  const applicantLogout = () => {
    localStorage.removeItem("applicantToken");
    setApplicant(null);
  };

  const value = {
    applicant,
    applicantLogin,
    applicantSignup,
    applicantLogout,
    checkUser,
  };

  return <ApplicantAuthContext.Provider value={value}>{children}</ApplicantAuthContext.Provider>;
};
