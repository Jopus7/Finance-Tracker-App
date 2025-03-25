import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { NavBar } from "../components/navbar";
import { Button, Container, Typography, Box, Paper, Grid } from "@mui/material";
import { Dashboard } from "../components/dashboard/dashboard";

const DashboardPage = () => {
  const auth = useContext(AuthContext);

  if (!auth || !auth.user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <NavBar />
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Box sx={{ padding: 3 }}>
          <Paper sx={{ padding: 4, margin: "0 auto" }}>
            <Grid container spacing={4}>
              <Dashboard />
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardPage;
