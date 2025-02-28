import React from 'react';
import Grid from '@mui/material/Grid2';
import { GladiatorCard } from './GladiatorCard';
import { ClientGladiator } from '../domain/models';
import { EmptySlotCard } from './EmptySlotCard';

interface GladiatorGridProps {
  gladiators: ClientGladiator[];
  onAdd: () => void;
}

export const GladiatorGrid: React.FC<GladiatorGridProps> = ({ gladiators, onAdd }) => {
  return (
    <Grid container spacing={2} sx={{ p: 2, justifyContent: 'center' }}>
      {gladiators.map((glad) => (
        <GladiatorCard key={glad.name} gladiator={glad} />
      ))}
      <EmptySlotCard onAdd={onAdd} />
      <EmptySlotCard onAdd={onAdd} />
    </Grid>
  );
};
