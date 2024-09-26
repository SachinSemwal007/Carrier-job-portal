"use client";
import React from "react";
import Login from "@/components/Login";
import { AuthProvider, useAuth } from "@/context/authcontext";
import AdminJobList from "@/components/AdminJoblist";
import Link from "next/link";
import Signup from "@/components/Signup";

const App = () => {
  const { user, checkUser, logout } = useAuth(); // Use auth context

  React.useEffect(() => {
    checkUser(); // Check if user is logged in when the app loads
  }, [checkUser]);

  return (
    <div>
      {!user ? (
        <>
          <Login />
        </>
      ) : (
        <div>
          <div className="flex gap-10 ">
            <Link href="/admin/createjob">
              <h2>Create Job</h2>
            </Link>
            <div className="h-5 overflow-hidden hover:h-auto">
              <h2 className="border bg-slate-300">Create admin</h2>
              <Signup />
            </div>
          </div>
          <h2 onClick={() => logout()}>logout</h2>
          <AdminJobList />
        </div>
      )}
    </div>
  );
};

// Wrap the App component with AuthProvider so the context is available throughout the app
export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
