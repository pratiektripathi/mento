import React from "react";
import LoginBackground from "./LoginBackground";

export default function ForgotPassword() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen w-full bg-white relative overflow-hidden">
      <LoginBackground />
      <div className="bg-white p-8 rounded-lg shadow-2xl shadow-indigo-200 w-full max-w-sm z-10">
        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500 leading-tight py-2">Forgot Password</h2>
        <form>
          <input type="email" placeholder="Enter your email" className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-indigo-500 border-gray-300" />
          <button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-md font-semibold hover:from-indigo-500 hover:to-purple-500 transition mb-4">Send Reset Link</button>
        </form>
        <a href="/login" className="text-sm text-indigo-600 hover:underline block text-center">Back to Login</a>
      </div>
    </section>
  );
} 