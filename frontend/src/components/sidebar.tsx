import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

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
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? DRAWER_WIDTH : COLLAPSED_DRAWER_WIDTH,
          boxSizing: 'border-box',
          marginTop: '64px', // Height of AppBar
          overflowX: 'hidden',
          transition: theme => theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: open ? 'flex-end' : 'center',
        padding: '8px'
      }}>
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <List>
        {mainMenuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{ 
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 0, 
              mr: open ? 3 : 'auto', 
              justifyContent: 'center',
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryMenuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{ 
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 0, 
              mr: open ? 3 : 'auto', 
              justifyContent: 'center',
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}; 