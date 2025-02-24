import { Box } from '@mui/material';
import { NavBar } from './navbar';
import { Sidebar } from './sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px', // Height of AppBar
          marginLeft: '240px', // Width of Sidebar
        }}
      >
        {children}
      </Box>
    </Box>
  );
}; 