// src/app/admin/createadmin/page.jsx
"use client";
import React from 'react';
import Signup from '@/components/Signup';
import { ApplicantAuthProvider } from '@/context/ApplicantAuthProvider';

const CreateAdminPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Signup />
    </div>
  );
};

export default function HomeWrapper() {
  return (
    <ApplicantAuthProvider>
      <CreateAdminPage />
    </ApplicantAuthProvider>
  );
}

