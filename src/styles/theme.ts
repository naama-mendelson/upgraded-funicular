
import { createTheme } from '@mui/material/styles';

// A calm, professional color palette
const palette = {
  primary: {
    main: '#00796b', // A teal shade for primary actions
    light: '#48a999',
    dark: '#004c40',
  },
  secondary: {
    main: '#f50057', // A pink for secondary actions if needed, though we'll use it sparingly
  },
  background: {
    default: '#f4f6f8', // A very light grey for the main background
    paper: '#ffffff', // White for cards, tables, and other surfaces
  },
  text: {
    primary: '#212121', // Dark grey for primary text
    secondary: '#757575', // Lighter grey for secondary text
  },
};

// Theme configuration
const theme = createTheme({
  palette,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: palette.background.paper,
          color: palette.text.primary,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          }
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 24,
          fontWeight: 600,
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: palette.primary.dark,
          },
        },
      },
    },
    MuiChip: {
        styleOverrides: {
            root: {
                fontWeight: 500,
            }
        }
    }
  },
});

export default theme;
