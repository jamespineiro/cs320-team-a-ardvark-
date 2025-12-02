import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AuthContextType = {
  isAuthed: boolean;
  sessionId: string | null;
  login: (sessionId: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const TOKEN_KEY = 'sessionId';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthed, setIsAuthed] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const existing = localStorage.getItem(TOKEN_KEY);
    setIsAuthed(Boolean(existing));
    setSessionId(existing);
  }, []);

  const value = useMemo(
    () => ({
      isAuthed,
      sessionId,
      login: (sessionId: string) => {
        localStorage.setItem(TOKEN_KEY, sessionId);
        setIsAuthed(true);
        setSessionId(sessionId);
      },
      logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthed(false);
        setSessionId(null);
      },
    }),
    [isAuthed, sessionId]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
