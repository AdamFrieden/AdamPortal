import React from 'react';
import Grid from '@mui/material/Grid2';
import { GladiatorCard } from './GladiatorCard';
import { ClientGladiator } from '../domain/models';
import { EmptySlotCard } from './EmptySlotCard';

interface GladiatorGridProps {
  gladiators: ClientGladiator[];
}


export const GladiatorGrid: React.FC<GladiatorGridProps> = ({ gladiators }) => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {gladiators.map((glad) => (
        <GladiatorCard key={glad.name} gladiator={glad} />
      ))}
      <EmptySlotCard onAdd={function (): void {
        console.log('empty card 1 selected')
      } } />
      <EmptySlotCard onAdd={function (): void {
        console.log('empty card 2 selected')
      } } />
      <EmptySlotCard onAdd={function (): void {
        console.log('empty card 3 selected')
      } } />
    </Grid>
  );
};
