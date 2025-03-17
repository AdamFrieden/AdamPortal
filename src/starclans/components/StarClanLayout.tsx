// components/StarClanLayout.tsx
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useStarclanGameStore from '../context/useStarclanGameStore';
import useStarclanUIStore from '../context/useStarclanUIStore';
import StartNewClan from './StartNewClan';
import DebugPanel from './DebugPanel';
import TopTabBar from './TopTabBar';
import { useState } from 'react';
import { GladiatorCardSkeleton } from './GladiatorSkeletonCard';
import { ContentFactory } from '../domain/contentFactory';
import GameStateHeartbeat from './GameStateHeartbeat';
import TechView from './TechView';
import ScanView from './ScanView';
import ClanView from './ClanView';

const StarClanLayout = () => {
  const gameSaveStatus = useStarclanGameStore((state) => state.gameSaveStatus);
  const apiProcessing = useStarclanUIStore((state) => state.isApiProcessing);
  const hasGameState = useStarclanGameStore((state) => !!state.gameState);
  const rosterCapacity = useStarclanGameStore((state) => state.gameState?.rosterCapacity) || 0;

  const contentFactory = new ContentFactory()
  const exampleSlaverGladiators = contentFactory.getRandomGladiators(3);
  exampleSlaverGladiators.forEach((g) => {g.status = 'ENSLAVED'})

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const renderCurrentView = () => {
    switch (selectedTab) {
      case 0:
        return <ClanView />;
      case 1:
        return <TechView />;
      case 2:
        return <ScanView />;
      default:
        return null;
    }
  };

  return (
    <Box id='topLayoutBox' sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GameStateHeartbeat />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'auto' }}>
        <Box component="main" sx={{ p: 0, maxWidth: '100vw', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {(gameSaveStatus === 'NO_SAVE_FOUND' || !hasGameState) && !apiProcessing && (
              <StartNewClan />
            )}
            {!hasGameState && gameSaveStatus === 'NO_SAVE_FOUND' && apiProcessing && (
              <Box id='dashContextBoxLoading' width='100%'>
                <TopTabBar selectedTab={selectedTab} onTabChange={handleTabChange} />
                <Grid container spacing={2} sx={{ p: 2, justifyContent: 'center' }}>
                  {[...Array(rosterCapacity)].map(() => (
                    <GladiatorCardSkeleton />
                  ))}
                </Grid>
              </Box>
            )}
            {hasGameState && 
              <Box id='dashContextBox' width='100%'>
                <TopTabBar selectedTab={selectedTab} onTabChange={handleTabChange} />
                <DebugPanel />
                {renderCurrentView()}
              </Box>
            }
        </Box>
      </Box>
    </Box>
  );
};

export default StarClanLayout;