import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from 'sweetalert2';


import {
  Container, Paper, Typography, Select, MenuItem, Button, Box,
  CircularProgress, Alert, Stack, Divider, Card, CardContent,
  CardHeader, FormControl, InputLabel, Avatar, TextField, IconButton
} from "@mui/material";


import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';


import ticketService from "../../services/ticketService";
import commentService from "../../services/commentService";
import statusesService from "../../services/statutsServis";
import priorityService from "../../services/priorityService";
import usersService from "../../services/usersService";


import { useAuth } from "../../context/AuthContext";

import Spinner from "../../components/features/Spinner";

import type { Comment } from "../../types/commetData"; 
import type { Status, PriorityOption, Ticket } from "../../types/ticketsData";
import type { UserProps } from "../../types/authData";

interface ApiError {
  response?: { data?: { message?: string } };
  message: string;
}

const TicketDetailPage = () => {
  const { state } = useAuth();
  const params = useParams();
  const ticketId = params.ticketId || params.id; 
  
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [newCommentText, setNewCommentText] = useState("");

  const id = Number(ticketId);
  const token = state.token!;
  const role = state.user?.role;


  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end', 
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });


  const { data: ticket, isLoading: ticketLoading, error: ticketError } = useQuery<Ticket>({
    queryKey: ["ticket", id],
    queryFn: () => ticketService.getTicketById(id, token).then((res) => res.data),
    enabled: !!id && !!token,
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: ["comments", id],
    queryFn: () => commentService.getComments(id, token).then((res) => res.data),
    enabled: !!id && !!token,
  });

  const { data: statuses = [] } = useQuery<Status[]>({
    queryKey: ["statuses"],
    queryFn: () => statusesService.getStatus(token).then((res) => res.data),
  });

  const { data: priorities = [] } = useQuery<PriorityOption[]>({
    queryKey: ["priorities"],
    queryFn: () => priorityService.getPriorities(token).then((res) => res.data),
  });

  const { data: agents = [] } = useQuery<UserProps[]>({
    queryKey: ["agents"],
    queryFn: () => usersService.getAllUsers(token).then(res => res.data),
    enabled: role === "admin" || role === "agent",
  });


  const updateTicketMutation = useMutation({
    mutationFn: (updateData: Partial<Ticket>) => ticketService.patchTicket(token, id, updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
      Toast.fire({ icon: 'success', title: 'Ticket updated' });
    },
    onError: (error: ApiError) => {
      Swal.fire({ icon: 'error', title: 'Update failed', text: error.response?.data?.message || error.message });
    }
  });

  const updateTicketAgent = useMutation({
    mutationFn: (agentData: { assigned_to: number }) => ticketService.patchTicket(token, id, agentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ticket", id] });
      Toast.fire({ icon: 'success', title: 'Agent assigned' });
    },
    onError: (error: ApiError) => {
      Swal.fire({ icon: 'error', title: 'Assignment failed', text: error.response?.data?.message || error.message });
    }
  });

  const addCommentMutation = useMutation({
    mutationFn: (content: string) => commentService.createComment(id, token, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setNewCommentText("");
      Toast.fire({ icon: 'success', title: 'Comment added', timer: 1500 });
    },
  });

  const handleDeleteTicket = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        ticketService.deleteTicket(id, token).then(() => {
          Swal.fire({ title: 'Deleted!', icon: 'success', timer: 2000, showConfirmButton: false });
          navigate("/tickets");
        });
      }
    });
  };
  
  if (ticketLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><Spinner /></Box>;
  if (ticketError || !ticket) return <Container maxWidth="md"><Alert severity="error" sx={{ mt: 4 }}>Error loading ticket #{id}</Alert></Container>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="flex-start">
        
        <Box sx={{ flex: 3, width: '100%' }}>
          <Stack spacing={3}>
            <Button component={Link} to="/tickets" startIcon={<ArrowBackIcon />} sx={{ alignSelf: 'flex-start' }}>
                Back to Tickets List
            </Button>

            <Paper sx={{ p: 3, borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>{ticket.subject}</Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: 'text.secondary', lineHeight: 1.7 }}>
                    {ticket.description}
                </Typography>
            </Paper>

            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <CardHeader title="Conversation" sx={{ bgcolor: '#f8fafc' }} />
              <CardContent sx={{ maxHeight: '500px', overflowY: 'auto', p: 3, bgcolor: '#ffffff' }}>
                {!commentsLoading && comments.length === 0 ? (
                  <Typography sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>No messages yet.</Typography>
                ) : (
                  <Stack spacing={2.5}>
                    {comments.map((comment: Comment) => {
                      const isMe = comment.author_id === Number(state.user?.id);
                      return (
                        <Box key={comment.id} sx={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
                          <Stack direction={isMe ? 'row-reverse' : 'row'} spacing={1.5} alignItems="flex-end" sx={{ maxWidth: '85%' }}>
                            <Avatar sx={{ bgcolor: isMe ? 'primary.main' : 'secondary.main', width: 36, height: 36 }}>
                                {comment.author_name.charAt(0)}
                            </Avatar>
                            <Paper sx={{ 
                              p: 2, 
                              bgcolor: isMe ? 'primary.main' : '#f1f5f9', 
                              color: isMe ? 'white' : 'text.primary',
                              borderRadius: isMe ? '16px 16px 2px 16px' : '16px 16px 16px 2px'
                            }}>
                              <Typography variant="caption" fontWeight="bold" display="block" sx={{ mb: 0.5, opacity: 0.9 }}>
                                {comment.author_name}
                              </Typography>
                              <Typography variant="body2">{comment.content}</Typography>
                            </Paper>
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                )}
              </CardContent>
              <Divider />
              <Box sx={{ p: 2, display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth multiline maxRows={4} size="small"
                    placeholder="Write a message..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    sx={{ bgcolor: 'white', borderRadius: '8px' }}
                />
                <IconButton color="primary" onClick={() => addCommentMutation.mutate(newCommentText)} disabled={!newCommentText.trim()}>
                    <SendIcon />
                </IconButton>
              </Box>
            </Card>
          </Stack>
        </Box>

        <Box sx={{ flex: 1, width: '100%', position: { md: 'sticky' }, top: 100 }}>
            <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <CardHeader title="Details" subheader={`Ticket #${id}`} />
                <Divider />
                <CardContent>
                    <Stack spacing={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel shrink>Status</InputLabel>
                            {role === "customer" ? (
                                <Typography sx={{ p: 1.5, border: '1px solid #e2e8f0', borderRadius: '8px', bgcolor: '#f8fafc' }}>
                                  {ticket.status_name}
                                </Typography>
                            ) : (
                                statuses.length > 0 && (
                                  <Select notched value={ticket.status_id} label="Status" onChange={(e) => updateTicketMutation.mutate({ status_id: Number(e.target.value) })}>
                                      {statuses.map((s) => <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>)}
                                  </Select>
                                )
                            )}
                        </FormControl>
                        
                        <FormControl fullWidth size="small">
                            <InputLabel shrink>Priority</InputLabel>
                             {role === "customer" ? (
                                <Typography sx={{ p: 1.5, border: '1px solid #e2e8f0', borderRadius: '8px', bgcolor: '#f8fafc' }}>
                                  {ticket.priority_name}
                                </Typography>
                            ) : (

                                priorities.length > 0 && (
                                  <Select notched value={ticket.priority_id} label="Priority" onChange={(e) => updateTicketMutation.mutate({ priority_id: Number(e.target.value) })}>
                                      {priorities.map((p) => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)}
                                  </Select>
                                )
                            )}
                        </FormControl>

                        {(role === "admin" || role === "agent") && (
                            <FormControl fullWidth size="small">
                                <InputLabel shrink>Assignee</InputLabel>
                                {agents.length > 0 && (
                                  <Select notched value={ticket.assigned_to ?? ""} label="Assignee" onChange={(e) => updateTicketAgent.mutate({ assigned_to: Number(e.target.value) })}>
                                      <MenuItem value=""><em>Unassigned</em></MenuItem>
                                      {agents.map(a => <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>)}
                                  </Select>
                                )}
                            </FormControl>
                        )}
                        
                        {role === "admin" && (
                             <Button variant="contained" color="error" fullWidth startIcon={<DeleteIcon />} onClick={handleDeleteTicket} sx={{ borderRadius: '8px', mt: 2 }}>
                                Delete Ticket
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Box>
      </Stack>
    </Container>
  );
};

export default TicketDetailPage;