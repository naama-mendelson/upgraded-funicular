import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ticketService } from '../../services/ticketService';
import statusesService from "../../services/statutsServis";
import priorityService from "../../services/priorityService";
import Spinner from '../../components/features/Spinner';
import type { Ticket, Status, PriorityOption } from '../../types/ticketsData';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  TextField,
  MenuItem,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ClearIcon from '@mui/icons-material/Clear';

interface ApiError { message: string; }

const TicketListPage = () => {
  const navigate = useNavigate();
  const { state } = useAuth();
  const token = state?.token || "";
  const isCustomer = state.user?.role === 'customer';

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

 
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tickets', token],
    queryFn: () => ticketService.getAllTickets(token),
    enabled: !!token,
  });

  const { data: statuses = [] } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statusesService.getStatus(token).then(res => res.data),
    enabled: !!token && !isCustomer,
  });

  const { data: priorities = [] } = useQuery({
    queryKey: ["priorities"],
    queryFn: () => priorityService.getPriorities(token).then(res => res.data),
    enabled: !!token && !isCustomer,
  });


  const filteredTickets = useMemo(() => {
    const allTickets = data?.data || [];
    return allTickets.filter((ticket: Ticket) => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "" || ticket.status_id === Number(statusFilter);
      const matchesPriority = priorityFilter === "" || ticket.priority_id === Number(priorityFilter);
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [data, searchQuery, statusFilter, priorityFilter]);

  if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><Spinner /></Box>;

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: isCustomer ? 3 : 1 }}>
        ניהול כרטיסים
      </Typography>

     
      {!isCustomer && (
        <Paper sx={{ mb: 4, p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
            <TextField 
              label="חיפוש נושא" 
              variant="outlined" 
              size="small" 
              fullWidth 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField 
              label="סטטוס" 
              select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              size="small" 
              variant="outlined" 
              fullWidth 
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">הכל</MenuItem>
              {statuses.map((s: Status) => (
                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
              ))}
            </TextField>

            <TextField 
              label="עדיפות" 
              select 
              value={priorityFilter} 
              onChange={(e) => setPriorityFilter(e.target.value)}
              size="small" 
              variant="outlined" 
              fullWidth 
              InputLabelProps={{ shrink: true }}
            >
              <MenuItem value="">הכל</MenuItem>
              {priorities.map((p: PriorityOption) => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </TextField>

            <Button 
              variant="outlined" 
              startIcon={<ClearIcon />}
              onClick={() => { setSearchQuery(""); setStatusFilter(""); setPriorityFilter(""); }}
              sx={{ minWidth: 'fit-content' }}
            >
              ניקוי
            </Button>
          </Stack>
        </Paper>
      )}

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>נושא</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>סטטוס</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>עדיפות</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>עדכון אחרון</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <Typography color="text.secondary">לא נמצאו כרטיסים התואמים לחיפוש</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredTickets.map((ticket: Ticket) => (
                <TableRow key={ticket.id} hover>
                  <TableCell><Typography fontWeight="500">{ticket.subject}</Typography></TableCell>
                  <TableCell><Chip label={ticket.status_name} size="small" variant="outlined" /></TableCell>
                  <TableCell><Chip label={ticket.priority_name} size="small" variant="outlined" /></TableCell>
                  <TableCell>{new Date(ticket.updated_at).toLocaleDateString('he-IL')}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketListPage;