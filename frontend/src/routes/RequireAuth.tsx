import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import type { ReactElement } from 'react';

export default function RequireAuth({ children }: { children: ReactElement }) {
  const { isAuthed } = useAuth();
  const location = useLocation();

  if (!isAuthed) {
    return <Navigate to="/signup" replace state={{ from: location }} />;
  }
  return children;
}
