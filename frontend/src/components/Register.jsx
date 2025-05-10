import React, { useState } from "react";
import axios from "axios";
import LoginBackground from "./LoginBackground";
import { z } from "zod";

axios.defaults.baseURL = "http://127.0.0.1:8000";

const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    // Zod validation
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/signup/", {
        username: form.name,
        email: form.email,
        password: form.password,
      });
      setSuccess(res.data.message || "Account created successfully! You can now log in.");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white relative overflow-hidden">
      <LoginBackground />
      <div className="bg-white p-8 rounded-lg shadow-2xl shadow-indigo-200 w-full max-w-sm z-10">
        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 leading-tight py-2">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-indigo-500 border-gray-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-indigo-500 border-gray-300"
          />
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-indigo-500 border-gray-300"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12c0 1.885 3.75 7.5 9.75 7.5 1.846 0 3.54-.355 5.016-.934M6.228 6.228A10.477 10.477 0 0112 4.5c6 0 9.75 7.5 9.75 7.5a17.896 17.896 0 01-3.07 4.043M6.228 6.228L3 3m3.228 3.228l12.544 12.544" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75a3.75 3.75 0 104.5 4.5" />
                </svg>
              )}
            </button>
          </div>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-indigo-500 border-gray-300"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12c0 1.885 3.75 7.5 9.75 7.5 1.846 0 3.54-.355 5.016-.934M6.228 6.228A10.477 10.477 0 0112 4.5c6 0 9.75 7.5 9.75 7.5a17.896 17.896 0 01-3.07 4.043M6.228 6.228L3 3m3.228 3.228l12.544 12.544" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75a3.75 3.75 0 104.5 4.5" />
                </svg>
              )}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2 text-center">{success}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-md font-semibold hover:from-indigo-500 hover:to-purple-500 transition mb-4" disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <a href="/login" className="text-sm text-indigo-600 hover:underline block text-center">Back to Login</a>
      </div>
    </section>
  );
} 