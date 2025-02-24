import React, { useContext } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { AuthContext } from '../context/auth-context';
import { NavBar } from '../components/navbar';
import { AddExpenseDialog } from '../components/add-expense-dialog';
import { ExpensesList } from '../components/expenses-list';


const HomePage = () => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
    <NavBar/>
    <Container maxWidth="lg" sx={{marginTop: 4}}>
      <ExpensesList />
    </Container>
    </div>
  );
};

export default HomePage;