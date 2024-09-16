import { Box, Container, Paper, TextField, Typography, Grid, Button } from "@mui/material"
import { useState } from "react"
import { loginUser } from "../services/auth-service"
import { useNavigate } from "react-router-dom"
import { postRequest } from "../api"


export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            // const data = await loginUser(email, password)
            const response = await postRequest("/api/auth/token", {
                email,
                password
            });

            // if (response.data && response.data.accessToken) {
                navigate("/after-login", { state: { token: response.data } });
            // }
            // else {
                // console.error('No accessToken');
            // }
        }
        catch (err){
            console.log(err)
        }
    }

    return (
        <Container maxWidth='sm'>
            <Paper elevation={2} sx={{padding: 4, marginTop: 4, bgcolor: "ghostwhite"}}>
                <Box sx={{texAlign: 'center', marginBottom: 2}}>
                    <Typography align="center" variant="h4" color="primary">Login</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <TextField
                                label="email"
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
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: 3}}>
                            <Button variant="contained" type="submit" style={{margin: '0 auto',padding: '0.6rem 1.2rem', border: 'none', display: 'flex'}}>Login</Button>
                    </Box>
                </Grid>
                </form>
            </Paper>
        </Container>
    )
}