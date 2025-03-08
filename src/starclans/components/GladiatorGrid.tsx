import React from 'react';
import Grid from '@mui/material/Grid2';
import { GladiatorCard } from './GladiatorCard';
import { ClientGladiator } from '../domain/models';
import { EmptySlotCard } from './EmptySlotCard';

interface GladiatorGridProps {
  gladiators: ClientGladiator[];
  emptySlots: number;
  onAdd: (slotIndex: number) => void;
}

export const GladiatorGrid: React.FC<GladiatorGridProps> = ({ gladiators, emptySlots, onAdd }) => {
  // Track which slot is being recruited for
  const [recruitingSlot, setRecruitingSlot] = React.useState<number | null>(null);

  const handleSlotClick = (slotIndex: number) => {
    setRecruitingSlot(slotIndex);
    onAdd(slotIndex);
  };

  return (
    <Grid container spacing={2} sx={{ p: 2, justifyContent: 'center' }}>
      {gladiators.map((glad) => (
        <GladiatorCard 
          key={glad.name} 
          gladiator={glad} 
          recruitingSlot={recruitingSlot}
        />
      ))}
      {[...Array(emptySlots)].map((_, index) => (
        <EmptySlotCard 
          key={`empty-slot-${index}`} 
          slotIndex={index}
          onAdd={() => handleSlotClick(index)}
          isRecruiting={recruitingSlot === index}
        />
      ))}
    </Grid>
  );
};
