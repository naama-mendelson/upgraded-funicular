import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Status } from '../../types/ticketsData';
import statutsServis from '../../services/statutsServis';
import axios from 'axios';


import {
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Spinner from './Spinner';

const AdminAddStatus = () => {
  const { state } = useAuth();
  const token = state.token!;
  const queryClient = useQueryClient();
  const [newStatusName, setNewStatusName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: statuses = [], isLoading } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => statutsServis.getStatus(token).then(res => res.data),
  });

  const addStatusMutation = useMutation({
    mutationFn: (name: string) => statutsServis.createStatus(token, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["statuses"] });
      setNewStatusName("");
      setDialogOpen(false); 
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Status Added!',
        showConfirmButton: false,
        timer: 2000,
      });
    },
    onError: (error: unknown) => {
      let message = 'Could not add status.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
      });
    }
  });

  const handleAddStatus = () => {
    if (!newStatusName.trim()) return;
    addStatusMutation.mutate(newStatusName);
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 2, mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2">
            Manage Statuses
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setDialogOpen(true)}
          >
            New Status
          </Button>
        </Box>
        <Divider />
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <Spinner />
          </Box>
        ) : (
          <List>
            {statuses.map((s: Status) => (
              <ListItem key={s.id} divider>
                <ListItemText primary={s.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Add New Status</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Status Name"
            type="text"
            fullWidth
            variant="standard"
            value={newStatusName}
            onChange={(e) => setNewStatusName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddStatus()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddStatus}
            disabled={!newStatusName.trim() || addStatusMutation.isPending}
          >
            {addStatusMutation.isPending ? 'Adding...' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminAddStatus;


