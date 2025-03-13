import { Container, Typography, Box, Paper, Grid, Avatar, Button } from '@mui/material';
import { AuthContext } from '../context/auth-context';
import React, { useContext, useState, useEffect } from 'react';

// type Currency = {
//   symbol: string;
//   name: string;
//   code: string;
// }

const ProfilePage = () => {
  const auth = useContext(AuthContext)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [defaultCurrency, setDefaultCurrency] = useState("")


  useEffect(() => {
    if(auth?.user) {
      setFirstName(auth.user.first_name);
      setLastName(auth.user.last_name);
      setEmail(auth.user.email);
      setDefaultCurrency(auth.user.default_currency);
    }
  }, [])

  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  return (
<Container maxWidth="lg" sx={{marginTop: 4}}>
  <Box sx={{padding: 3}}>
  <Paper sx={{padding: 4, margin: '0 auto'}}>
    <Grid container spacing={4}>
      <Grid item xs={12} md={4} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Avatar
      sx={{
        width: 100,
        height:100,
        fontSize: '2.5rem',
        bgcolor: 'primary.main',
        marginBottom: 2
      }}
      >
      {getInitials()}
      </Avatar>

      {/* {!editMode ? ( */}
        <Button variant='contained'> Edit Profile</Button>
      {/* // )} */}
      </Grid>
      <Grid item xs={12} md={6} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant='subtitle1'>First Name</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body1'>{firstName}</Typography>
          </Grid>
          <Grid item xs={4}>
             <Typography variant='subtitle1'>Last Name</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body1'>{lastName}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='subtitle1'>Email</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body1'>{email}</Typography>
          </Grid>
           <Grid item xs={4}>
            <Typography variant='subtitle1'>Default Currency</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant='body1'>{defaultCurrency}</Typography>
          </Grid>
    </Grid>
   </Grid>
   </Grid>
  </Paper>
  </Box>
</Container>
  );
};

export default ProfilePage; 