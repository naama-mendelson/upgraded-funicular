import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ticketService } from '../../services/ticketService';
import { useAuth } from '../../context/AuthContext';
import type { TicketCreate } from '../../types/ticketsData';
import CreatTicketForm from '../../components/features/CreatTicketForm';
import Swal from 'sweetalert2';

const CreateTicketPage = () => {
  const { state } = useAuth();
  const navigate = useNavigate();
  const token = state.token;

  const handleFormSubmit = async (data: TicketCreate) => {
    try {
      // מוודאים שיש טוקן
      if (!token) {
        alert("נא להתחבר שוב");
        return;
      }

      // שליחה לשרת (הנתונים מגיעים מהטופס והטוקן מה-Context)
      const res = await ticketService.createTicket(data, token);
      
      if (res && res.data) {
        await Swal.fire({
          icon: 'success',
          title: 'כרטיס נוצר!',
          timer: 1500
        });
        navigate('/tickets/' + res.data.id);
      }
    } catch (error) {
      console.error("שגיאה ביצירת הכרטיס:", error);
      Swal.fire('שגיאה', 'לא ניתן ליצור כרטיס, בדוק את השרת', 'error');
    }
  };

  return (
    <div>
      <Link to="/tickets">חזרה</Link>
      <h1>פתיחת פנייה חדשה</h1>
      <CreatTicketForm sendData={handleFormSubmit} />
    </div>
  );
};

export default CreateTicketPage;