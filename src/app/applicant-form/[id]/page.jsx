'use client';
import React from 'react';
import ApplyForm2 from '@/components/ApplyForm2'; // Adjust the import path as necessary
import { useParams } from 'next/navigation'; // Use App Router's `useParams`

const ApplicantFormPage = () => {
  const { id } = useParams(); // Get the job ID from the URL

  return (
    <div>
      <ApplyForm2 jobId={id} /> {/* Pass the job ID to the ApplyForm */}
    </div>
  );
};

export default ApplicantFormPage;