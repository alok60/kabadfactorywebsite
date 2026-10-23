import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiFetch, type Session } from "./api";

type AuthContextValue = {
  session: Session | null;
  loading: boolean;
  setSession: (session: Session | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue>({
  session: null,
  loading: true,
  setSession: () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setStoredSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("kabadFactorySession");
    if (!raw) {
      setLoading(false);
      return;
    }
    const parsed = JSON.parse(raw) as Session;
    apiFetch<{ user: Session["user"] }>("/auth/me", { token: parsed.token })
      .then((response) => setStoredSession({ ...parsed, user: response.user }))
      .catch(() => localStorage.removeItem("kabadFactorySession"))
      .finally(() => setLoading(false));
  }, []);

  function setSession(next: Session | null) {
    setStoredSession(next);
    if (next) localStorage.setItem("kabadFactorySession", JSON.stringify(next));
    else localStorage.removeItem("kabadFactorySession");
  }

  const value = useMemo(() => ({
    session,
    loading,
    setSession,
    logout: () => setSession(null)
  }), [loading, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
