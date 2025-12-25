import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Link, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton 
} from '@mui/material';

import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { authService } from '../../services/authService';
import type { AuthFormInputs } from '../../types/authData';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthFormInputs>();

  const onSubmit = async (data: AuthFormInputs) => {
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      Swal.fire({
        icon: 'warning',
        title: 'כתובת אימייל שגויה',
        text: 'נא לבדוק שכתובת האימייל מכילה @ וסיומת תקינה',
      });
      return; 
    }

    if (data.password.length < 6) {
       Swal.fire({
        icon: 'warning',
        title: 'סיסמה חלשה',
        text: 'על הסיסמה להכיל לפחות 6 תווים לצורך אבטחה',
      });
      return;
    }

    try {
      const res = await authService.register(data);
      
      if (res && (res.status === 201 || res.status === 200)) { 
        await Swal.fire({
          icon: 'success',
          title: 'נרשמת בהצלחה!',
          text: 'מיד מועברים להתחברות...',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/login');
      }
    } catch (error: unknown) {
      console.error("Register failed:", error);
      let errorMessage = 'אירעה שגיאה בלתי צפויה בעת ההרשמה';

      if (axios.isAxiosError(error) && error.response?.data) {
        errorMessage = error.response.data.message || error.response.data.error || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'שגיאה בהרשמה',
        text: errorMessage, 
      });
    }
  };

  
  const fieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px', 
      backgroundColor: '#f9f9f9',
      transition: '0.3s',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#1976d2' },
      '&.Mui-focused fieldset': { borderWidth: '1.5px' }
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      bgcolor: '#f4f6f8', 
      p: 2 
    }}>
      <Container maxWidth="xs">
        <Card sx={{ 
          borderRadius: '24px', 
          boxShadow: '0 12px 40px rgba(0,0,0,0.06)', 
          overflow: 'hidden' 
        }}>
          <CardContent sx={{ p: 4 }}>
          
            <Stack alignItems="center" spacing={1.5} sx={{ mb: 4 }}>
              <Box sx={{ 
                bgcolor: 'success.main', 
                color: 'white', 
                p: 1.5, 
                borderRadius: '16px',
                boxShadow: '0 4px 10px rgba(76, 175, 80, 0.3)'
              }}>
                <PersonAddOutlinedIcon />
              </Box>
              <Typography variant="h5" fontWeight="800" color="text.primary">
                יצירת חשבון חדש
              </Typography>
              <Typography variant="body2" color="text.secondary">
                הצטרפי אלינו והתחילי לנהל כרטיסים
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
                
                <TextField
                  fullWidth
                  label="שם מלא"
                  variant="outlined"
                  {...register('name', { required: true })}
                  error={!!errors.name}
                  sx={fieldStyle}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="כתובת אימייל"
                  variant="outlined"
                  {...register('email', { required: true })}
                  error={!!errors.email}
                  sx={fieldStyle}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  label="סיסמה"
                  type={showPassword ? 'text' : 'password'}
                  variant="outlined"
                  {...register('password', { required: true })}
                  error={!!errors.password}
                  sx={fieldStyle}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button 
                  fullWidth 
                  size="large" 
                  type="submit" 
                  variant="contained" 
                  color="success"
                  disabled={isSubmitting}
                  sx={{ 
                    borderRadius: '12px', 
                    py: 1.4, 
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
                    mt: 1
                  }}
                >
                  {isSubmitting ? 'יוצר חשבון...' : 'הרשמה למערכת'}
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                מחוברת כבר?{' '}
                <Link 
                  component={RouterLink} 
                  to="/login" 
                  sx={{ 
                    fontWeight: '700', 
                    textDecoration: 'none',
                    color: 'success.main',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  להתחברות כאן
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;