// components/StarClanLayout.tsx
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import useStarclanStore from '../context/useStarclanStore';
import StartNewClan from './StartNewClan';
import DebugPanel from './DebugPanel';
import { GladiatorGrid } from './GladiatorGrid';
import TopTabBar from './TopTabBar';
import { useEffect, useRef, useState } from 'react';
import { GladiatorCardSkeleton } from './GladiatorSkeletonCard';
import { RecruitGladiatorsDialog } from './RecruitGladiatorDialogue';
import { ContentFactory } from '../domain/contentFactory';

const StarClanLayout = () => {

  const gameSaveStatus = useStarclanStore((state) => state.gameSaveStatus);
  const apiProcessing = useStarclanStore((state) => state.isApiProcessing);
  const hasGameState = useStarclanStore((state) => !!state.gameState);
  const refreshGameState = useStarclanStore((state) => state.refreshGameState);
  const roster = useStarclanStore((state) => state.gameState?.roster);
  const rosterCapacity = useStarclanStore((state) => state.gameState?.rosterCapacity) || 0;
  const availableSlots = Math.max(0, rosterCapacity - (roster?.length || 0));
  const waiverWire = useStarclanStore((state) => state.gameState?.waiverWire) || [];
  const activeActions = useStarclanStore((state) => state.activeActions);


  const contentFactory = new ContentFactory()
  const exampleSlaverGladiators = contentFactory.getRandomGladiators(3);
  exampleSlaverGladiators.forEach((g) => {g.status = 'ENSLAVED'})

  const [dialogOpen, setDialogOpen] = useState(false);
  const [recruitingSlot, setRecruitingSlot] = useState<number | null>(null);
  
  const handleOpenRecruitDialog = (slotIndex: number) => {
    setRecruitingSlot(slotIndex);
    setDialogOpen(true);
  };

  const handleCloseRecruitDialog = () => {
    setDialogOpen(false);
    // Reset recruiting slot if there's no pending action
    if (!activeActions.some(action => 
      action.actionType === 'RECRUIT_GLADIATOR' && 
      action.isProcessing &&
      action.targetId === `empty-slot-${recruitingSlot}`
    )) {
      setRecruitingSlot(null);
    }
  };

  const handleRecruitComplete = () => {
    handleCloseRecruitDialog();
  };

  // Monitor active actions for failures
  useEffect(() => {
    if (recruitingSlot !== null) {
      const recruitAction = activeActions.find(action => 
        action.actionType === 'RECRUIT_GLADIATOR' && 
        action.targetId === `empty-slot-${recruitingSlot}`
      );

      // If the action has an error or doesn't exist, reset the recruiting state
      if (!recruitAction || (recruitAction && !recruitAction.isProcessing && recruitAction.error)) {
        setRecruitingSlot(null);
      }
    }
  }, [activeActions, recruitingSlot]);

  //  Keep a ref that always mirrors the latest value of apiProcessing.
  const apiProcessingRef = useRef(apiProcessing);
  useEffect(() => {
    apiProcessingRef.current = apiProcessing;
  }, [apiProcessing]);

  
  useEffect(() => {
    // Attempt an immediate refresh if not currently processing.
    if (!apiProcessingRef.current) {
      refreshGameState();
    }

    const timer = setInterval(() => {
      if (!apiProcessingRef.current && hasGameState) {
        refreshGameState();
      }
    }, 5000)
    return () => clearInterval(timer);
  }, [hasGameState]);

  return (
    <Box id='topLayoutBox' sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
                {roster && (
                  <GladiatorGrid 
                    gladiators={roster} 
                    emptySlots={availableSlots} 
                    onAdd={handleOpenRecruitDialog}
                  />
                )}
                <RecruitGladiatorsDialog
                  open={dialogOpen}
                  onClose={handleCloseRecruitDialog}
                  gladiators={waiverWire} 
                  onRecruit={handleRecruitComplete}
                  recruitingSlot={recruitingSlot}
                />
              </Box>
            }
        </Box>
      </Box>
    </Box>
  );
};

export default StarClanLayout;