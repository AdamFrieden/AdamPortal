import React, { useState, useEffect } from 'react';
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
  Grid
} from '@mui/material';
import RadarIcon from '@mui/icons-material/Radar';
import WarningIcon from '@mui/icons-material/Warning';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DiamondIcon from '@mui/icons-material/Diamond';

import useStarclanGameStore from '../context/useStarclanGameStore';
import useStarclanUIStore from '../context/useStarclanUIStore';
import { ACTION_TYPES, ScanResult } from '../domain/models';

const ScanView = () => {
  const gameState = useStarclanGameStore((state) => state.gameState);
  const attemptPlayerAction = useStarclanGameStore((state) => state.attemptPlayerAction);
  const isApiProcessing = useStarclanUIStore((state) => state.isApiProcessing);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // Add this line in the component to get the debug offset
  const debugTimeOffset = gameState?.debugTimeOffset || 0;

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
      // Apply the same time offset calculation here
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

  const renderScanResults = (results: ScanResult[]) => {
    return (
      <Grid container spacing={2}>
        {results.map((result) => (
          <Grid item xs={12} key={result.id}>
            <Paper elevation={2} sx={{ p: 2 }}>
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
              <Typography variant="body1">{result.description}</Typography>
              {result.reward && (
                <Box mt={2} p={1} bgcolor="background.paper" borderRadius={1}>
                  <Typography variant="body2" color="success.main" fontWeight="bold">
                    Reward: {result.reward}
                  </Typography>
                </Box>
              )}
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
            Network Scanner Ready
          </Typography>
          <Typography variant="body1" mb={4} color="text.secondary">
            Scan the network to discover opportunities, threats, and resources.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleStartScan}
            disabled={isApiProcessing || !gameState}
            startIcon={<RadarIcon />}
          >
            Start Network Scan
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
            Your scanners are searching the network. Check back later to see what they find.
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
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>Network Scanner</Typography>
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
    </Box>
  );
};

export default ScanView; 