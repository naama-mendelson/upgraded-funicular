import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Paper, Stack, Button, Divider, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CustomerDashBoard = () => {
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: { xs: 2, md: 4 }, mt: 2 }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            לוח בקרה - לקוח
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ברוך הבא למערכת ניהול הכרטיסים שלנו.
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Button
              component={RouterLink}
              to="/tickets"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              לצפייה בכרטיסים שלי
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CustomerDashBoard;