import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nova_token');

    if (!token) {
      Promise.resolve().then(() => setLoading(false));
      return;
    }

    api.get('/auth/me')
      .then(setUser)
      .catch(() => localStorage.removeItem('nova_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    localStorage.setItem('nova_token', data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try { await api.post('/auth/logout', {}); } catch { /* ignore */ }
    localStorage.removeItem('nova_token');
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, login, logout, isAuthenticated: !!user }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
