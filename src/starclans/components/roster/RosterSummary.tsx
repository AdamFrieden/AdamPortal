import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress
} from '@mui/material';

interface RosterSummaryProps {
  selectedCount: number;
  requiredSlots: number;
}

const RosterSummary: React.FC<RosterSummaryProps> = ({ 
  selectedCount, 
  requiredSlots 
}) => {
  // Calculate selection progress as a percentage
  const progressPercentage = (selectedCount / requiredSlots) * 100;
  
  // Determine progress color based on selection status
  const getProgressColor = () => {
    if (selectedCount === requiredSlots) return 'success';
    if (selectedCount > 0) return 'primary';
    return 'warning';
  };
  
  return (
    <Box sx={{ px: 2, py: 1.5, bgcolor: 'rgba(0,0,0,0.04)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          Gladiator Selection
        </Typography>
        <Typography variant="body2" fontWeight="medium">
          {selectedCount} / {requiredSlots} Selected
        </Typography>
      </Box>
      
      <LinearProgress 
        variant="determinate" 
        value={progressPercentage} 
        color={getProgressColor()}
        sx={{ height: 8, borderRadius: 4 }}
      />
    </Box>
  );
};

export default RosterSummary; 