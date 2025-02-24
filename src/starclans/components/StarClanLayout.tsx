// components/StarClanLayout.tsx
import { Box } from '@mui/material';
import useStarclanStore from '../context/useStarclanStore';
import StartNewClan from './StartNewClan';
import DebugPanel from './DebugPanel';
import { GladiatorGrid } from './GladiatorGrid';
import TopTabBar from './TopTabBar';
import mockupGladiators from "./mockup/TestGladiatorData";
import { useEffect } from 'react';

const StarClanLayout = () => {

  const gameSaveStatus = useStarclanStore((state) => state.gameSaveStatus);
  const apiProcessing = useStarclanStore((state) => state.isApiProcessing);
  const hasGameState = useStarclanStore((state) => !!state.gameState);
  const refreshGameState = useStarclanStore((state) => state.refreshGameState);

  useEffect(() => {
    refreshGameState();
  }, []);

  return (
    <Box id='topLayoutBox' sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto' }}>
        <Box component="main" sx={{ p: 0, maxWidth: '100vw', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {gameSaveStatus === 'NO_SAVE_FOUND' && !apiProcessing && (
              <StartNewClan />
            )}
            {hasGameState && 
              <Box id='dashContextBox' width='100%'>
                <TopTabBar />
                <DebugPanel />
                <GladiatorGrid gladiators={mockupGladiators} />
              </Box>
            }
        </Box>
      </Box>
    </Box>
  );
};

export default StarClanLayout;