// context/themes.ts
import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#658e70', light: '#8fb997' },
    secondary: { main: '#5bc5bc' },
    background: { default: '#ffffff', paper: '#f4f6f8' },
    text: { primary: '#000000', secondary: '#2979ff' },
    error: { main: '#e2756d' },
  },
  typography: { fontFamily: 'Noto Sans' },
  shape: { borderRadius: 8 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#658e70', light: '#363950' },
    secondary: { main: '#5bc5bc' },
    background: { default: '#121314', paper: '#161e29' },
    text: { primary: '#95c9fb', secondary: '#2979ff' },
    error: { main: '#e2756d' },
  },
  typography: { fontFamily: 'Silkscreen' },
  shape: { borderRadius: 8 },
});
