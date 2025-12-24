import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { state, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/login'); 
  };

  return (
    <nav >
      
      {!state.isAuthenticated ? (
        <>
          <Link to="/login">התחברות</Link>
          <Link to="/register">הרשמה</Link>
        </>
      ) : (
        <>
            <span>hi, {state.user?.name}</span>
     
        {state.isAuthenticated && state.user?.role === 'customer' ?(
          <Link to="/tickets/create" style={{ marginLeft: '10px' }}>
        <button style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#28a745', color: 'white', border: 'none' }}>
          פתיחת כרטיס חדש
        </button>
      </Link>
        ) : null}
          <button onClick={handleLogout}>התנתק</button>
        
        </>
      )}
   
     
    </nav>
  );
};

export default Header;