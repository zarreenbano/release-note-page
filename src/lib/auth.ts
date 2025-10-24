// src/lib/auth.ts

// In-memory user storage (resets on page refresh in Claude artifacts)
// For production, replace with localStorage or a proper backend
let currentUser: string | null = null;

// Mock user database (in a real app, this would be in a backend)
const users = new Map<string, string>([
  ['user1@example.com', 'password1'],
  ['user2@example.com', 'password2'],
]);

/**
 * Get the currently logged-in user
 * @returns The user's email or null if not logged in
 */
export function getCurrentUser(): string | null {
  return currentUser;
}

/**
 * Log in a user
 * @param email - User's email
 * @param password - User's password
 * @returns true if login successful, false otherwise
 */
export function login(email: string, password: string): boolean {
  const storedPassword = users.get(email);
  
  if (storedPassword && storedPassword === password) {
    currentUser = email;
    return true;
  }
  
  return false;
}

/**
 * Log out the current user
 */
export function logout(): void {
  currentUser = null;
}

/**
 * Check if a user is currently authenticated
 * @returns true if a user is logged in, false otherwise
 */
export function isAuthenticated(): boolean {
  return currentUser !== null;
}

/**
 * Sign up a new user (limited to 2 users total)
 * @param email - User's email
 * @param password - User's password
 * @returns true if signup successful, false if user limit reached or user exists
 */
export function signup(email: string, password: string): boolean {
  // Check if user already exists
  if (users.has(email)) {
    return false;
  }
  
  // Check if we've reached the 2-user limit
  if (users.size >= 2) {
    return false;
  }
  
  // Add new user
  users.set(email, password);
  currentUser = email;
  return true;
}

/**
 * Get all registered users (for testing purposes)
 * @returns Array of user emails
 */
export function getAllUsers(): string[] {
  return Array.from(users.keys());
}