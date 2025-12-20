'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAuthFromCookie, AuthUser, login as authLogin, logout as authLogout } from './auth';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuthFromCookie();
    setUser(auth);
    setLoading(false);
  }, []);

  const login = useCallback((username: string, password: string) => {
    const result = authLogin(username, password);
    if (result.success) {
      setUser({ username, loggedIn: true });
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setUser(null);
  }, []);

  const isLoggedIn = user?.loggedIn === true;
  const username = user?.username || null;

  return {
    user,
    isLoggedIn,
    username,
    loading,
    login,
    logout,
  };
}

