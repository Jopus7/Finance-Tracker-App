import { AppBar, Button, Toolbar, Typography } from "@mui/material"
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const NavBar = () => {
    const auth = useContext(AuthContext);

    const handleLogout = () => {
      if (auth) {
        auth.logout();
      }
    };

    return (
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Finance Tracker</Typography>
            <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>Hello, {auth?.user?.first_name}</Typography>
            <Button onClick={handleLogout} color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
    )
}