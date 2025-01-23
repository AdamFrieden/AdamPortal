// components/MainLayout.tsx
import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const PortalLayout = () => {
  const isSmallScreen = window.matchMedia('(max-width: 600px)').matches;
  const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

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
          <Outlet /> {/* Render child routes here */}
        </Box>
      </Box>
    </Box>
  );
};

export default PortalLayout;
