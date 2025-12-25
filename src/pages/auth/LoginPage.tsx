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

// Icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Services & Context
import { authService } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import type { AuthFormInputs } from '../../types/authData';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AuthFormInputs>();

  const onSubmit = async (data: AuthFormInputs) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      Swal.fire({ icon: 'warning', title: 'אימייל לא תקין', text: 'נא להזין כתובת אימייל חוקית' });
      return; 
    }
    if (data.password.length < 6) {
       Swal.fire({ icon: 'warning', title: 'סיסמה קצרה מדי', text: 'מינימום 6 תווים' });
      return;
    }

    try {
      const res = await authService.login(data, data.password);
      if (res && res.data) {
        login(res.data.token, res.data.user);
        Swal.fire({ icon: 'success', title: 'התחברת בהצלחה!', showConfirmButton: false, timer: 1500 });
        navigate('/dashboard/' + res.data.user.role);
      }
    } catch (error: unknown) {
      let message = 'פרטי התחברות שגויים';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      Swal.fire({ icon: 'error', title: 'שגיאה', text: message });
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
                bgcolor: 'primary.main', 
                color: 'white', 
                p: 1.5, 
                borderRadius: '16px', 
                boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)'
              }}>
                <LockOutlinedIcon />
              </Box>
              <Typography variant="h5" fontWeight="800" color="text.primary">
                כניסה למערכת
              </Typography>
              <Typography variant="body2" color="text.secondary">
                הזיני פרטים כדי להתחבר לחשבונך
              </Typography>
            </Stack>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Stack spacing={2.5}>
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
                  disabled={isSubmitting}
                  sx={{ 
                    borderRadius: '12px', 
                    py: 1.4, 
                    fontWeight: 'bold', 
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)'
                  }}
                >
                  {isSubmitting ? 'מתחבר...' : 'התחברות'}
                </Button>
              </Stack>
            </form>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                עדיין אין לך חשבון?{' '}
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  sx={{ 
                    fontWeight: '700', 
                    textDecoration: 'none',
                    color: 'primary.main',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  הירשמי כאן
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;