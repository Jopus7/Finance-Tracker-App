import React, { useContext } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { AuthContext } from '../context/auth-context';
import { NavBar } from '../components/navbar';
import { AddExpenseDialog } from '../components/add-expense-dialog';
import { ExpensesList } from '../components/expenses-list';


const HomePage = () => {
  const auth = useContext(AuthContext);

  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }


  if (!auth || !auth.user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
    <NavBar/>
    <Container maxWidth="sm" sx={{marginTop: 4}}>
      <Box textAlign="center">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Add Expense</Button>
      </Box>
      <ExpensesList />
      <AddExpenseDialog open={dialogOpen} onClose={handleDialogClose}/>
    </Container>
    </div>
  );
};

export default HomePage;