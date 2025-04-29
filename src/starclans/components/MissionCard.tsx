import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

// Define a simple Mission type for now
export interface Mission {
  id: string;
  title: string;
  description: string;
}

interface MissionCardProps {
  mission: Mission;
  onClick: (mission: Mission) => void;
  isOverlay?: boolean;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, onClick, isOverlay = false }) => {
  const handleCardClick = () => {
    if (!isOverlay) {
        onClick(mission);
    }
  };

  return (
    <Card sx={{ 
        mb: 1, 
        border: isOverlay ? '2px dashed blue' : undefined, 
        backgroundColor: isOverlay ? 'action.hover' : undefined,
        pointerEvents: isOverlay ? 'none' : 'auto', 
    }}>
      <CardActionArea onClick={handleCardClick} disabled={isOverlay}>
        <CardContent>
          <Typography variant="h6" component="div">
            {mission.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mission.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MissionCard; 