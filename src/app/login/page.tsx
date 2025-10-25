"use client";

import { useState } from "react";
import { login, signup } from "@/lib/auth";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ← NEW

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignup) {
      const success = signup(userId, password);
      if (success) {
        window.location.href = "/card";
      } else {
        setError("Signup failed. User limit reached or user already exists.");
      }
    } else {
      const success = login(userId, password);
      if (success) {
        window.location.href = "/card";
      } else {
        setError("Invalid userId or password");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full min-h-[590px] max-w-lg bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 space-y-8 shadow-2xl">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Release Notes
        </h1>

        {/* Gradient Title – Fixed bg-linear-to-r */}
        <h2 className="ml-[127px] relative inline-block text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-amber-100 via-amber-200 to-amber-100 text-center mb-3 drop-glow mx-auto">
          {isSignup ? "Sign Up" : "Login"}
          <span className="absolute inset-x-0 -bottom-1 h-1 bg-linear-to-r from-transparent via-white/70 to-transparent opacity-70 blur-md animate-shine"></span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-2xl font-medium mb-2 text-amber-100">
              userId
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 rounded-lg border border-gray-600 text-amber-100 placeholder-gray-500 focus:border-amber-200 focus:outline-none transition"
              placeholder="userId"
              required
            />
          </div>

          {/* PASSWORD WITH EYE ICON */}
          <div className="relative">
            <label className="block text-2xl font-medium mb-0 text-gray-800">
              𝗉𝖺𝗌𝗌𝗐𝗈𝗋𝖽
            </label>
            <input
              type={showPassword ? "text" : "password"}  // ← Toggle type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 pr-12 bg-gray-700 rounded-lg border border-gray-600 text-amber-100 placeholder-gray-500 focus:border-amber-200 focus:outline-none transition"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-12 text-gray-400 hover:text-amber-100 transition"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-6 w-6" />
              ) : (
                <EyeIcon className="h-6 w-6" />
              )}
            </button>
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
           login
          </button>
        </form>

<div className="mt-6 text-center text-sm text-gray-400">
  {/* Removed the sign-up toggle */}
  welcome to release notes
</div>
          </div> </div> );}