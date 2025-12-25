import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useAuth } from "../../context/AuthContext";
import type { UserCreate } from "../../types/authData";
import usersService from "../../services/usersService";
import axios from 'axios';

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";

const CreateUserPage = () => {
  const { state } = useAuth();
  const token = state.token!;
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserCreate>();

  const onSubmit = async (data: UserCreate) => {
    try {
      const res = await usersService.createUser(data, token);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'User Created!',
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate(`/users/${res.data.id}`);
      });
    } catch (error: unknown) {
      console.error("Create user failed", error);
      let message = 'An unexpected error occurred.';
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Creation Failed',
        text: message,
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New User
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Full Name"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isSubmitting}
            />
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              disabled={isSubmitting}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
              disabled={isSubmitting}
            />
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Controller
                name="role"
                control={control}
               
                rules={{ required: "Role is required" }}
                render={({ field }) => (
                  <Select
                    labelId="role-select-label"
                    label="Role"
                    {...field}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="agent">Agent</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                )}
              />
              {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
            </FormControl>
            <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create User"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateUserPage;




