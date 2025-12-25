import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';

const AdminDashboard = () => {
  const adminCards = [
    {
      title: 'User Management',
      description: 'Create, view, and manage all user accounts.',
      link: '/users',
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
    {
      title: 'Ticket Overview',
      description: 'View and manage all support tickets in the system.',
      link: '/tickets',
      icon: <ConfirmationNumberIcon fontSize="large" color="primary" />,
    },
    {
      title: 'System Configuration',
      description: 'Manage ticket statuses, priorities, and other system settings.',
      link: '/dashboard/admin/status', 
      icon: <SettingsIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: '#2c3e50' }}>
        Admin Dashboard
      </Typography>

      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3,         
          justifyContent: 'center' 
        }}
      >
        {adminCards.map((card) => (
          <Card 
            key={card.title} 
            sx={{ 
        
              width: { xs: '100%', md: 'calc(33.333% - 16px)' }, 
              minWidth: '300px',
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 3, 
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-5px)' } 
            }}
          >
            <CardContent sx={{ flexGrow: 1, pt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    backgroundColor: '#e3f2fd', 
                    p: 1.5, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  {card.icon}
                </Box>
                <Typography variant="h5" component="h2" sx={{ ml: 2, fontWeight: '600' }}>
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {card.description}
              </Typography>
            </CardContent>
            
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button 
                component={RouterLink} 
                to={card.link} 
                variant="contained" 
                fullWidth 
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Go to {card.title}
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default AdminDashboard;