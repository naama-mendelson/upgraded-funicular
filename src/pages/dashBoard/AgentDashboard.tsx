import TicketListPage from '../tickets/ticketListPage';
import { Container, Typography, Box } from '@mui/material';

const AgentDashboard = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ pt: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Agent Dashboard
        </Typography>
        <TicketListPage />
      </Box>
    </Container>
  )
}

export default AgentDashboard;