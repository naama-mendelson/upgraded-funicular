
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

interface TopbarProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ drawerWidth, handleDrawerToggle }) => {
  const { state, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = state;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00796b',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();

      }
    });
  };

  const getRoleChipColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'secondary';
      case 'agent':
        return 'primary';
      case 'customer':
      default:
        return 'default';
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Helpdesk
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={user.role}
              color={getRoleChipColor(user.role)}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user.username ? user.username.charAt(0).toUpperCase() : <AccountCircle />}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{ mt: '45px' }}
            >
              <MenuItem disabled>
                <Typography variant="body1">
                  Signed in as <strong>{user.username}</strong>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
