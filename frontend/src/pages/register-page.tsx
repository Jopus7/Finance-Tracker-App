import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
  
    const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await axiosInstance.post('/api/users/register', {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        });
        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        setError('Registration failed. Please try again.');
      }
    };
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="First Name"
            fullWidth
            required
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            fullWidth
            required
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
        <Typography variant="body2" align="center" marginTop={2}>
          Already have an account?{' '}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Container>
    );
  };
  
  export default RegisterPage;