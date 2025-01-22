// App.tsx
import { useEffect, useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import ThemeConfig from './components/ThemeConfig';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);

  useEffect(() => {
    if (isSmallScreen) setDrawerOpen(false);
  }, [isSmallScreen]);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <ThemeConfig darkMode={darkMode}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header
          isSmallScreen={isSmallScreen}
          darkMode={darkMode}
          onToggleDrawer={handleDrawerToggle}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar
            drawerOpen={drawerOpen}
            isSmallScreen={isSmallScreen}
            onToggleDrawer={handleDrawerToggle}
          />
          <MainContent />
        </Box>
      </Box>
    </ThemeConfig>
  );
};

export default App;
