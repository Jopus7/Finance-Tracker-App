import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const isActive = (path: string) => location.pathname === path;

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

  const listItemStyles = (active: boolean) => ({
    justifyContent: open ? 'initial' : 'center',
    px: 2.5,
    position: 'relative',
    backgroundColor: active ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
    '&::before': active ? {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: '4px',
      backgroundColor: '#1976d2',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '4px',
    } : {},
    '&:hover': {
      backgroundColor: active ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)',
    }
  });

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
          marginTop: '64px',
          overflowX: 'hidden',
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
          borderTop: '1px solid #e0e0e0',
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
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={listItemStyles(isActive(item.path))}
          >
            <ListItemIcon sx={{ 
              minWidth: 0, 
              mr: open ? 3 : 'auto', 
              justifyContent: 'center',
              color: isActive(item.path) ? '#1976d2' : 'inherit'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                opacity: open ? 1 : 0,
                color: isActive(item.path) ? '#1976d2' : 'inherit'
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider 
        sx={{ 
          margin: '8px 8px',
          borderColor: '#e0e0e0',
          borderWidth: '1px',
          width: 'auto'
        }} 
      />
      <List>
        {secondaryMenuItems.map((item) => (
          <ListItem 
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={listItemStyles(isActive(item.path))}
          >
            <ListItemIcon sx={{ 
              minWidth: 0, 
              mr: open ? 3 : 'auto', 
              justifyContent: 'center',
              color: isActive(item.path) ? '#1976d2' : 'inherit'
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                opacity: open ? 1 : 0,
                color: isActive(item.path) ? '#1976d2' : 'inherit'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}; 