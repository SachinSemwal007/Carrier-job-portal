'use client';
import { useEffect, useState } from 'react';

const EmailVerified = ({ params }) => {
  const [status, setStatus] = useState('Verifying...'); // To store the current verification status
  const [finalStatus, setFinalStatus] = useState(null); // To store the final verification status
  const token = params.verify; // Extract the 'verify' parameter from the URL

  useEffect(() => {
    const verifyApplicant = async () => {
      try {
        // Introduce a 2-second delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await fetch(`http://localhost:5000/api/verify-applicant?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus(data.message); // Set success message
          if (data.message === "Email verified successfully!") {
            setFinalStatus(data.message); // Store final success message
          }
        } else {
          setStatus(data.message); // Set error message from server
        }
      } catch (error) {
        setStatus('An error occurred during verification.'); // Handle network errors
      }
    };

    // Call the verification function
    verifyApplicant();
  }, [token]);

  return (
    <div>
      <h1>{finalStatus || status}</h1> {/* Display final status if set, otherwise current status */}
    </div>
  );
};

export default EmailVerified;
