import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { ClientGladiator } from '../domain/models'; // adjust the import path as needed
import useStarclanStore from '../context/useStarclanStore';

interface GladiatorCardProps {
  gladiator: ClientGladiator;
  onRecruitSelected?: () => void;
}

//  ##MISSING update GladiatorCard to appear in a loading/processing state if the api is processing and dealing with the current gladiator

export const GladiatorCard: React.FC<GladiatorCardProps> = ({ gladiator, onRecruitSelected }) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  const attemptPlayerAction = useStarclanStore((state) => state.attemptPlayerAction);

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
        {/* {gladiator.status === "TRAINING" && (
          <LinearProgress
            color="error"
            sx={{ transform: "scaleX(-1)", height: "0.1rem" }}
          />
        )} */}

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
    <>
    <Card
      sx={{
        width: "17.5rem",
        height: "24.5rem",
        p: 1,
        display: "flex",
        flexDirection: "column",
      }}

      variant={gladiator.status === 'ENSLAVED' ? 'outlined' : undefined}
    >
      <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Box display="flex" alignItems="center">
          <Avatar {...stringAvatar(gladiator.name)} aria-label={gladiator.name} />
          <Typography sx={{ ml: 2 }}>
            {gladiator.name}
          </Typography>
        </Box>
        <IconButton aria-label="settings" onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
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
    <Menu
     anchorEl={anchorEl}
     open={Boolean(anchorEl)}
     onClose={handleMenuClose}
    >
     { gladiator.status !== 'ENSLAVED' && (
      <>
        <MenuItem onClick={() => { attemptPlayerAction({ type: 'TRAIN_GLADIATOR', gladiatorName: gladiator.name  }); handleMenuClose();  }}>Train</MenuItem>
        <MenuItem onClick={() => { attemptPlayerAction({ type: 'REST_GLADIATOR', gladiatorName: gladiator.name  }); handleMenuClose(); }}>Rest</MenuItem>
        <MenuItem onClick={() => { attemptPlayerAction({ type: 'DROP_GLADIATOR', gladiatorName: gladiator.name  }); handleMenuClose(); }}>Drop</MenuItem> 
      </>
    )}
     { gladiator.status === 'ENSLAVED' && 
      <MenuItem onClick={() => { 
        attemptPlayerAction({ type: 'RECRUIT_GLADIATOR', gladiatorName: gladiator.name  }); 
        handleMenuClose();     
        onRecruitSelected?.();
      }}>Recruit</MenuItem> }
   </Menu>
   </>
  );
};
