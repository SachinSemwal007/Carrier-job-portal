"use client";
import React from 'react';
import Signup from '@/components/Signup';
import { AuthProvider } from '@/context/authcontext';

const CreateAdminPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Signup />
    </div>
  );
};

export default function HomeWrapper() {
  return (
    <AuthProvider>
      <CreateAdminPage />
    </AuthProvider>
  );
}

