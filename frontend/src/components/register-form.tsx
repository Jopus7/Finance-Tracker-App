import { useState } from "react"
import axios from "axios"
import { Container, Box, Typography, TextField, Button } from "@mui/material"
import { postRequest } from "../api"

export const RegisterForm = () => {
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
            console.log(response)
        } catch (error) {
            console.log(error);
        }
        
    }

    return (
            <Container>
                <Box>
                    <Typography variant="h2">Register User</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                        label="First name"
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        />
                        <TextField
                        label="Last name"
                        variant="outlined"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        />
                        <TextField
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                        <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />

                        <Button variant="contained" type="submit">Register user</Button>
                    </form> 
                    
                </Box> 
            </Container>
    )
}