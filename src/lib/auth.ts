// Auth utilities for client-side authentication
import Cookies from 'js-cookie';

export const AUTH_COOKIE_NAME = 'auth_session';
export const FIXED_USERNAME = 'admin';
export const FIXED_PASSWORD = 'admin123';

export interface AuthUser {
  username: string;
  loggedIn: boolean;
}

// Client-side auth functions
export const getAuthFromCookie = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  
  const authData = Cookies.get(AUTH_COOKIE_NAME);
  if (authData) {
    try {
      return JSON.parse(authData);
    } catch {
      return null;
    }
  }
  return null;
};

export const setAuthCookie = (user: AuthUser) => {
  Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(user), { 
    expires: 1, // 1 day
    sameSite: 'lax'
  });
};

export const removeAuthCookie = () => {
  Cookies.remove(AUTH_COOKIE_NAME);
};

export const isLoggedIn = (): boolean => {
  const auth = getAuthFromCookie();
  return auth?.loggedIn === true;
};

export const getUsername = (): string | null => {
  const auth = getAuthFromCookie();
  return auth?.username || null;
};

export const login = (username: string, password: string): { success: boolean; error?: string } => {
  if (username === FIXED_USERNAME && password === FIXED_PASSWORD) {
    setAuthCookie({ username, loggedIn: true });
    return { success: true };
  }
  return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng!' };
};

export const logout = () => {
  removeAuthCookie();
};

