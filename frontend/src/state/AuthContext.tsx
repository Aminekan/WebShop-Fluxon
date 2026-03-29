import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import type { AuthUser, LoginInput, RegisterInput } from "../types";

type AuthContextValue = {
  user: AuthUser | null;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const storageKey = "fluxon.auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setUser(JSON.parse(saved) as AuthUser);
    }
  }, []);

  async function login(input: LoginInput) {
    const nextUser = await api.login(input);
    setUser(nextUser);
    window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
  }

  async function register(input: RegisterInput) {
    const nextUser = await api.register(input);
    setUser(nextUser);
    window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem(storageKey);
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
