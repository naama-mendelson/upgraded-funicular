import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { UserCreate } from "../../types/authData";
import usersService from "../../services/usersService";

const CreateUserPage = () => {
  const { state } = useAuth();
  const token = state.token!;
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserCreate>();

  const onSubmit = async (data: UserCreate) => {
    try {
      const res = await usersService.createUser(data, token);
     navigate(`/users/${res.data.id}`)
    } catch (error) {
      console.error("Create user failed", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "320px",
      }}
    >
      <h2>יצירת משתמש</h2>

      {/* NAME */}
      <input
        placeholder="שם"
        {...register("name", { required: "חובה להזין שם" })}
      />
      {errors.name && <span>{errors.name.message}</span>}

      {/* EMAIL */}
      <input
        placeholder="אימייל"
        type="email"
        {...register("email", {
          required: "חובה להזין אימייל",
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      {/* PASSWORD */}
      <input
        placeholder="סיסמה"
        type="password"
        {...register("password", {
          required: "חובה להזין סיסמה",
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      {/* ROLE */}
      <select {...register("role", { required: "חובה לבחור תפקיד" })}>
        <option value="">בחר תפקיד</option>
        <option value="customer">Customer</option>
        <option value="agent">Agent</option>
        <option value="admin">Admin</option>
      </select>
      {errors.role && <span>{errors.role.message}</span>}

      <button type="submit">צור משתמש</button>
    </form>
  );
};

export default CreateUserPage;




