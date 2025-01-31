// components/StarClanLayout.tsx
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

const StarClanLayout = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            StarClans
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto' }}>
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto'}}>
            <Toolbar /> {/* spacing to account for the floating toolbar in the header */}
            <Outlet /> {/* Render child routes here */}
        </Box>
      </Box>
    </Box>
  );
};

export default StarClanLayout;
