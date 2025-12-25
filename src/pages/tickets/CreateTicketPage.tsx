import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Box, 
  Typography, 
  Container, 
  Stack, 
  Paper, 
  TextField, 
  Button, 
  IconButton,
  Breadcrumbs,
  Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';


import { ticketService } from '../../services/ticketService';
import { useAuth } from '../../context/AuthContext';
import type { TicketCreate } from '../../types/ticketsData';

const CreateTicketPage = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const token = state.token;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TicketCreate>();

  const handleFormSubmit = async (data: TicketCreate) => {
    try {
      if (!token) {
        Swal.fire('שגיאה', 'נא להתחבר שוב', 'error');
        return;
      }

      const res = await ticketService.createTicket(data, token);
      
      if (res && res.data) {
        await Swal.fire({
          icon: 'success',
          title: 'הפנייה נשלחה בהצלחה!',
          text: 'צוות התמיכה יטפל בבקשתך בהקדם.',
          showConfirmButton: false,
          timer: 2000
        });
        navigate('/tickets/' + res.data.id);
      }
    } catch (error) {
      console.error("שגיאה ביצירת הכרטיס:", error);
      Swal.fire('שגיאה', 'לא ניתן ליצור כרטיס, נא לנסות שוב מאוחר יותר', 'error');
    }
  };


  const fieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fdfdfd',
      transition: '0.3s',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#1976d2' },
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        

        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/tickets" color="inherit" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            חזרה לרשימת הכרטיסים
          </Link>
          <Typography color="text.primary">פתיחת פנייה</Typography>
        </Breadcrumbs>

        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: '24px', 
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
     
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Box sx={{ 
              bgcolor: 'primary.main', 
              color: 'white', 
              p: 1.5, 
              borderRadius: '12px',
              display: 'flex'
            }}>
              <NoteAddIcon />
            </Box>
            <Box>
              <Typography variant="h4" fontWeight="800">פתיחת פנייה חדשה</Typography>
              <Typography variant="body2" color="text.secondary">
                ספרי לנו במה נוכל לעזור, ונחזור אלייך בהקדם.
              </Typography>
            </Box>
          </Stack>

          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <Stack spacing={4}>
              
              
              <TextField
                fullWidth
                label="נושא הפנייה"
                placeholder="למשל: בעיה בהתחברות למערכת"
                variant="outlined"
                {...register('subject', { required: 'נא להזין נושא' })}
                error={!!errors.subject}
                helperText={errors.subject?.message as string}
                InputLabelProps={{ shrink: true }}
                sx={fieldStyle}
              />

          
              <TextField
                fullWidth
                label="תיאור הבעיה"
                placeholder="כאן כדאי לפרט ככל הניתן על הבעיה..."
                multiline
                rows={6}
                variant="outlined"
                {...register('description', { required: 'נא להזין תיאור' })}
                error={!!errors.description}
                helperText={errors.description?.message as string}
                InputLabelProps={{ shrink: true }}
                sx={fieldStyle}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                <Button 
                  component={RouterLink} 
                  to="/tickets" 
                  variant="text" 
                  color="inherit"
                  sx={{ borderRadius: '12px', px: 3, fontWeight: 'bold' }}
                >
                  ביטול
                </Button>
                
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large"
                  disabled={isSubmitting}
                  endIcon={<SendIcon sx={{ transform: 'scaleX(-1)' }} />} 
                  sx={{ 
                    borderRadius: '12px', 
                    px: 4, 
                    py: 1.5,
                    fontWeight: 'bold',
                    boxShadow: '0 10px 15px -3px rgba(25, 118, 210, 0.3)',
                    textTransform: 'none'
                  }}
                >
                  {isSubmitting ? 'שולח פנייה...' : 'שלחי פנייה'}
                </Button>
              </Box>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateTicketPage;