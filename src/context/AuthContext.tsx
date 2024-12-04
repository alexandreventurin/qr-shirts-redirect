import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState } from '../types';
import { storage } from '../utils/storage';

interface AuthContextType {
  auth: AuthState;
  login: (data: { email: string; orderCode: string; redirectUrl: string }) => void;
  logout: () => void;
  getRedirectUrl: () => string;
  setRedirectUrl: (url: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    email: null,
    orderCode: null,
    urlCode: null
  });
  const [redirectUrl, setRedirectUrlState] = useState<string>('');

  useEffect(() => {
    storage.initializeWithMockData();
  }, []);

  const login = (data: { email: string; orderCode: string; redirectUrl: string }) => {
    const userData = storage.getUserData(data.orderCode);
    if (userData) {
      setAuth({
        isAuthenticated: true,
        email: data.email,
        orderCode: data.orderCode,
        urlCode: userData.urlCode
      });
      setRedirectUrlState(userData.redirectUrl || '');
    }
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      email: null,
      orderCode: null,
      urlCode: null
    });
    setRedirectUrlState('');
  };

  const getRedirectUrl = () => redirectUrl;

  const setRedirectUrl = (url: string) => {
    if (auth.orderCode && auth.email && auth.urlCode) {
      storage.saveUserData(auth.orderCode, auth.email, auth.urlCode, url);
      setRedirectUrlState(url);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, getRedirectUrl, setRedirectUrl }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};