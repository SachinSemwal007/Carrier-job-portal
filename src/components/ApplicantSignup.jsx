"use client";
 
import { useState } from "react";
import { useApplicantAuth } from "@/context/ApplicantAuthProvider";
import Footer from "./Footer";
import Image from "next/image";
import Link from "next/link";
 
const ApplicantSignup = () => { 
  const { applicantSignup } = useApplicantAuth(); 
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "",
    password: "",
    confirmPassword: "",
  }); 
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

    if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasDigit || !hasSpecialChar) {
      setPasswordError(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };
 
  const handleChange = (e) => { 
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password strength as user types
    if (name === "password") {
      checkPasswordStrength(value);
    }
  }; 
 
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const { name, email, password, confirmPassword } = formData;

    if (passwordError) {
      setMessage("Password does not meet the required criteria.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try { 
      const success = await applicantSignup(name, email, password);
      if (success) { 
        setMessage("Signup successful! Please check your email to verify your account.");
        setFormData({ 
          name: "", 
          email: "",
          password: "",
          confirmPassword: "",
        }); 
      } else { 
        setMessage("Signup failed. Please check the form and try again.");
      } 
    } catch (error) { 
      setMessage(
        error.message.includes("Applicant already exists")
          ? "Email already in use. Please use a different email."
          : "Signup failed. Error: " + error.message
      );
    } 
  }; 
 
  return ( 
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow container mx-auto p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center lg:justify-between mt-0 mb-6">
          <div className="flex flex-col w-full sm:w-1/2 lg:w-2/5 sm:ml-20 items-center mx-auto -mt-20">
            <Image
              src="/JSSPS.webp"
              alt="JSSPS Logo"
              width={400}
              height={300}
              quality={100}
              className="w-1/3 mt-20 sm:w-1/2 lg:w-3/5 h-auto mb-1"
            />
            <h2 className="text-[26px] sm:text-[36px] lg:text-[40px] font-extrabold text-gray-800 whitespace-nowrap"> 
              JSSPS Career Portal 
            </h2>
            <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-600">
              (A CCL and State Govt. of Jharkhand Joint Initiative) 
            </h4>
          </div>

          <div className="w-full max-w-md bg-white p-8 rounded-md shadow-xl">
            <div className="flex flex-col items-center mb-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                Applicant Signup
              </h1>
            </div>
            {message && (
              <p className="text-center text-red-500 mb-4 text-sm md:text-base">{message}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
              {passwordError && <p className="text-red-600 text-sm mb-2">{passwordError}</p>}
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
              <div className="relative">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition-colors text-sm md:text-base"
              >
                Sign Up
              </button>
            </form>
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <Link
              href="/"
              className="bg-blue-600 text-white text-[14px] py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 w-full sm:w-auto"
            >
              Already Registered? Click Here to Login
            </Link>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-[#252425] py-3 px-2 text-center">
        <p className="text-[16px] sm:text-[20px] font-bold text-yellow-500">
            Application are being Accepted For Various Coach Positions at JSSPS.<br/>
            Open From 1st Nov 2024, 11:00 Hrs & Availiable Upto Nov 21st 2024, 17:00 Hrs<br/>
            To Know More{" "}
          <a
            href="/path/to/your/pdf-file.pdf"
            download
            className="text-red-500 underline hover:text-red-700 blinking-text"
          >
            Click Here
          </a>
        </p>
      </div>
      <Footer />
    </div> 
  ); 
}; 
 
export default ApplicantSignup; 
