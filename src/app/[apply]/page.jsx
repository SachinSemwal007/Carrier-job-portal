
'use client'
import ApplyForm from "@/components/ApplyForm";
import React from "react";
import { AuthProvider, useAuth } from "@/context/authcontext";
import Link from "next/link";

const App = ({ params }) => {
  const { user, checkUser, logout } = useAuth(); // Use auth context

  React.useEffect(() => {
    checkUser(); // Check if user is logged in when the app loads
  }, [checkUser]);

  return (
    <div>
      {!user ? (
        <>
          <h2>Login first</h2>
        </>
      ) : (
        <div>

          <ApplyForm jobId={params.apply} />
        </div>
      )}
    </div>
  );
};

export default function AppWrapper({ params }) {
  return (
    <AuthProvider>
      <App params={params} />
    </AuthProvider>
  );
}
