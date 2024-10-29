import React, { useContext } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/auth-context';

const HomePage = () => {
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    if (auth) {
      auth.logout();
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome, {auth?.user?.email}
      </Typography>
      <Typography>{auth?.user.first_name}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default HomePage;
