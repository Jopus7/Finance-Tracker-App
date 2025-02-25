import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material"
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

export const NavBar = () => {
    const auth = useContext(AuthContext);

    const handleLogout = () => {
      if (auth) {
        auth.logout();
      }
    };

    return (
        <AppBar 
          position="fixed" 
          sx={{ 
            backgroundColor: '#fff',
            boxShadow: 'none',
            borderBottom: '1px solid #e0e0e0'
          }}
        >
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <AssuredWorkloadIcon sx={{ color: '#1976d2', marginRight: 1 }} />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  color: '#1976d2',
                  fontWeight: 'bold'
                }}
              >
                Finance Tracker
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              component="div" 
              sx={{ 
                marginRight: 2,
                color: '#666666',
                fontWeight: 'bold'
              }}
            >
              Hello, {auth?.user?.first_name}
            </Typography>
            <Button 
              onClick={handleLogout} 
              sx={{ color: '#000' }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
    )
}