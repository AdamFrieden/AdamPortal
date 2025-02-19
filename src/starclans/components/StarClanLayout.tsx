// components/StarClanLayout.tsx
import { AppBar, Box, Divider, LinearProgress, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import useStarclanStore from '../context/useStarclanStore';
import ToolbarMenu from './ToolbarMenu';

const StarClanLayout = () => {

  // const isSmallScreen = useMediaQuery('(max-width:600px)');

  const isApiActive = useStarclanStore((state) => state.isApiProcessing);
  const gameState = useStarclanStore((state) => state.gameState);
  const gameSaveStatus = useStarclanStore((state) => state.gameSaveStatus);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box sx={{ width: '100vw', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Typography variant="h5" sx={{ flexGrow: 0 }}>
              StarClans
            </Typography>
          { gameSaveStatus === 'SAVE_LOADED' &&
            <Box sx={{ flexGrow: 3, mx: 2, display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center', justifyContent: 'space-around' }}>
              {true && <Divider orientation="vertical" flexItem />}
              <Typography>{gameState?.clanName}</Typography>
              <Divider orientation="vertical" flexItem />
              {/* <Typography>Deep Space</Typography>
              <Divider orientation="vertical" flexItem /> */}
              <Typography>${gameState?.resourcium.toFixed(0)}</Typography>
            </Box>  
          }
            <ToolbarMenu />
          </Box>
        </Toolbar>
        {isApiActive && 
        <Box sx={{ width: '100%' }}>
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
