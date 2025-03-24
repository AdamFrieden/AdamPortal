import React from 'react';
import { 
  Box, 
  Typography, 
  LinearProgress, 
  IconButton,
  Tooltip,
  Chip,
  Paper
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ClientGladiator } from '../../domain/models';

interface GladiatorRosterCardProps {
  gladiator: ClientGladiator;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
  showAddButton?: boolean;
  showRemoveButton?: boolean;
}

const GladiatorRosterCard: React.FC<GladiatorRosterCardProps> = ({
  gladiator,
  isSelected,
  onToggle,
  disabled = false,
  showAddButton = false,
  showRemoveButton = false
}) => {
  // Determine stamina color based on level
  const getStaminaColor = (staminaValue: number) => {
    if (staminaValue > 70) return 'success';
    if (staminaValue > 40) return 'warning';
    return 'error';
  };
  
  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        p: 1.5,
        m: 1,
        borderRadius: 1,
        borderColor: isSelected ? 'secondary.main' : 'divider',
        bgcolor: isSelected ? 'rgba(156, 39, 176, 0.08)' : 'background.paper',
        '&:hover': {
          borderColor: isSelected ? 'secondary.light' : 'primary.main',
          boxShadow: 1
        },
        alignItems: 'center',
        transition: 'all 0.2s'
      }}
    >
      {/* Gladiator Basic Info */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="subtitle1">{gladiator.name}</Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, flexWrap: 'wrap', gap: 0.5 }}>
          <Tooltip title="Estimated Power">
            <Chip 
              label={`~${gladiator.estimatedPower}`} 
              size="small" 
              color="primary"
            />
          </Tooltip>
          
          {/* Stamina Chip */}
          <Tooltip title="Stamina Level">
            <Chip 
              label={`${gladiator.stamina}%`} 
              size="small"
              color={getStaminaColor(gladiator.stamina)}
            />
          </Tooltip>
        </Box>
        
        {/* Stamina Bar */}
        <Box sx={{ mt: 1 }}>
          <LinearProgress
            variant="determinate"
            value={gladiator.stamina}
            color={getStaminaColor(gladiator.stamina)}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
        
        {/* Known Traits */}
        {gladiator.knownTraits && gladiator.knownTraits.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {gladiator.knownTraits.map(trait => (
              <Chip
                key={trait}
                label={trait}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.7rem' }}
              />
            ))}
          </Box>
        )}
      </Box>
      
      {/* Selection Controls */}
      <Box>
        {showAddButton && (
          <IconButton 
            color="primary" 
            onClick={onToggle}
            disabled={disabled}
            size="medium"
          >
            <AddCircleIcon fontSize="medium" />
          </IconButton>
        )}
        
        {showRemoveButton && (
          <IconButton 
            color="error" 
            onClick={onToggle}
            size="medium"
          >
            <RemoveCircleIcon fontSize="medium" />
          </IconButton>
        )}
      </Box>
    </Paper>
  );
};

export default GladiatorRosterCard; 