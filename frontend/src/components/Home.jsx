import React, { useState } from "react";

const mentors = [
  { id: 1, name: "AI Mentor for IIT-JEE", desc: "Personalized guidance and practice for IIT-JEE aspirants." },
  { id: 2, name: "AI Mentor for NEET", desc: "Expert AI mentor for NEET medical entrance preparation." },
  { id: 3, name: "AI Mentor for UPSC", desc: "AI-powered mentor for UPSC Civil Services Exam preparation." },
  { id: 4, name: "AI Mentor for GATE", desc: "AI mentor for GATE exam with tailored study plans." },
  { id: 5, name: "AI Mentor for CAT", desc: "AI mentor for MBA entrance (CAT) with mock tests and analytics." },
];

export default function Home() {
  const [showAll, setShowAll] = useState(false);
  const visibleMentors = showAll ? mentors : mentors.slice(0, 2);

  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        {/* Dot matrix background */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle, #e0e7ff 1.5px, transparent 1.5px), radial-gradient(circle, #e0e7ff 1.5px, transparent 1.5px)",
            backgroundSize: "40px 40px",
            backgroundPosition: "0 0, 20px 20px",
            zIndex: 0,
          }}
        />
        {/* Bulls-eye SVGs */}
        <svg
          className="absolute left-20 top-[32%] w-16 h-16 opacity-40 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="48" stroke="#6366f1" strokeWidth="4" />
          <circle cx="50" cy="50" r="32" stroke="#6366f1" strokeWidth="2" />
          <circle cx="50" cy="50" r="16" stroke="#6366f1" strokeWidth="2" />
          <circle cx="50" cy="50" r="6" fill="#6366f1" />
        </svg>
        <svg
          className="absolute right-10 top-24 w-20 h-20 opacity-20 z-0"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="48" stroke="#6366f1" strokeWidth="3" />
          <circle cx="50" cy="50" r="32" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="16" stroke="#6366f1" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="6" fill="#6366f1" />
        </svg>
        <svg
          className="absolute left-1/2 bottom-10 w-40 h-40 opacity-10 z-0 transform -translate-x-1/2"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="48" stroke="#6366f1" strokeWidth="5" />
          <circle cx="50" cy="50" r="32" stroke="#6366f1" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="16" stroke="#6366f1" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="6" fill="#6366f1" />
        </svg>
        {/* Content */}
        <h1 className="text-6xl font-extrabold mb-10 text-blue-600 text-center z-10">Learn . Practice . Crack It</h1>
        <h2 className="text-3xl font-bold mb-4 text-gray-900 text-center z-10">
          together with your Personal <span className="text-5xl text-indigo-600 font-extrabold animate-bounce inline-block align-middle">Ai</span> Mentor
        </h2>
        {/* Surrounding Cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {/* Left Card */}
          <div className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 w-48 bg-yellow-200 rounded-lg shadow-xl p-4 pointer-events-auto rotate-[-6deg] border-l-4 border-yellow-400" style={{fontFamily: 'cursive', position: 'absolute'}}>
            {/* Pin */}
            <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-30">
              <div className="w-5 h-5 bg-red-400 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <h4 className="font-bold text-yellow-900 mb-2 text-lg" style={{fontFamily: 'cursive'}}>Personalized Plans</h4>
            <p className="text-yellow-900 text-sm">Get study plans tailored to your needs.</p>
          </div>
          {/* Top Card */}
          <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-yellow-100 rounded-lg shadow-xl p-4 pointer-events-auto rotate-3 border-l-4 border-yellow-300" style={{fontFamily: 'cursive', position: 'absolute'}}>
            {/* Pin */}
            <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-30">
              <div className="w-5 h-5 bg-red-400 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <h4 className="font-bold text-yellow-900 mb-2 text-lg" style={{fontFamily: 'cursive'}}>24/7 AI Mentor</h4>
            <p className="text-yellow-900 text-sm">Instant help, anytime you need it.</p>
          </div>
          {/* Right Card */}
          <div className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 w-48 bg-yellow-300 rounded-lg shadow-xl p-4 pointer-events-auto rotate-2 border-l-4 border-yellow-500" style={{fontFamily: 'cursive', position: 'absolute'}}>
            {/* Pin */}
            <div className="absolute left-1/2 -top-3 -translate-x-1/2 z-30">
              <div className="w-5 h-5 bg-red-400 rounded-full border-2 border-white shadow-md"></div>
            </div>
            <h4 className="font-bold text-yellow-900 mb-2 text-lg" style={{fontFamily: 'cursive'}}>Progress Tracking</h4>
            <p className="text-yellow-900 text-sm">Monitor your learning journey easily.</p>
          </div>
        </div>
      </section>
      <section className="z-10 mt-8 w-full max-w-3xl mx-auto min-h-[50vh]">
        <h3 className="text-xl font-bold mb-4 text-indigo-700 text-center">Featured AI Mentors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleMentors.map(mentor => (
            <div key={mentor.id} className="bg-white rounded-lg shadow-md p-6">
              <h4 className="text-lg font-semibold mb-2">{mentor.name}</h4>
              <p className="text-gray-600">{mentor.desc}</p>
            </div>
          ))}
        </div>
        {!showAll && (
          <div className="flex justify-center mt-6">
            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
              onClick={() => setShowAll(true)}
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </>
  );
} 