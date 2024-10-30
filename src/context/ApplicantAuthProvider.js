import { applicantLogIn, applicantSignUp } from "@/api"; // Import API functions
import React, { createContext, useContext, useState, useEffect } from "react";

const ApplicantAuthContext = createContext();

export const useApplicantAuth = () => useContext(ApplicantAuthContext);

export const ApplicantAuthProvider = ({ children }) => {
  const [applicant, setApplicant] = useState(null);

  // Function to fetch applicant details from the server
  const getApplicantDetails = async (token) => {
    try {
      const response = await fetch("https://backendtest-beryl.vercel.app/api/applicant/details", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      if (!response.ok) {
        const errorData = await response.text();
        console.error("Error response from server:", errorData);
        throw new Error("Failed to fetch applicant details.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error in getApplicantDetails:", error);
      throw error;
    }
  };

  // Function to check for a saved token and fetch applicant details
  const fetchApplicantDetails = async () => {
    const token = localStorage.getItem("applicantToken");
    if (!token) return;

    try {
      const applicantData = await getApplicantDetails(token);
      if (applicantData && applicantData.name) {
        setApplicant(applicantData);
      } else {
        console.error("Applicant data is missing expected properties.");
      }
    } catch (error) {
      console.error("Error fetching applicant details:", error);
    }
  };

  // Effect to check if the applicant is already logged in when the app loads
  useEffect(() => {
    fetchApplicantDetails();
  }, []);

  // Applicant Login function using API call
  const applicantLogin = async (email, password) => {
    try {
      const data = await applicantLogIn({ email, password });

      if (data.token) {
        const { token } = data;
        localStorage.setItem("applicantToken", token);

        // Fetch and store applicant details after login
        await fetchApplicantDetails();

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
  const applicantSignup = async (name, email, password) => {
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

  const checkUser = () => {
    if (applicant?.name) {
      console.log(`Welcome, ${applicant.name}`);
    } else {
      console.error("Applicant details are missing.");
    }
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
