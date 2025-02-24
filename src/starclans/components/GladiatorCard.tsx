import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Box
} from '@mui/material';

import { ClientGladiator } from '../domain/models'; // adjust the import path as needed

interface GladiatorCardProps {
  gladiator: ClientGladiator;
}

export const GladiatorCard: React.FC<GladiatorCardProps> = ({ gladiator }) => {
  return (
    <Card sx={{ width: 300, height: 400, p: 1 }}>
      {/* Profile Image */}
      {/* <CardMedia
        component="img"
        // image={gladiator.profileImageUrl}
        alt={gladiator.name}
        sx={{ width: '100%', height: 30, objectFit: 'cover' }}
      /> */}

      <CardContent>
        {/* Gladiator Name */}
        <Typography variant="h6" gutterBottom>
          {gladiator.name}
        </Typography>
        {/* Descriptive Blurb */}
        <Typography variant="body2" color="text.secondary">
          {gladiator.description}
        </Typography>
      </CardContent>

      <CardContent>
        {/* Stamina */}
        <Typography variant="caption" display="block" gutterBottom>
          { gladiator.status === 'RESTING' ? (`Resting`) : (`Training`)}
        </Typography>
        <LinearProgress variant="determinate" value={gladiator.stamina} sx={{ height: '0.75rem' }} />
        { gladiator.status === 'RESTING' && 
        <LinearProgress color='secondary' />
        }
        { gladiator.status === 'TRAINING' && 
        <LinearProgress color='error' sx={{ transform: 'scaleX(-1)' }} />
        }
      </CardContent>

      <CardContent>
        {/* Traits as Chips */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {gladiator.knownTraits.map((trait, idx) => (
            <Chip key={idx} label={trait} size="small" />
          ))}
        </Box>
      </CardContent>

      <CardContent>
        {/* Estimated Power */}
        <Typography variant="body2" color="text.primary">
          Estimated Power: {gladiator.estimatedPower}
        </Typography>
      </CardContent>
    </Card>
  );
};
