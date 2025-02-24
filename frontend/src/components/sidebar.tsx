import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const mainMenuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      text: 'Expense History',
      icon: <HistoryIcon />,
      path: '/expenses'
    }
  ];

  const secondaryMenuItems = [
    {
      text: 'My Profile',
      icon: <PersonIcon />,
      path: '/my-profile'
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        edge="start"
        sx={{ marginRight: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '64px', // Height of AppBar
          },
        }}
      >
        <List>
          {mainMenuItems.map((item) => (
            <ListItem 
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {secondaryMenuItems.map((item) => (
            <ListItem 
              key={item.text}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}; 