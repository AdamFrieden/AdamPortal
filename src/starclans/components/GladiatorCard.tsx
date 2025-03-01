import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Box,
  Avatar
} from '@mui/material';

import { ClientGladiator } from '../domain/models'; // adjust the import path as needed

interface GladiatorCardProps {
  gladiator: ClientGladiator;
}

export const GladiatorCard: React.FC<GladiatorCardProps> = ({ gladiator }) => {

  function stringToColor(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
  }
  
  function stringAvatar(name: string) {
    const nameParts = name.split(' ');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${nameParts[0][0]}${nameParts[1][0]}`,
    };
  }

  function renderStaminaSection() {
    return (
        <>
        {/* Status & Stamina */}
        <Typography variant="caption" display="block" gutterBottom>
          {gladiator.status === "RESTING" ? "Resting" : "Training"}
        </Typography>

        {gladiator.status === "RESTING" && (
          <LinearProgress color="primary" sx={{ height: "0.1rem" }} />
        )}
        {gladiator.status === "TRAINING" && (
          <LinearProgress
            color="error"
            sx={{ transform: "scaleX(-1)", height: "0.1rem" }}
          />
        )}

        <LinearProgress
          variant="determinate"
          value={gladiator.stamina}
          sx={{ height: "0.75rem", my: 0 }}
        />

        {gladiator.status === "RESTING" && (
          <LinearProgress color="primary" sx={{ height: "0.1rem" }} />
        )}
        {gladiator.status === "TRAINING" && (
          <LinearProgress
            color="error"
            sx={{ transform: "scaleX(-1)", height: "0.1rem" }}
          />
        )}</>
    );
  }

  return (
    <Card
      sx={{
        width: "17.5rem",
        height: "24.5rem",
        p: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Top: Name & Description */}
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar {...stringAvatar(gladiator.name)} aria-label={gladiator.name} />
          <Typography sx={{ ml: 2 }}>
            {gladiator.name}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {gladiator.description}
        </Typography>
      </CardContent>

      {/* Bottom: Traits, Stamina, Estimated Power */}
      <CardContent sx={{ mt: "auto" }}>
        {/* Traits (Chips) */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 3.5 }}>
          {gladiator.knownTraits.map((trait, idx) => (
            <Chip key={idx} label={trait} size="small" />
          ))}
        </Box>
        
        {gladiator.status !== 'ENSLAVED' && renderStaminaSection()}

        {/* Estimated Power aligned to bottom-right */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Typography variant="h6" color="success">
            ~{gladiator.estimatedPower}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
