import React from 'react';
import { 
  Box, 
  Typography, 
  Chip,
  Divider
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WarningIcon from '@mui/icons-material/Warning';
import DiamondIcon from '@mui/icons-material/Diamond';
import GroupsIcon from '@mui/icons-material/Groups';

import { ScanResult } from '../../domain/models';

interface EventBannerProps {
  event: ScanResult;
  requiredSlots: number;
}

const EventBanner: React.FC<EventBannerProps> = ({ event, requiredSlots }) => {
  // Get icon for event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <EmojiEventsIcon color="primary" />;
      case 'threat':
        return <WarningIcon color="error" />;
      case 'resource':
        return <DiamondIcon color="success" />;
      default:
        return <EmojiEventsIcon />;
    }
  };

  // Get color based on event type
  const getEventColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'primary';
      case 'threat':
        return 'error';
      case 'resource':
        return 'success';
      default:
        return 'primary';
    }
  };
  
  return (
    <Box sx={{ p: 2, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
      {/* Event Type and Title */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        {getEventIcon(event.type)}
        <Typography variant="h6" color={`${getEventColor(event.type)}.main`}>
          {event.type.charAt(0).toUpperCase() + event.type.slice(1)} Assignment
        </Typography>
      </Box>
      
      {/* Event Description */}
      <Typography variant="body1" mb={2}>
        {event.description}
      </Typography>
      
      {/* Event Details */}
      <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
        <Chip 
          icon={<GroupsIcon />} 
          label={`${requiredSlots} ${requiredSlots === 1 ? 'Gladiator' : 'Gladiators'} Required`} 
          variant="outlined" 
          size="small"
        />
        
        {event.reward && (
          <Chip 
            icon={<DiamondIcon />} 
            label={`Reward: ${event.reward}`} 
            color="success" 
            variant="outlined"
            size="small"
          />
        )}
      </Box>
    </Box>
  );
};

export default EventBanner; 