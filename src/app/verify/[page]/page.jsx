// app/applicant/verify/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const VerifyEmail = ({params}) => {
  const [message, setMessage] = useState("");
  const [finalMessage, setFinalMessage] = useState(false); // Tracks if the final message should be shown
  const router = useRouter(); 
console.log(params)
  useEffect(() => {
    const verifyEmail = async () => {
      const token =params.page; // Extract the token from URL parameters
      if (!token) {
        setMessage("Invalid verification link.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/applicant/verify-email?token=${token}`, {
          method: "GET",
        });

        if (response.status === 200) {
          setFinalMessage(true); // Mark as final message for success
          setMessage("Email verified successfully! Redirecting to login...");

          // Redirect to login page after a short delay
          setTimeout(() => router.push("/"), 3000);
        } else {
          const data = await response.json();
          setMessage(data.message || "Email verification failed.");
        }
      } catch (error) {
        console.error("Error during email verification:", error);
        setMessage("Server error during verification. Please try again.");
      }
    };

    verifyEmail();
  }, [router]);

  return (
    <div>
      <h1>Email Verification</h1>
      {finalMessage ? <p>Email verified successfully! Redirecting to login...</p> : <p>{message}</p>}
    </div>
  );
};

export default VerifyEmail;
