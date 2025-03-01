import React from 'react';
import Grid from '@mui/material/Grid2';
import { GladiatorCard } from './GladiatorCard';
import { ClientGladiator } from '../domain/models';
import { EmptySlotCard } from './EmptySlotCard';

interface GladiatorGridProps {
  gladiators: ClientGladiator[];
  emptySlots: number;
  onAdd: () => void;
}

export const GladiatorGrid: React.FC<GladiatorGridProps> = ({ gladiators, emptySlots, onAdd }) => {
  return (
    <Grid container spacing={2} sx={{ p: 2, justifyContent: 'center' }}>
      {gladiators.map((glad) => (
        <GladiatorCard key={glad.name} gladiator={glad} />
      ))}
      {[...Array(emptySlots)].map((_, index) => (
        <EmptySlotCard key={index} onAdd={onAdd} />
      ))}
    </Grid>
  );
};
