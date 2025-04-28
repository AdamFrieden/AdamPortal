import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { ACTION_TYPES, ClientGladiator } from '../domain/models'; // adjust the import path as needed
import useStarclanGameStore from '../context/useStarclanGameStore';
import GladiatorAvatar from './GladiatorAvatar';
import { TypingText } from './TypingText';
import { AnimatedCounter } from './AnimatedCounter';

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

  const attemptPlayerAction = useStarclanGameStore((state) => state.attemptPlayerAction);

  // function stringToColor(namfe: string): string {
  //   let hash = 0;
  //   for (let i = 0; i < name.length; i++) {
  //     hash = name.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   let color = '#';
  //   for (let i = 0; i < 3; i++) {
  //     const value = (hash >> (i * 8)) & 0xff;
  //     color += ('00' + value.toString(16)).slice(-2);
  //   }
  //   return color;
  // }
  
  // function stringAvatar(name: string) {
  //   const nameParts = name.split(' ');
  //   return {
  //     sx: {
  //       bgcolor: stringToColor(name),
  //     },
  //     children: `${nameParts[0][0]}${nameParts[1][0]}`,
  //   };
  // }

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
        p: 0,
        display: "flex",
        flexDirection: "column",
        position: 'relative',
        backgroundColor: 'rgba(20, 20, 20, 1)',
        border: '0px solid',
        boxShadow: '0 0 6px rgba(0, 0, 0, 0.29)',
        borderRadius: '18px',
        overflow: 'hidden',
        borderColor: gladiator.status === 'ENSLAVED' ? 'primary.main' : 'rgba(0, 0, 0, 0.56)',
      }}
    >
        <CardContent sx={{ p: 1, pb: 0 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box display="flex" alignItems="center">
              <GladiatorAvatar
                gladiatorId={gladiator.id}
                stamina={gladiator.status !== 'ENSLAVED' ? gladiator.stamina : undefined}
                size={64}
              />
              <Typography sx={{ ml: 2 }}>
                {gladiator.name}
              </Typography>
              {/* <TypingText 
                key={gladiator.name}
                component={Typography} 
                sx={{ ml: 2 }} 
                text={gladiator.name} 
                speed={75}
              /> */}
            </Box>
            <IconButton aria-label="settings" onClick={handleMenuOpen} sx={{ zIndex: 10 }}>
              <MoreVertIcon />
            </IconButton>
          </Box>
          <TypingText 
            key={gladiator.description}
            component={Typography} 
            variant="body2" 
            color="text.secondary"
            text={gladiator.description}
            speed={25}
          />
        </CardContent>

        <CardContent sx={{ mt: "auto", p: 1, pt: 0 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 3.5 }}>
            {gladiator.knownTraits.map((trait, idx) => (
              <Chip key={idx} label={trait} size="small" />
            ))}
          </Box>
          
          {gladiator.status !== 'ENSLAVED' && renderStaminaSection()}

          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 3 }}>
            <Typography variant="h6" color="success" sx={{ mr: 0.5 }}>
              ~
            </Typography>
            <AnimatedCounter
              component={Typography}
              variant="h6"
              color="success"
              endValue={gladiator.estimatedPower}
              duration={5}
            />
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
        <MenuItem onClick={() => { attemptPlayerAction({ type: ACTION_TYPES.TRAIN_GLADIATOR, gladiatorId: gladiator.id }); handleMenuClose(); }}>Train</MenuItem>
        <MenuItem onClick={() => { attemptPlayerAction({ type: ACTION_TYPES.REST_GLADIATOR, gladiatorId: gladiator.id }); handleMenuClose(); }}>Rest</MenuItem>
        <MenuItem onClick={() => { attemptPlayerAction({ type: ACTION_TYPES.DROP_GLADIATOR, gladiatorId: gladiator.id }); handleMenuClose(); }}>Drop</MenuItem>
      </>
    )}
     { gladiator.status === 'ENSLAVED' && 
      <MenuItem onClick={() => { 
        attemptPlayerAction({ type: ACTION_TYPES.RECRUIT_GLADIATOR, gladiatorId: gladiator.id }); 
        handleMenuClose();     
        onRecruitSelected?.();
      }}>Recruit</MenuItem> }
   </Menu>
   </>
  );
};
