// components/StarClanLayout.tsx
import { AppBar, Box, LinearProgress, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AccountMenu from './ToolbarMenu';
import useStarclanStore from '../context/useStarclanStore';

const StarClanLayout = () => {

  const isApiActive = useStarclanStore((state) => state.isApiProcessing);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            StarClans
          </Typography>
          <AccountMenu />
        </Toolbar>
        {isApiActive && <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}
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
