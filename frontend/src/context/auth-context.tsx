import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/api/auth/token', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);

      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      const userResponse = await axiosInstance.get('/api/users/me');
      setUser(userResponse.data);

      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        axiosInstance.get('/api/users/me')
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error('Failed to fetch user:', error);
            logout();
          });
      } else {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};