// components/ThemeConfig.tsx
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode } from 'react';

interface ThemeConfigProps {
  darkMode: boolean;
  children: ReactNode;
}

const ThemeConfig = ({ darkMode, children }: ThemeConfigProps) => {
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#658e70', light: '#363950' },
      secondary: { main: '#5bc5bc' },
      background: { default: '#121314', paper: '#161e29' },
      text: { primary: '#95c9fb', secondary: '#2979ff' },
      error: { main: '#e2756d' },
    },
    typography: { fontFamily: 'Silkscreen' },
    shape: { borderRadius: 8 },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeConfig;
