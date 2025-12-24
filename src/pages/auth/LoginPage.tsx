import AuthForm from '../../components/features/AuthForm';
import type { AuthFormInputs,UserProps } from '../../types/authData';
import { authService } from '../../services/authService'; 
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { Navigate, useNavigate,Link } from "react-router-dom";

const LoginPage = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

const onSubmit = async (data: AuthFormInputs) => {
  try {
    const res = await authService.login(data);
    if (res && res.data) {
      login(res.data.token, res.data.user);
      
   
      Swal.fire({
        icon: 'success',
        title: 'התחברת בהצלחה!',
        showConfirmButton: false, 
        timer: 1500, 
      });

      navigate('/dashboard/' + res.data.user.role);
    }
  } catch (error) {
    console.error("Login failed:", error);
    Swal.fire({
      icon: 'error',
      title: 'שגיאה בהתחברות',
      text: 'נא לבדוק את פרטי המשתמש',
    });
  }
};
  return (
    <div>
      <h1>Login Page</h1>
      <Link to="/register">משתמש חדש? להרשמה</Link>
      <AuthForm mode="login" sendData={onSubmit} />
    </div>
  )
}

export default LoginPage
