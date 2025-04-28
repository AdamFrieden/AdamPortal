import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Define a simple Mission type for now
export interface Mission {
  id: string;
  title: string;
  description: string;
}

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: mission.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '1rem', // Add some spacing between cards
    cursor: 'grab', // Indicate draggable
    opacity: transform ? 0.8 : 1, // Slightly fade during drag
    touchAction: 'none', // Recommended for touch devices with dnd-kit
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent>
        <Typography variant="h6">{mission.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {mission.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MissionCard; 