// src/app/page.tsx
"use client";
import './globals.css'
import { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { getCurrentUser, logout } from "@/lib/auth";
import ReleaseCard from "@/components/ReleaseCard";

export default function Page() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }

  return (
    <div className="p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🚀 Release Notes</h1>
        <button
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-lg hover:bg-gray-700"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      <ReleaseCard
        version="v1.0.0"
        date="Oct 23, 2025"
        notes={[
          "Initial release of our new Release Notes page!",
          "Login and Signup for 2 users only.",
          "Dark theme inspired by ChatGPT.",
        ]}
      />

      <ReleaseCard
        version="v1.1.0"
        date="Oct 30, 2025"
        notes={[
          "Improved mobile responsiveness.",
          "Added user session persistence.",
          "Minor UI polish.",
        ]}
      />
    </div>
  );
}