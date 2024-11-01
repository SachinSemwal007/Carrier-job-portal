"use client";
import { useAuth } from "@/context/authcontext";
import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading , setLoading] = useState(false);

  const { signup } = useAuth(); // Access signup function from the auth context

  // Check password strength
  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) {
      setPasswordStrength("Too short");
    } else if (hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar) {
      setPasswordStrength("Strong");
    } else if ((hasUpperCase || hasLowerCase) && hasDigit && isLongEnough) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }

    // Provide error message if password does not meet criteria
    if (
      !isLongEnough ||
      !hasUpperCase ||
      !hasLowerCase ||
      !hasDigit ||
      !hasSpecialChar
    ) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset messages before submitting
    setError("");
    setMessage("");

    // Check if all fields are provided
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Validate email format (simple regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check if password meets all criteria
    if (passwordError) {
      setError("Password does not meet the required criteria.");
      return;
    }

    // Show loading state
    setLoading(true);

    try {
      const success = await signup(name, email, password); // Call signup function from context

      if (success) {
        setMessage("Signup successful. You can now log in.");
        setError("");
      } else {
        setError("Error during signup. Please try again.");
        setMessage("");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
      console.error("Signup error:", error);
    } finally {
      // Hide loading state
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-teal-600">
          Create Admin
        </h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {passwordError && (
            <p className="text-red-600 text-sm mb-2">{passwordError}</p>
          )}
          <p
            className={`text-sm mb-4 ${
              passwordStrength === "Strong"
                ? "text-green-600"
                : passwordStrength === "Medium"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Password Strength: {passwordStrength}
          </p>
          <button
            type="submit"
            className="w-full p-2 bg-teal-600 text-white rounded hover:bg-teal-500 transition duration-200"
          >
            Create
          </button>
        </form>
        {message && (
          <p className="text-green-600 text-center mt-4">{message}</p>
        )}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
