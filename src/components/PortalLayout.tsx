// components/MainLayout.tsx
import { Box, Toolbar, useMediaQuery } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PortalLayout = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    if (isSmallScreen) {
      setDrawerOpen(false);
    }
  }, [isSmallScreen]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header
        isSmallScreen={isSmallScreen}
        onToggleDrawer={handleDrawerToggle}
      />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          drawerOpen={drawerOpen}
          isSmallScreen={isSmallScreen}
          onToggleDrawer={handleDrawerToggle}
        />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Outlet /> {/* Render child routes here */}
        </Box>
      </Box>
    </Box>
  );
};

export default PortalLayout;
