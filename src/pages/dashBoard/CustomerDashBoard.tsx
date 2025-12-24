import React from 'react';
import { Link } from 'react-router-dom';

const CustomerDashBoard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>לוח בקרה - לקוח</h1>
      <p>ברוך הבא למערכת ניהול הכרטיסים שלנו.</p>
      
      <hr />
      <Link to="/tickets">
        <button style={{ padding: '10px 20px', cursor: 'pointer' }}>
          לצפייה בכרטיסים שלי
        </button>
      </Link>
      
    </div>
  );
};

export default CustomerDashBoard;