import { useState } from "react"
import axios from "axios"
import { Container, Box, Typography, TextField, Button, Grid } from "@mui/material"
import { postRequest } from "../api"
import Paper from '@mui/material/Paper'
// import { makeStyles } from "@mui/material/styles"


// const useStyles = makeStyles({
//     registerForm: {
//         display: 'block',
//     },
// });

export const RegisterForm = () => {
    // const classes = useStyles();
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const handleSubmit = async () => {

        const userData = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        }

        try {
            const response = await postRequest("/api/users/register", userData);
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
            <Container maxWidth="sm" >
                <Paper elevation={2} sx={{padding: 4, marginTop: 4, bgcolor: "ghostwhite"}}>
                    <Box sx={{texAlign: 'center', marginBottom: 2}} >
                    <Typography align="center" variant="h4" color="primary" >Register User</Typography >
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                        label="First name"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        />
                        </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                        label="Last name"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        />
                        </Box>
                        </Grid>
                        <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        </Box>
                        </Grid>
                        <Grid item xs={12}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        </Box>
                        </Grid>
                        </Grid>
                            <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 3}}>
                        <Button variant="contained" type="submit" style={{margin: '0 auto',padding: '0.6rem 1.2rem', border: 'none', display: 'flex'}}>Register user</Button>
                        </Box>
                    </form> 
                    </Paper>
            </Container>
    )
}