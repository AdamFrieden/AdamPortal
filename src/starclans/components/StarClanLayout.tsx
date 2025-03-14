// components/StarClanLayout.tsx
import { Box, Grid } from '@mui/material';
import useStarclanGameStore from '../context/useStarclanGameStore';
import useStarclanUIStore from '../context/useStarclanUIStore';
import StartNewClan from './StartNewClan';
import DebugPanel from './DebugPanel';
import { GladiatorGrid } from './GladiatorGrid';
import TopTabBar from './TopTabBar';
import { useState } from 'react';
import { GladiatorCardSkeleton } from './GladiatorSkeletonCard';
import { RecruitGladiatorsDialog } from './RecruitGladiatorDialogue';
import { ContentFactory } from '../domain/contentFactory';
import GameStateHeartbeat from './GameStateHeartbeat';

const StarClanLayout = () => {
  const gameSaveStatus = useStarclanGameStore((state) => state.gameSaveStatus);
  const apiProcessing = useStarclanUIStore((state) => state.isApiProcessing);
  const hasGameState = useStarclanGameStore((state) => !!state.gameState);
  const roster = useStarclanGameStore((state) => state.gameState?.roster);
  const rosterCapacity = useStarclanGameStore((state) => state.gameState?.rosterCapacity) || 0;
  const availableSlots = Math.max(0, rosterCapacity - (roster?.length || 0));
  const waiverWire = useStarclanGameStore((state) => state.gameState?.waiverWire) || [];

  const contentFactory = new ContentFactory()
  const exampleSlaverGladiators = contentFactory.getRandomGladiators(3);
  exampleSlaverGladiators.forEach((g) => {g.status = 'ENSLAVED'})

  const [dialogOpen, setDialogOpen] = useState(false);

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
                <TopTabBar />
                <Grid container spacing={2} sx={{ p: 2, justifyContent: 'center' }}>
                  {[...Array(rosterCapacity)].map(() => (
                    <GladiatorCardSkeleton />
                  ))}
                </Grid>
              </Box>
            )}
            {hasGameState && 
              <Box id='dashContextBox' width='100%'>
                <TopTabBar />
                <DebugPanel />
                {roster && <GladiatorGrid gladiators={roster} emptySlots={availableSlots} onAdd={() => { setDialogOpen(!dialogOpen)}} />}
                <RecruitGladiatorsDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                  gladiators={waiverWire} 
                  onRecruit={()=> setDialogOpen(false)} />
              </Box>
            }
        </Box>
      </Box>
    </Box>
  );
};

export default StarClanLayout;