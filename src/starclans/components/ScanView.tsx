import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  CircularProgress, 
  Card, 
  CardContent, 
  Divider, 
  List, 
  ListItem, 
  ListItemText,
  LinearProgress,
  Alert,
  Paper,
  Grid,
  Dialog,
  DialogContent,
  useMediaQuery,
  Theme
} from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar';
import WarningIcon from '@mui/icons-material/Warning';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DiamondIcon from '@mui/icons-material/Diamond';

import useStarclanGameStore from '../context/useStarclanGameStore';
import useStarclanUIStore from '../context/useStarclanUIStore';
import { ACTION_TYPES, ScanResult } from '../domain/models';
import RosterPanel from './roster/RosterPanel';

// Constants
const EVENT_SLOTS = {
  opportunity: 2,
  threat: 3,
  resource: 1
};

// Stable selectors
const selectGameState = (state: ReturnType<typeof useStarclanGameStore.getState>) => state.gameState;
const selectIsApiProcessing = (state: ReturnType<typeof useStarclanUIStore.getState>) => state.isApiProcessing;
const selectAttemptPlayerAction = (state: ReturnType<typeof useStarclanGameStore.getState>) => state.attemptPlayerAction;

const ScanView = () => {
  // Use stable selectors
  const gameState = useStarclanGameStore(selectGameState);
  const attemptPlayerAction = useStarclanGameStore(selectAttemptPlayerAction);
  const isApiProcessing = useStarclanUIStore(selectIsApiProcessing);
  
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<ScanResult | null>(null);
  
  // Memoize the media query result
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'), {
    noSsr: true,
    defaultMatches: false
  });

  // Memoize the debug time offset
  const debugTimeOffset = useMemo(() => gameState?.debugTimeOffset || 0, [gameState?.debugTimeOffset]);

  // Calculate and update time remaining for in-progress scan
  useEffect(() => {
    if (!gameState?.activeScan || gameState.activeScan.status !== 'IN_PROGRESS') {
      setTimeRemaining(null);
      setProgress(0);
      return;
    }

    const startTime = gameState.activeScan.startTime;
    const endTime = startTime + gameState.activeScan.durationMs;
    const totalDuration = gameState.activeScan.durationMs;

    const updateTimer = () => {
      // Apply the debug time offset when calculating time
      const effectiveNow = Date.now() + debugTimeOffset;
      const remaining = Math.max(0, endTime - effectiveNow);
      const elapsed = effectiveNow - startTime;
      const progressValue = Math.min(100, (elapsed / totalDuration) * 100);
      
      setTimeRemaining(remaining);
      setProgress(progressValue);

      if (remaining > 0) {
        requestAnimationFrame(updateTimer);
      }
    };

    updateTimer();
  }, [gameState?.activeScan, debugTimeOffset]);

  const handleStartScan = () => {
    attemptPlayerAction({ type: ACTION_TYPES.START_SCAN });
  };

  // Format time remaining in a human-readable format
  const formatTimeRemaining = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  // Get icon for result type
  const getResultIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <EmojiEventsIcon color="primary" />;
      case 'threat':
        return <WarningIcon color="error" />;
      case 'resource':
        return <DiamondIcon color="success" />;
      default:
        return <RadarIcon />;
    }
  };

  // Handle selecting an event with useCallback
  const handleSelectEvent = useCallback((event: ScanResult) => {
    setSelectedEvent(event);
  }, []);

  // Handle roster confirmation with useCallback
  const handleRosterConfirm = useCallback((gladiatorIds: string[]) => {
    if (selectedEvent) {
      attemptPlayerAction({ 
        type: ACTION_TYPES.ASSIGN_GLADIATORS, 
        eventId: selectedEvent.id, 
        gladiatorIds 
      });
      setSelectedEvent(null);
    }
  }, [selectedEvent, attemptPlayerAction]);

  // Handle cancel roster selection
  const handleCancelRosterSelection = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  const renderScanResults = (results: ScanResult[]) => {
    return (
      <Grid container spacing={2}>
        {results.map((result) => (
          <Grid item xs={12} md={6} lg={4} key={result.id}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 3,
                  cursor: 'pointer'
                }
              }}
              onClick={() => handleSelectEvent(result)}
            >
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                {getResultIcon(result.type)}
                <Typography variant="h6" color={
                  result.type === 'threat' ? 'error.main' : 
                  result.type === 'opportunity' ? 'primary.main' : 
                  'success.main'
                }>
                  {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ flex: 1 }}>{result.description}</Typography>
              {result.reward && (
                <Box mt={2} p={1} bgcolor="background.paper" borderRadius={1}>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    Reward: {result.reward}
                  </Typography>
                </Box>
              )}
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button 
                  variant="contained" 
                  size="small"
                  disabled={isApiProcessing}
                >
                  Assign Gladiators
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };

  const renderScanStatus = () => {
    // No active scan
    if (!gameState?.activeScan) {
      return (
        <Box sx={{ textAlign: 'center', my: 6 }}>
          <RadarIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" mb={2}>
            Stellar Scanner Ready
          </Typography>
          <Typography variant="body1" mb={4} color="text.secondary">
            Scan the stellar region to discover opportunities, threats, and resources.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleStartScan}
            disabled={isApiProcessing || !gameState}
            startIcon={<RadarIcon />}
          >
            Start Stellar Scan
          </Button>
        </Box>
      );
    }

    // Scan in progress
    if (gameState.activeScan.status === 'IN_PROGRESS') {
      return (
        <Box sx={{ textAlign: 'center', my: 6 }}>
          <CircularProgress 
            size={80} 
            thickness={4} 
            variant="determinate" 
            value={progress} 
            sx={{ mb: 3 }}
          />
          <Typography variant="h6" gutterBottom>
            Scan in Progress
          </Typography>
          {timeRemaining !== null && (
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Time remaining: {formatTimeRemaining(timeRemaining)}
            </Typography>
          )}
          <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 8, borderRadius: 1 }} 
            />
          </Box>
          <Alert severity="info" sx={{ mt: 4, maxWidth: 600, mx: 'auto' }}>
            Your scanners are searching the stellar region. Check back later to see what they find.
          </Alert>
        </Box>
      );
    }

    // Scan completed with results
    if (gameState.activeScan.status === 'COMPLETED' && gameState.activeScan.results) {
      return (
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <RadarIcon sx={{ mr: 1, color: 'success.main' }} />
            <Typography variant="h5">Scan Results</Typography>
          </Box>
          {renderScanResults(gameState.activeScan.results)}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button 
              variant="contained" 
              onClick={handleStartScan}
              disabled={isApiProcessing}
              startIcon={<RadarIcon />}
            >
              Start New Scan
            </Button>
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Stellar Scanner</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Use the scanner to detect opportunities and threats in the surrounding space.
      </Typography>
      <Divider sx={{ mb: 4 }} />
      
      {/* Main scan interface */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          {renderScanStatus()}
        </CardContent>
      </Card>
      
      {/* Scan History */}
      {gameState?.scanHistory && gameState.scanHistory.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>Scan History</Typography>
          <List>
            {gameState.scanHistory.map((scan) => (
              <ListItem 
                key={scan.id} 
                divider 
                sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}
              >
                <Box sx={{ width: '100%' }}>
                  <ListItemText
                    primary={`Scan completed on ${new Date(scan.startTime + scan.durationMs).toLocaleString()}`}
                    secondary={scan.results ? `Found ${scan.results.length} result(s)` : 'No results'}
                  />
                  {scan.results && scan.results.length > 0 && (
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      {scan.results.map(result => getResultIcon(result.type))}
                    </Box>
                  )}
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Roster Assignment Dialog */}
      {selectedEvent && (
        <Dialog 
          open={true} 
          onClose={handleCancelRosterSelection}
          maxWidth="lg"
          fullWidth
          fullScreen={isMobile}
        >
          <DialogContent sx={{ p: 0 }}>
            <RosterPanel 
              key={selectedEvent.id}
              event={selectedEvent} 
              requiredSlots={EVENT_SLOTS[selectedEvent.type as keyof typeof EVENT_SLOTS] || 2}
              onRosterConfirm={handleRosterConfirm}
              onCancel={handleCancelRosterSelection}
            />
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default ScanView; 