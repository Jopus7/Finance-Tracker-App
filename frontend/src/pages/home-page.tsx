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

  if (!auth || !auth.user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome, {auth.user.first_name}
      </Typography>
      <Typography>Email: {auth.user.email}</Typography>
      <Typography>First Name: {auth.user.first_name}</Typography>
      <Typography>Last Name: {auth.user.last_name}</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default HomePage;