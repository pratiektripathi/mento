import React, { useState, useRef, useEffect } from "react";
import Avatar from "./Avatar";

const mentors = [
  { name: "JEE Mentor", tag: "IIT-JEE" },
  { name: "NEET Mentor", tag: "NEET" },
  { name: "UPSC Mentor", tag: "UPSC" },
  { name: "Aptitude Mentor", tag: "Aptitude" },
];

const products = [
  { name: "Unlimited MCQs" },
];

const leaderboard = [
  { name: "Alice", score: 980 },
  { name: "Bob", score: 920 },
  { name: "You", score: 900 },
  { name: "Charlie", score: 850 },
];

const topics = [
  { name: "Algebra", strength: "Strong" },
  { name: "Organic Chemistry", strength: "Weak" },
  { name: "Modern History", strength: "Average" },
];

const initialChat = {
  "JEE Mentor": [ { sender: "ai", text: "Hi! I am your JEE Mentor. How can I help you today?" } ],
  "NEET Mentor": [ { sender: "ai", text: "Hi! I am your NEET Mentor. How can I help you today?" } ],
  "UPSC Mentor": [ { sender: "ai", text: "Hi! I am your UPSC Mentor. How can I help you today?" } ],
  "Aptitude Mentor": [ { sender: "ai", text: "Hi! I am your Aptitude Mentor. How can I help you today?" } ],
  "Unlimited MCQs": [ { sender: "ai", text: "Welcome to Unlimited MCQs! Ready to practice?" } ],
};

export default function Dashboard() {
  const [chats, setChats] = useState(initialChat);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(mentors[0].name);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Determine current chat key
  const currentKey = selectedMentor || selectedProduct;
  const messages = chats[currentKey] || [];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentKey]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setChats((prev) => ({
      ...prev,
      [currentKey]: [
        ...(prev[currentKey] || []),
        { sender: "user", text: input },
        { sender: "ai", text: "(AI response placeholder)" },
      ],
    }));
    setInput("");
  };

  // Helper for mentor/product item
  const mentorItem = (m) => (
    <li
      key={m.name}
      className={`rounded px-3 py-2 flex items-center gap-2 cursor-pointer transition border-2 ${selectedMentor === m.name ? 'bg-indigo-100 border-indigo-500 text-indigo-900 font-bold' : 'bg-indigo-50 border-transparent text-indigo-600 hover:bg-indigo-200'}`}
      onClick={() => {
        setSelectedMentor(m.name);
        setSelectedProduct(null);
      }}
    >
      <span>{m.name}</span>
      <span className="text-xs bg-indigo-100 text-indigo-700 rounded px-2 py-0.5">{m.tag}</span>
    </li>
  );

  const productItem = (p) => (
    <div
      key={p.name}
      className={`rounded px-3 py-2 font-semibold cursor-pointer transition border-2 ${selectedProduct === p.name ? 'bg-purple-200 border-purple-500 text-purple-900' : 'bg-purple-100 border-transparent text-purple-700 hover:bg-purple-200'}`}
      onClick={() => {
        setSelectedProduct(p.name);
        setSelectedMentor(null);
      }}
    >
      {p.name}
    </div>
  );

  return (
    <div className="relative h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Fixed Logo and Hamburger (Left) */}
      <div className="fixed top-0 left-0 z-30 w-64 flex items-center h-16 pl-8 bg-transparent select-none">
        {/* Hamburger for md and below */}
        <button className="flex md:hidden mr-3" aria-label="Menu" onClick={() => setShowLeftDrawer(true)}>
          <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <span className="text-indigo-700 font-extrabold text-2xl">Mento-R</span>
      </div>
      {/* Fixed Avatar and Hamburger (Right) */}
      <div className="fixed top-0 right-0 z-30 w-80 flex items-center h-16 pr-8 bg-transparent justify-end">
        <Avatar />
        {/* Hamburger for md and below */}
        <button className="flex md:hidden ml-3" aria-label="Menu" onClick={() => setShowRightDrawer(true)}>
          <svg className="w-7 h-7 text-indigo-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {/* Left Drawer for md and below */}
      {showLeftDrawer && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowLeftDrawer(false)} />
          {/* Drawer */}
          <aside className="relative bg-white w-64 h-full p-4 flex flex-col gap-6 shadow-xl animate-slideInLeft z-10">
            {/* Close (cross) icon */}
            <button
              onClick={() => setShowLeftDrawer(false)}
              className="absolute top-4 right-4 bg-transparent text-indigo-700 hover:text-red-500"
              aria-label="Close left sidebar"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="h-8" /> {/* Spacer for logo */}
            <div>
              <h2 className="font-bold text-indigo-700 mb-2">Mentors</h2>
              <ul className="space-y-2">
                {mentors.map(mentorItem)}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-indigo-700 mb-2">Products</h2>
              {products.map(productItem)}
            </div>
          </aside>
        </div>
      )}

      {/* Right Drawer for md and below */}
      {showRightDrawer && (
        <div className="fixed inset-0 z-50 flex md:hidden justify-end">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowRightDrawer(false)} />
          {/* Drawer */}
          <aside className="relative bg-white w-80 h-full p-4 flex flex-col gap-6 shadow-xl animate-slideInRight z-10">
            {/* Close (cross) icon */}
            <button
              onClick={() => setShowRightDrawer(false)}
              className="absolute top-4 left-4 bg-transparent text-indigo-700 hover:text-red-500"
              aria-label="Close right sidebar"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="h-8" /> {/* Spacer for avatar */}
            <div>
              <h2 className="font-bold text-indigo-700 mb-2">Leaderboard</h2>
              <ul className="space-y-1">
                {leaderboard.map((entry, i) => (
                  <li key={entry.name} className={`flex justify-between px-3 py-1 rounded ${entry.name === "You" ? "bg-indigo-100 font-bold" : ""}`}>
                    <span>{i + 1}. {entry.name}</span>
                    <span>{entry.score}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold text-indigo-700 mb-2">Progress</h2>
              <div className="bg-green-100 rounded px-3 py-2 font-semibold text-green-700 mb-2">Score: 900</div>
              <div className="bg-yellow-100 rounded px-3 py-2 font-semibold text-yellow-700 mb-2">Next Topic: Organic Chemistry</div>
            </div>
            <div>
              <h2 className="font-bold text-indigo-700 mb-2">Topic-wise Strength/Weakness</h2>
              <ul className="space-y-1">
                {topics.map((t) => (
                  <li key={t.name} className="flex justify-between px-3 py-1 rounded bg-gray-50">
                    <span>{t.name}</span>
                    <span className={`font-semibold ${t.strength === "Strong" ? "text-green-600" : t.strength === "Weak" ? "text-red-500" : "text-yellow-600"}`}>{t.strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      )}

      {/* Main Layout */}
      <section className="h-full flex pt-16">
        {/* Left Sidebar - Only on md+ */}
        <aside className={`relative transition-all duration-300 bg-white/80 border-r border-indigo-100 flex-col gap-6 hidden md:flex ${leftOpen ? 'w-64 p-4' : 'w-16 p-2 items-center'}`}>
          <button
            onClick={() => setLeftOpen((o) => !o)}
            className="absolute -right-4 top-6 z-10 bg-indigo-500 text-white rounded-full p-1 shadow hover:bg-indigo-600 transition"
            aria-label={leftOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {/* Chevron Left SVG */}
            <svg className={`w-6 h-6 transition-transform ${leftOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          {leftOpen && (
            <>
              <div className="h-8" /> {/* Spacer for logo */}
              <div>
                <h2 className="font-bold text-indigo-700 mb-2">Mentors</h2>
                <ul className="space-y-2">
                  {mentors.map(mentorItem)}
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-indigo-700 mb-2">Products</h2>
                {products.map(productItem)}
              </div>
            </>
          )}
        </aside>

        {/* Center Chat Area */}
        <main className="flex-1 flex flex-col h-full max-h-full">
          <div className="flex-1 min-h-0 overflow-y-auto px-6 py-8">
            <div className="max-w-2xl mx-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 shadow text-base max-w-[70%] ${
                      msg.sender === "user"
                        ? "bg-indigo-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
          <form
            onSubmit={handleSend}
            className="w-full max-w-2xl mx-auto flex items-center gap-2 px-6 pb-8"
          >
            <input
              type="text"
              className="flex-1 rounded-full border border-indigo-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white shadow"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-indigo-700 transition"
            >
              Send
            </button>
          </form>
        </main>

        {/* Right Sidebar - Only on md+ */}
        <aside className={`relative transition-all duration-300 bg-white/80 border-l border-indigo-100 flex-col gap-6 hidden md:flex ${rightOpen ? 'w-80 p-4' : 'w-16 p-2 items-center'}`}>
          <button
            onClick={() => setRightOpen((o) => !o)}
            className="absolute -left-4 top-6 z-10 bg-indigo-500 text-white rounded-full p-1 shadow hover:bg-indigo-600 transition"
            aria-label={rightOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {/* Chevron Right SVG */}
            <svg className={`w-6 h-6 transition-transform ${rightOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          {rightOpen && (
            <>
              <div className="h-8" /> {/* Spacer for avatar */}
              <div>
                <h2 className="font-bold text-indigo-700 mb-2">Leaderboard</h2>
                <ul className="space-y-1">
                  {leaderboard.map((entry, i) => (
                    <li key={entry.name} className={`flex justify-between px-3 py-1 rounded ${entry.name === "You" ? "bg-indigo-100 font-bold" : ""}`}>
                      <span>{i + 1}. {entry.name}</span>
                      <span>{entry.score}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-indigo-700 mb-2">Progress</h2>
                <div className="bg-green-100 rounded px-3 py-2 font-semibold text-green-700 mb-2">Score: 900</div>
                <div className="bg-yellow-100 rounded px-3 py-2 font-semibold text-yellow-700 mb-2">Next Topic: Organic Chemistry</div>
              </div>
              <div>
                <h2 className="font-bold text-indigo-700 mb-2">Topic-wise Strength/Weakness</h2>
                <ul className="space-y-1">
                  {topics.map((t) => (
                    <li key={t.name} className="flex justify-between px-3 py-1 rounded bg-gray-50">
                      <span>{t.name}</span>
                      <span className={`font-semibold ${t.strength === "Strong" ? "text-green-600" : t.strength === "Weak" ? "text-red-500" : "text-yellow-600"}`}>{t.strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </aside>
      </section>
    </div>
  );
} 