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
        <Typography variant="h6" gutterBottom>
          {gladiator.name}
        </Typography>
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
        )}

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
