import React from "react";

const mentors = [
  { id: 1, name: "AI Mentor for IIT-JEE", desc: "Personalized guidance and practice for IIT-JEE aspirants." },
  { id: 2, name: "AI Mentor for NEET", desc: "Expert AI mentor for NEET medical entrance preparation." },
  { id: 3, name: "AI Mentor for UPSC", desc: "AI-powered mentor for UPSC Civil Services Exam preparation." },
  { id: 4, name: "AI Mentor for GATE", desc: "AI mentor for GATE exam with tailored study plans." },
  { id: 5, name: "AI Mentor for CAT", desc: "AI mentor for MBA entrance (CAT) with mock tests and analytics." },
];

export default function Mentors() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-8">
      <h2 className="text-4xl font-extrabold mb-10 text-indigo-700">Mentors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {mentors.map(mentor => (
          <div key={mentor.id} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:scale-105 transition-transform">
            <h3 className="text-2xl font-bold mb-2 text-indigo-700 text-center">{mentor.name}</h3>
            <p className="text-gray-600 text-center">{mentor.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 