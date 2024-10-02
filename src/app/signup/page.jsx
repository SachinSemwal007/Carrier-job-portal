"use client";
import React from "react";
import ApplicantSignup from "@/components/ApplicantSignup";
import {ApplicantAuthProvider } from "@/context/ApplicantAuthProvider";

const App = () => {
  return (
    <div>
          <ApplicantSignup />
    </div>
  );
};

// Wrap the App component with AuthProvider so the context is available throughout the app
export default function AppWrapper() {
  return (
    <ApplicantAuthProvider>
      <App />
    </ApplicantAuthProvider>
  );
}
