import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PeopleIcon from '@mui/icons-material/People';

interface SideNavProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface NavItem {
  text: string;
  to: string;
  icon: React.ReactNode;
  exact?: boolean;
}


const commonStyles = {
  mx: 1.5,           
  mb: 0.8,           
  borderRadius: '12px',
  transition: 'all 0.2s ease',
  color: '#475569',  
  
  '&.active': {
    backgroundColor: 'rgba(0, 121, 107, 0.08)',
    '& .MuiListItemIcon-root': {
      color: '#00796b',
    },
    '& .MuiListItemText-primary': {
      fontWeight: '700',
      color: '#004c40'
    },
   
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      height: '60%',
      width: '4px',
      backgroundColor: '#00796b',
      borderRadius: '4px 0 0 4px',
    }
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '12px',
  },
};

const SideNav: React.FC<SideNavProps> = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const { state } = useAuth();
  const { user } = state;

  const navItems = {
    customer: [
      { text: 'Dashboard', to: '/dashboard/customer', icon: <DashboardIcon /> },
      { text: 'My Tickets', to: '/tickets', icon: <ConfirmationNumberIcon />, exact: true },
      { text: 'Create Ticket', to: '/tickets/create', icon: <AddCircleOutlineIcon /> },
    ],
    agent: [
      { text: 'Dashboard', to: '/dashboard/agent', icon: <DashboardIcon /> },
      { text: 'All Tickets', to: '/tickets', icon: <ConfirmationNumberIcon /> },
    ],
    admin: [
      { text: 'Dashboard', to: '/dashboard/admin', icon: <DashboardIcon /> },
      { text: 'Tickets', to: '/tickets', icon: <ConfirmationNumberIcon /> },
      { text: 'Users', to: '/users', icon: <PeopleIcon /> },
    ],
  };

  const drawerContent = (
    <Box sx={{ bgcolor: '#fff', height: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', color: '#00796b' }}>
         MANAGEMENT
      </Toolbar>
      <Divider sx={{ mb: 2 }} />
      <List>
        {user && user.role && navItems[user.role as keyof typeof navItems]?.map((item: NavItem) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={NavLink} 
              to={item.to} 
              end={item.exact} 
              sx={commonStyles}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderRight: '1px solid #e2e8f0', 
            bgcolor: '#fff'
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SideNav;