import { Box, Container, Paper, TextField, Typography } from "@mui/material"
import { useState } from "react"


export const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async () => {

        const userData = {
            email,
            password,
        }
    }

    return (
        <Container maxWidth='sm'>
            <Paper>
                <Box>
                    <Typography>Login</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="email"
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
                </form>
            </Paper>
        </Container>
    )
}