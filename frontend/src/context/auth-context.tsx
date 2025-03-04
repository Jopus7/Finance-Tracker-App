import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';


interface User {
  email: string;
  first_name: string;
  last_name: string;
  default_currency: string
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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/api/auth/token', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);

      // Fetch user details
      const userResponse = await axiosInstance.get('/api/users/me/');
      setUser(userResponse.data);

      navigate('/dashboard');
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
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          // Fetch user details
          axiosInstance.get('/api/users/me/')
            .then(response => {
              setUser(response.data);
              setLoading(false);
            })
            .catch(error => {
              console.error('Failed to fetch user:', error);
              logout();
              setLoading(false);
            });
        } else {
          // Token is expired
          logout();
          setLoading(false);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
