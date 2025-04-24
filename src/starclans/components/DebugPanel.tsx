import React from 'react';
import { Box, Typography, Button, Card, CardContent, Stack, Divider, TextField } from '@mui/material';
import useStarclanGameStore from '../context/useStarclanGameStore';
import useStarclanUIStore from '../context/useStarclanUIStore';
import FastForwardIcon from '@mui/icons-material/FastForward';
import ConflictAssignment from './ConflictAssignment';
const DebugPanel = () => {
  const isShowingDebugPanel = useStarclanUIStore((state) => state.isShowingDebugPanel);
  const showDebugPanel = useStarclanUIStore((state) => state.showDebugPanel);
  const showBattleGrid = useStarclanUIStore((state) => state.showBattleGrid);
  const deleteData = useStarclanGameStore((state) => state.deleteData);
  const debugAddTimeOffset = useStarclanGameStore((state) => state.debugAddTimeOffset);
  const debugTimeOffset = useStarclanGameStore((state) => state.gameState?.debugTimeOffset || 0);
  const [customMinutes, setCustomMinutes] = React.useState('5');
  const starDateRaw = useStarclanGameStore((state) => state.gameState?.lastRefresh);

  if (!isShowingDebugPanel) {
    return (<></>);
    // return (
    //   <Box textAlign="right" mb={1}>
    //     <Button size="small" variant="outlined" onClick={() => showDebugPanel(true)}>
    //       Debug
    //     </Button>
    //   </Box>
    // );
  }

  const handleCustomTimeSkip = () => {
    const minutes = parseInt(customMinutes, 10);
    if (!isNaN(minutes) && minutes > 0) {
      debugAddTimeOffset(minutes * 60 * 1000); // Convert minutes to milliseconds
    }
  };

  const handlePresetTimeSkip = (minutes: number) => {
    debugAddTimeOffset(minutes * 60 * 1000); // Convert minutes to milliseconds
  };

  const formatTimeOffset = (ms: number) => {
    if (ms === 0) return "None";
    
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Debug Controls</Typography>
          <Button size="small" onClick={() => showDebugPanel(false)}>
            Hide
          </Button>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Time Skip Controls */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            <FastForwardIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            Skip Time
          </Typography>
          
          <Stack direction="row" spacing={1} mb={2}>
            <Button size="small" variant="outlined" onClick={() => handlePresetTimeSkip(1)}>
              +1 min
            </Button>
            <Button size="small" variant="outlined" onClick={() => handlePresetTimeSkip(5)}>
              +5 min
            </Button>
            <Button size="small" variant="outlined" onClick={() => handlePresetTimeSkip(30)}>
              +30 min
            </Button>
            <Button size="small" variant="outlined" onClick={() => handlePresetTimeSkip(60)}>
              +1 hour
            </Button>
          </Stack>
          
          <Box display="flex" alignItems="center">
            <TextField
              label="Custom (minutes)"
              size="small"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              sx={{ width: 150, mr: 1 }}
            />
            <Button variant="contained" size="small" onClick={handleCustomTimeSkip}>
              Skip Time
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Show Battle Grid Button */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Battle Grid Test
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            onClick={showBattleGrid}
          >
            Show Battle Grid
          </Button>
        </Box>
        
        {/* Conflict Assignment Demo */}
        <Box mb={3}>
          <Typography variant="subtitle1" gutterBottom>
            Conflict Assignment Demo
          </Typography>
          <ConflictAssignment />
        </Box>

        <Divider sx={{ my: 2 }} />
        
        {/* Reset Game Data */}
        <Box>
          <Button 
            variant="contained" 
            color="error"
            size="small"
            onClick={deleteData}
          >
            Reset All Game Data
          </Button>
        </Box>

        <Typography>Current Time: {new Date(starDateRaw ?? 0).toLocaleString()}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Time Skipped: {formatTimeOffset(debugTimeOffset)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DebugPanel;
