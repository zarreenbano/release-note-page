'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, signup } from '@/lib/auth';

export default function AuthForm() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let success = false;

    if (isSignup) {
      success = signup(userId, password);
    } else {
      success = login(userId, password);
    }

    if (success) {
      router.push('/cardds');
    } else {
      setError(
        isSignup
          ? 'Signup failed – userId taken or limit reached'
          : 'Invalid userId or password'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full min-h-[590px] max-w-lg bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 space-y-8 shadow-2xl">

        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Release Notes
        </h1>

        <h2 className="ml-[127px] relative inline-block text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-r from-amber-100 via-amber-200 to-amber-100 text-center mb-3 drop-glow">
          {isSignup ? 'Sign Up' : 'Login'}
          <span className="absolute inset-x-0 -bottom-1 h-1 bg-linear-to-r from-transparent via-white/70 to-transparent opacity-70 blur-md animate-shine"></span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-2xl font-medium mb-2 text-amber-100">
              User ID
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-6 py-4 bg-gray-700 rounded-lg border border-gray-600 text-amber-100 placeholder-gray-500 focus:border-amber-200 focus:outline-none transition"
              placeholder="alice001"
              required
            />
          </div>

          <div>
            <label className="block text-2xl font-medium mb-2 text-amber-100">
              Password
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
            {isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
            className="ml-2 text-blue-400 hover:text-blue-300 font-medium"
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </div>

        {/* Your 2 Users */}
        {!isSignup && (
          <div className="mt-6 text-center text-xs text-gray-400 space-y-1">
            <p className="font-semibold text-amber-200">Test Credentials:</p>
            <p><span className="text-blue-300">alice001</span> / <span className="text-green-300">pass1</span></p>
            <p><span className="text-blue-300">bob002</span> / <span className="text-green-300">pass2</span></p>
          </div>
        )}
      </div>
    </div>
  );
}