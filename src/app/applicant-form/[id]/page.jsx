'use client';
import React from 'react';
import ApplyForm from '@/components/ApplyForm'; // Adjust the import path as necessary

import { useParams } from 'next/navigation'; // Use App Router's `useParams`

const ApplicantFormPage = ({params}) => { 
  const { id } = useParams(); // Get the job ID from the URL

  return (
    <div>
      <ApplyForm jobId={id} params={params} /> {/* Pass the job ID to the ApplyForm */} 
    </div>
  );
};

export default ApplicantFormPage;
