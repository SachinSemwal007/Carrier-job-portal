"use client";
import { refreshAccessToken } from "@/api";
import React, { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      let token = localStorage.getItem("token");
      if (!token) {
        setError("User not authenticated.");
        return;
      }

      const changePassword = async (authToken) => {
        const response = await fetch(
          "https://9dwb3ngewc.execute-api.ap-south-1.amazonaws.com/dev/api/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword,
            }),
          }
        );
        return response;
      };

      // Attempt to change password
      let response = await changePassword(token);

      // If token is expired, refresh the token and retry
      if (response.status === 401) {
        try {
          console.log("Access token expired, attempting to refresh...");
          token = await refreshAccessToken(); // Use refreshAccessToken from api.js

          // Check if token was refreshed successfully
          if (!token) {
            throw new Error("Failed to refresh token.");
          }

          console.log('Token refreshed successfully, retrying password change...');
          response = await changePassword(token); // Retry changing password with the new token
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          setError("Failed to refresh token. Please log in again.");
          return;
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }

      setSuccessMessage("Password changed successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            className="border border-gray-300 rounded-lg w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
