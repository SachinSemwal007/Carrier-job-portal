"use client";
import React, { useState } from 'react';
import { AuthProvider, useAuth } from "@/context/authcontext";
import { useRouter } from 'next/router'; // For redirection after creating the post
import Link from 'next/link';
import AdminJobList from '@/components/AdminJoblist';

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-6">
      <AdminJobList/>
    </div>
  );
};

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
