import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ClientGladiator } from '../domain/models'; // Import Gladiator type

interface GladiatorTileProps {
  gladiator: ClientGladiator;
}

const GladiatorTile: React.FC<GladiatorTileProps> = ({ gladiator }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: gladiator.id }); // Use gladiator id

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: '0.5rem', // Adjust spacing if needed
    cursor: 'grab',
    opacity: transform ? 0.8 : 1,
    touchAction: 'none',
    // Add a fixed height or other styles if needed
    minHeight: '60px', 
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem', 
    backgroundColor: 'rgba(40, 40, 40, 1)', // Match theme if needed
  };

  return (
    <Card ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}> {/* Remove default padding */}
        <Typography variant="subtitle1">{gladiator.name}</Typography>
        {/* We can add more gladiator details later */}
      </CardContent>
    </Card>
  );
};

export default GladiatorTile; 