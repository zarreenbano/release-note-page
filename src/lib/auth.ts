// src/lib/auth.ts


const STORAGE_KEY = "auth_users";
const CURRENT_USER_KEY = "current_user";

const SIR_USERNAME = "sirji";
const SIR_PASSWORD = "sir12345";

interface User {
  id: string;
  password: string;
}

function getUsers(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {};
}

function saveUsers(users: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function ensureSirAccount() {
  if (typeof window === "undefined") return;
  const users = getUsers();
  if (!users[SIR_USERNAME]) {
    users[SIR_USERNAME] = SIR_PASSWORD;
    saveUsers(users);
  }
}
ensureSirAccount();

function saveCurrentUser(id: string) {
  const user: User = { id, password: getUsers()[id] || "" };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function signup(id: string, password: string): boolean {
  if (!id || !password) return false;
  const users = getUsers();
  if (users[id]) return false;
  if (Object.keys(users).length >= 10) return false;

  users[id] = password;
  saveUsers(users);
  saveCurrentUser(id);
  return true;
}

export function login(id: string, password: string): boolean {
  if (!id || !password) return false;

  if (id === SIR_USERNAME && password === SIR_PASSWORD) {
    saveCurrentUser(id);
    return true;
  }

  const users = getUsers();
  if (users[id] && users[id] === password) {
    saveCurrentUser(id);
    return true;
  }

  return false;
}