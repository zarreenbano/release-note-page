
"use client";

import { useState } from "react";
import { login, signup } from "@/lib/auth";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      const success = signup(email, password);
      if (success) {
        window.location.href = "/";
      } else {
        setError("Signup failed. User limit reached or user already exists.");
      }
    } else {
      const success = login(email, password);
      if (success) {
        window.location.href = "/";
      } else {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full min-h-[590px] max-w-lg bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 space-y-8 shadow-2xl">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Release Notes
        </h1>

        {/* Gradient Title */}
        <h2 className="relative inline-block text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-amber-100 via-amber-200 to-amber-100 text-center mb-3 drop-glow">
          {isSignup ? "Sign Up" : "Login"}
          <span className="absolute inset-x-0 -bottom-1 h-1 bg-linear-to-r from-transparent via-white/70 to-transparent opacity-70 blur-md animate-shine"></span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-2xl font-medium mb-2 text-amber-100">
              𝖾𝗆𝖺𝗂𝗅
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 rounded-lg border border-gray-600 text-amber-100 placeholder-gray-500 focus:border-amber-200 focus:outline-none transition"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-2xl font-medium mb-2 text-amber-100">
              𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 rounded-lg border border-gray-600 text-amber-100 placeholder-gray-500 focus:border-amber-200 focus:outline-none transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full px-4 py-4 bg-gray-900 hover:bg-gray-950 text-amber-100 rounded-lg font-bold text-3xl transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError("");
            }}
            className="ml-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}