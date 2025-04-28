import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDroppable } from '@dnd-kit/core';

// Define a simple Mission type for now
export interface Mission {
  id: string;
  title: string;
  description: string;
}

interface MissionCardProps {
  mission: Mission;
  children?: React.ReactNode;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef: setSortableNodeRef,
    transform,
    transition,
  } = useSortable({
    id: mission.id,
    data: { type: 'MissionContainer', mission },
  });

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({ id: mission.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '1rem',
    cursor: 'grab',
    opacity: transform ? 0.8 : 1,
    touchAction: 'none',
    border: isOver ? '2px solid green' : '1px solid grey',
    backgroundColor: isOver ? 'rgba(0, 255, 0, 0.1)' : 'inherit',
  };

  return (
    <Card ref={setSortableNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent>
        <Typography variant="h6">{mission.title}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {mission.description}
        </Typography>
        <Box ref={setDroppableNodeRef} sx={{ mt: 1, p: 1, minHeight: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MissionCard; 