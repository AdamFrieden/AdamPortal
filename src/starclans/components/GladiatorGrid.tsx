import React from 'react';
import Grid from '@mui/material/Grid2';
import { GladiatorCard } from './GladiatorCard';
import { ClientGladiator } from '../domain/models';
import { Box } from '@mui/material';

interface GladiatorGridProps {
  gladiators: ClientGladiator[];
}

export const GladiatorGrid: React.FC<GladiatorGridProps> = ({ gladiators }) => {
  return (
    <Grid container spacing={2} sx={{ p: 2 }}>
      {gladiators.map((glad) => (
        <Grid 
          key={glad.name} 
          xs="auto"
          sx={{ minWidth: '250px' }}
        >
          <GladiatorCard gladiator={glad} />
        </Grid>
      ))}
    </Grid>
  );
  // return (
  //   <Box
  //     sx={{
  //       display: 'grid',
  //       gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  //       gap: 5,
  //       m: 2,
  //     }}
  //   >
  //     {gladiators.map((glad) => (
  //       <GladiatorCard key={glad.name} gladiator={glad} />
  //     ))}
  //   </Box>
  // );
  // return (
  //   <Grid 
  //     container 
  //     spacing={{ xs: 2, md: 3 }} 
  //     columns={{ xs: 4, sm: 8, md: 12 }}
  //     sx={{ p: 2 }}
  //   >
  //     {gladiators.map((glad) => (
  //       <Grid 
  //         key={glad.name} 
  //         size={{ xs: 4, sm: 4, md: 4 }} 
  //       >
  //         <GladiatorCard gladiator={glad} />
  //       </Grid>
  //     ))}
  //   </Grid>
  // );
};
