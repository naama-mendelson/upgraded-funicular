
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar, CssBaseline } from '@mui/material';
import Topbar from './Topbar';
import SideNav from './SideNav';

const drawerWidth = 240;

const AppShell: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Topbar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
      <SideNav
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
       
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppShell;
