import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth-context';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import HomePage from './pages/home-page';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = React.useContext(AuthContext);
  return auth && auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
