import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <span className="font-bold text-lg">Mento-R</span>
        <span className="text-sm mt-2 md:mt-0">&copy; {new Date().getFullYear()} Mento-R. All rights reserved.</span>
      </div>
    </footer>
  );
} 