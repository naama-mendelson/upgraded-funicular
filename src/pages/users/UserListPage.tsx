import { useAuth } from "../../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import usersService from "../../services/usersService";
import type { UserProps } from "../../types/authData";
import { useNavigate } from "react-router-dom"; 
import Spinner from "../../components/features/Spinner";

// MUI Components
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

const getRoleChipColor = (role: string): ChipColor => {
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

 const UserListPage = () => {
  const navigate = useNavigate(); 
  const { state } = useAuth();
  const token = state.token!;

  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ["users"], // Changed queryKey to be more specific
    queryFn: () => usersService.getAllUsers(token).then(res => res.data),
    enabled: !!token,
  });       

  if (isLoading) return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <Spinner />
      </Box>
  );

  if (error) return (
       <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'text.secondary' }}>
          <ErrorOutlineIcon sx={{ fontSize: 48, mb: 2 }} color="error" />
          <Typography variant="h6">Error Loading Users</Typography>
          <Typography>There was a problem fetching the user list.</Typography>
      </Box>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 4 }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/newUser')}
        >
          Create User
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: UserProps) => (
              <TableRow key={user.id} hover>
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip label={user.role} size="small" color={getRoleChipColor(user.role)} sx={{textTransform: 'capitalize'}}/>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details">
                    <IconButton onClick={() => navigate(`/users/${user.id}`)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default UserListPage;