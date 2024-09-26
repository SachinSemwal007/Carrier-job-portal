'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const EmailVerified = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { token } = router.query; // Get the token from the URL

  useEffect(() => {
    if (token) {
      const verifyEmail = async () => {
        try {
          const response = await fetch(`/api/verify-email?token=${token}`);
          const data = await response.json();
          if (response.ok) {
            setMessage(data.message);
          } else {
            setMessage(data.message);
          }
        } catch (error) {
          setMessage('Error verifying email.');
        }
      };

      verifyEmail();
    }
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerified;
