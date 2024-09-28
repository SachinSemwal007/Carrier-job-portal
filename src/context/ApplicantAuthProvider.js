import { applicantLogIn, applicantSignUp, getApplicantDetails } from "@/api"; // Import getApplicantDetails API function
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

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
      const data = await getApplicantDetails(token); // Assume this API call returns applicant details
     console.log(data)
      setApplicant({
        name: data.name,
        email: data.email,
        age: data.age,
        resume: data.resume,
      });
    } catch (error) {
      console.error("Error fetching applicant details:", error);
    }
  };

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
  const applicantSignup = async (name, email, password, age, resume) => {
    try {
      await applicantSignUp({ name, email, password, age, resume });
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

  return (
    <ApplicantAuthContext.Provider value={value}>
      {children}
    </ApplicantAuthContext.Provider>
  );
};
