import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth-context';
import LoginPage from './pages/login-page';
import RegisterPage from './pages/register-page';
import HomePage from './pages/expenses-page';
import DashboardPage from './pages/dashboard-page';
import ProfilePage from './pages/profile-page';
import { Layout } from './components/layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <PrivateRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/my-profile"
              element={
                <PrivateRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = React.useContext(AuthContext);
  return auth && auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default App;
