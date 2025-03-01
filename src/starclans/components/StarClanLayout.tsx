// components/StarClanLayout.tsx
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useStarclanStore from '../context/useStarclanStore';
import StartNewClan from './StartNewClan';
import DebugPanel from './DebugPanel';
import { GladiatorGrid } from './GladiatorGrid';
import TopTabBar from './TopTabBar';
import { useEffect, useState } from 'react';
import { GladiatorCardSkeleton } from './GladiatorSkeletonCard';
import { RecruitGladiatorsDialog } from './RecruitGladiatorDialogue';
import { ContentFactory } from '../domain/contentFactory';

const StarClanLayout = () => {

  const gameSaveStatus = useStarclanStore((state) => state.gameSaveStatus);
  const apiProcessing = useStarclanStore((state) => state.isApiProcessing);
  const hasGameState = useStarclanStore((state) => !!state.gameState);
  const refreshGameState = useStarclanStore((state) => state.refreshGameState);
  const gladiators = useStarclanStore((state) => state.gameState?.gladiators);

  const contentFactory = new ContentFactory()
  const exampleSlaverGladiators = contentFactory.getRandomGladiators(3);
  exampleSlaverGladiators.forEach((g) => {g.status = 'ENSLAVED'})


  const [dialogOpen, setDialogOpen] = useState(false);
  
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
            {!hasGameState && gameSaveStatus === 'NO_SAVE_FOUND' && apiProcessing && (
              <Box id='dashContextBoxLoading' width='100%'>
                <TopTabBar />
                <Grid container spacing={2} sx={{ p: 2, justifyContent: 'center' }}>
                  <GladiatorCardSkeleton />
                  <GladiatorCardSkeleton />
                  <GladiatorCardSkeleton />
                  <GladiatorCardSkeleton />
                  <GladiatorCardSkeleton />
                </Grid>
              </Box>
            )}
            {hasGameState && 
              <Box id='dashContextBox' width='100%'>
                <TopTabBar />
                <DebugPanel />
                {gladiators && <GladiatorGrid gladiators={gladiators} onAdd={() => { setDialogOpen(!dialogOpen)}} />}
                <RecruitGladiatorsDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                gladiators={exampleSlaverGladiators} onRecruit={()=>{}} />
              </Box>
            }
        </Box>
      </Box>
    </Box>
  );
};

export default StarClanLayout;