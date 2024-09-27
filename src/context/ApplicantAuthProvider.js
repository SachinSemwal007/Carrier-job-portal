import { applicantLogIn, applicantSignUp } from '@/api';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ApplicantAuthContext = createContext();

export const useApplicantAuth = () => useContext(ApplicantAuthContext);

export const ApplicantAuthProvider = ({ children }) => {
  const [applicant, setApplicant] = useState(null);

  // Check if the applicant is already logged in when the app loads
  useEffect(() => {
    checkUser();
  }, []);

  // Function to check for a saved token and set the applicant state
  const checkUser = useCallback(() => {
    const token = localStorage.getItem('applicantToken');
    if (token) {
      // Set a placeholder applicant object since the token is present
      setApplicant({ email: 'applicant@example.com' }); // Optionally, you can decode the token to get the email
    }
  }, []);

  // Applicant Login function using API call
  const applicantLogin = async (email, password) => {
    try {
      const data = await applicantLogIn({ email, password });

      if (data.token) {
        const { token } = data;
        localStorage.setItem('applicantToken', token);
        setApplicant({ email });
        return true;
      } else {
        throw new Error('Invalid login response.');
      }
    } catch (error) {
      console.error('Applicant login failed:', error);
      return false;
    }
  };

  // Applicant Signup function using API call
  const applicantSignup = async (name, email, password, age, resume) => {
    try {
      await applicantSignUp({ name, email, password, age, resume });
      return true;
    } catch (error) {
      console.error('Applicant signup failed:', error);
      return false;
    }
  };

  // Applicant Logout function
  const applicantLogout = () => {
    localStorage.removeItem('applicantToken');
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
