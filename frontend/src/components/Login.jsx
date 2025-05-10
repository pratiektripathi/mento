import React, { useState, useContext } from "react";
import axios from "axios";
import LoginBackground from "./LoginBackground";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.username || !form.password) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/login/", {
        username: form.username,
        password: form.password,
      });
      if (res.data.access) {
        sessionStorage.setItem("access_token", res.data.access);
        sessionStorage.setItem("refresh_token", res.data.refresh);
        setAuth({ 
          isAuthenticated: true, 
          username: res.data.username || form.username,
          email: res.data.email || form.username.includes('@') ? form.username : null
        });
        setSuccess("Login successful!");
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || err.response?.data?.error || "Invalid credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white relative overflow-hidden">
      <LoginBackground />
      {/* Physics: E = mc² */}
      <svg className="absolute left-8 top-8 w-52 h-24 opacity-10 -rotate-6" viewBox="0 0 300 80">
        <text x="0" y="60" fontSize="64" fill="#6b7280" fontFamily="cursive, sans-serif">E = mc²</text>
      </svg>
      {/* Chemistry: Flask */}
      <svg className="absolute right-8 top-16 w-20 h-32 opacity-10 rotate-3" viewBox="0 0 60 100" fill="none">
        <ellipse cx="30" cy="80" rx="25" ry="15" stroke="#6b7280" strokeWidth="4" />
        <rect x="25" y="10" width="10" height="60" fill="#6b7280" opacity="0.08" />
        <rect x="25" y="10" width="10" height="10" fill="#6b7280" />
        <line x1="30" y1="10" x2="30" y2="0" stroke="#6b7280" strokeWidth="4" />
      </svg>
      {/* Biology: Anatomy */}
      <svg className="absolute left-1/2 bottom-8 -translate-x-1/2 w-32 h-32 opacity-10 rotate-2" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="25" r="15" stroke="#6b7280" strokeWidth="3" />
        <rect x="35" y="40" width="30" height="40" rx="15" stroke="#6b7280" strokeWidth="3" />
        <line x1="50" y1="80" x2="50" y2="100" stroke="#6b7280" strokeWidth="3" />
        <line x1="35" y1="60" x2="15" y2="80" stroke="#6b7280" strokeWidth="3" />
        <line x1="65" y1="60" x2="85" y2="80" stroke="#6b7280" strokeWidth="3" />
      </svg>
      {/* Maths: Quadratic */}
      <svg className="absolute left-24 bottom-24 w-72 h-24 opacity-10 -rotate-3" viewBox="0 0 500 80">
        <text x="0" y="60" fontSize="56" fill="#6b7280" fontFamily="serif">ax² + bx + c = 0</text>
      </svg>
      {/* Chemistry: Benzene */}
      <svg className="absolute right-24 bottom-24 w-24 h-24 opacity-10 rotate-2" viewBox="0 0 100 100" fill="none">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#6b7280" strokeWidth="3" fill="none" />
        <circle cx="50" cy="50" r="20" stroke="#6b7280" strokeWidth="2" fill="none" />
      </svg>
      {/* Biology: DNA */}
      <svg className="absolute right-1/2 top-24 w-24 h-32 opacity-10 -rotate-6" viewBox="0 0 100 140" fill="none">
        <path d="M30,10 Q70,70 30,130" stroke="#6b7280" strokeWidth="3" fill="none" />
        <path d="M70,10 Q30,70 70,130" stroke="#6b7280" strokeWidth="3" fill="none" />
        <line x1="40" y1="30" x2="60" y2="30" stroke="#6b7280" strokeWidth="2" />
        <line x1="40" y1="60" x2="60" y2="60" stroke="#6b7280" strokeWidth="2" />
        <line x1="40" y1="90" x2="60" y2="90" stroke="#6b7280" strokeWidth="2" />
        <line x1="40" y1="120" x2="60" y2="120" stroke="#6b7280" strokeWidth="2" />
      </svg>
      {/* Maths: Pi */}
      <svg className="absolute left-1/2 top-8 w-16 h-16 opacity-10 rotate-12" viewBox="0 0 50 50">
        <text x="0" y="35" fontSize="40" fill="#6b7280" fontFamily="serif">π</text>
      </svg>
      {/* Maths: Integral */}
      <svg className="absolute left-10 top-1/2 w-20 h-20 opacity-10 rotate-3" viewBox="0 0 60 60">
        <text x="0" y="40" fontSize="40" fill="#6b7280" fontFamily="serif">∫</text>
      </svg>
      {/* Chemistry: Test Tube */}
      <svg className="absolute right-10 bottom-10 w-16 h-28 opacity-10 -rotate-2" viewBox="0 0 60 100" fill="none">
        <rect x="25" y="10" width="10" height="70" fill="#6b7280" opacity="0.08" />
        <rect x="25" y="10" width="10" height="10" fill="#6b7280" />
        <ellipse cx="30" cy="80" rx="10" ry="8" stroke="#6b7280" strokeWidth="3" />
      </svg>
      {/* Biology: Microscope */}
      <svg className="absolute left-1/4 top-1/4 w-16 h-16 opacity-10 -rotate-12" viewBox="0 0 64 64" fill="none">
        <rect x="28" y="10" width="8" height="30" rx="4" stroke="#6b7280" strokeWidth="3" />
        <rect x="20" y="40" width="24" height="8" rx="4" stroke="#6b7280" strokeWidth="3" />
        <circle cx="32" cy="54" r="6" stroke="#6b7280" strokeWidth="3" />
      </svg>
      {/* Subtle Bar Chart SVG */}
      <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-40 h-32 opacity-10 rotate-6" viewBox="0 0 160 120" fill="none">
        {/* Axes */}
        <line x1="20" y1="10" x2="20" y2="110" stroke="#6b7280" strokeWidth="2" />
        <line x1="20" y1="110" x2="150" y2="110" stroke="#6b7280" strokeWidth="2" />
        {/* Bars */}
        <rect x="35" y="70" width="18" height="40" fill="#6b7280" fillOpacity="0.3" />
        <rect x="65" y="50" width="18" height="60" fill="#6b7280" fillOpacity="0.4" />
        <rect x="95" y="30" width="18" height="80" fill="#6b7280" fillOpacity="0.5" />
        <rect x="125" y="90" width="18" height="20" fill="#6b7280" fillOpacity="0.2" />
      </svg>
      <div className="bg-white p-8 rounded-lg shadow-2xl shadow-indigo-200 w-full max-w-sm z-10">
        <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 leading-tight py-2">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username or Email"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-indigo-500 border-gray-300"
          />
          <p className="text-xs text-gray-500 mb-4">You can login with either your username or email address</p>
          <div className="relative mb-6">
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
          {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-2 text-center">{success}</div>}
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-md font-semibold hover:from-indigo-500 hover:to-purple-500 transition mb-4" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex flex-col items-center mt-4 space-y-2">
            <a href="/forgot-password" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
            <span className="text-sm text-gray-500">Don't have an account? <a href="/register" className="text-indigo-600 hover:underline">Sign up</a></span>
          </div>
        </form>
      </div>
    </section>
  );
} 