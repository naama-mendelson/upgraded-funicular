import React from 'react';

const Spinner = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>טוען נתונים...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh', // תופס חצי גובה מסך
    width: '100%',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3', 
    borderTop: '5px solid #3498db', 
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    marginTop: '15px',
    fontSize: '1.1rem',
    color: '#666',
    fontFamily: 'Arial, sans-serif',
  }
};


const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
document.head.appendChild(styleSheet);

export default Spinner;