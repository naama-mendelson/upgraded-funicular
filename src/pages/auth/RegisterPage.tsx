import AuthForm from '../../components/features/AuthForm'   
import type { AuthFormInputs } from '../../types/authData';
import { authService } from '../../services/authService';
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: AuthFormInputs) => {
    try {
      const res = await authService.register(data);
      
      // אם הרישום בשרת הצליח
      if (res && res.status === 201 || res.status === 200) { 
        
        // הערה: הסרנו את ה-login() כי המורה אמרה לעבור להתחברות ידנית
        
        await Swal.fire({
          icon: 'success',
          title: 'נרשמת בהצלחה!',
          text: 'כעת עליך להתחבר למערכת',
          showConfirmButton: false,
          timer: 2000,
          position: 'center',
        });
        
 
        navigate('/login');
      }
    } catch (error) {
      console.error("Register failed:", error);
      Swal.fire({
        icon: 'error',
        title: 'שגיאה בהרשמה',
        text: 'ייתכן שהמשתמש כבר קיים או שיש בעיה בשרת',
      });
    }
  };

  return (
    <>
      <h1>Register Page</h1>
      <Link to="/login">מחובר כבר? להתחברות</Link>
      <AuthForm mode="register" sendData={onSubmit} />
    </>
  );
};

export default RegisterPage;