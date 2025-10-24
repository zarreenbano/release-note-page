// src/lib/auth.ts
const STORAGE_KEY = "auth_users";
const CURRENT_USER_KEY = "current_user";

// Hard-coded admin account for your sir
const SIR_CREDENTIALS = {
  email: "sir@example.com",
  password: "sir12345",
};

/**
 * Get all users from localStorage
 */
function getUsers(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

/**
 * Save users to localStorage
 */
function saveUsers(users: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return !!localStorage.getItem(CURRENT_USER_KEY);
}

/**
 * Get current logged-in user email
 */
export function getCurrentUser(): string | null {
  return localStorage.getItem(CURRENT_USER_KEY);
}

/**
 * Logout user
 */
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * SIGN UP – creates a new user
 */
export function signup(email: string, password: string): boolean {
  if (!email || !password) return false;

  const users = getUsers();

  // Prevent duplicate emails
  if (users[email]) {
    return false;
  }

  // Limit to 10 users (you can remove this)
  if (Object.keys(users).length >= 10) {
    return false;
  }

  users[email] = password;
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, email);
  return true;
}

/**
 * LOGIN – checks credentials
 */
export function login(email: string, password: string): boolean {
  if (!email || !password) return false;

  const users = getUsers();

  // Allow sir's hard-coded account
  if (email === SIR_CREDENTIALS.email && password === SIR_CREDENTIALS.password) {
    localStorage.setItem(CURRENT_USER_KEY, email);
    return true;
  }

  // Check normal users
  if (users[email] && users[email] === password) {
    localStorage.setItem(CURRENT_USER_KEY, email);
    return true;
  }

  return false;
}

/**
 * Auto-create sir's account on first load (optional)
 */
if (typeof window !== "undefined" && !getUsers()[SIR_CREDENTIALS.email]) {
  const users = getUsers();
  users[SIR_CREDENTIALS.email] = SIR_CREDENTIALS.password;
  saveUsers(users);
}