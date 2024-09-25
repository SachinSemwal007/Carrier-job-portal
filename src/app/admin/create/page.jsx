"use client";
import React from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import { AuthProvider, useAuth } from "@/context/authcontext";
import Link from "next/link";

const App = () => {
  const { user, checkUser, logout } = useAuth(); // Use auth context

  React.useEffect(() => {
    checkUser(); // Check if user is logged in when the app loads
  }, [checkUser]);

  return (
    <div>
      {!user ? (
        <>
          <Signup />
        </>
      ) : (
        <div>
            <h2>Already registered <Link href='/admin'>log in here</Link> </h2>
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
