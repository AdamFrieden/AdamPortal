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
import { motion } from 'framer-motion';

import { ACTION_TYPES, ClientGladiator } from '../domain/models'; // adjust the import path as needed
import useStarclanGameStore from '../context/useStarclanGameStore';
import GladiatorAvatar from './GladiatorAvatar';
import { TypingText } from './TypingText';

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
        backgroundColor: 'rgba(10, 25, 40, 0.75)',
        border: '1px dashed rgba(0, 180, 255, 0.5)',
        boxShadow: '0 0 12px rgba(0, 180, 255, 0.6)',
        borderRadius: '8px',
        overflow: 'hidden',
        borderColor: gladiator.status === 'ENSLAVED' ? 'primary.main' : 'rgba(0, 180, 255, 0.5)',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(0,180,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,180,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '25px 25px',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'repeating-linear-gradient(to bottom, rgba(0,180,255,0.06) 0px, rgba(0,180,255,0.06) 1px, transparent 1px, transparent 4px)',
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 5,
          height: '100%',
          width: '100%',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
        }}
        initial={{ scale: 1, rotate: 0 }}
        animate={{
          scale: [1, 1.01, 1],
          rotate: [0, 0.1, -0.1, 0],
          transition: {
            repeat: Infinity,
            duration: 8,
            ease: 'easeInOut',
          },
        }}
        whileHover={{
          scale: [1, 1.02, 0.99, 1.01],
          rotate: [0, -0.5, 0.5, 0],
          opacity: [1, 0.9, 1],
          filter: ['none', 'brightness(1.15)', 'none'],
          transition: {
            duration: 0.4,
            times: [0, 0.2, 0.4, 0.6],
          },
        }}
        whileTap={{
          scale: [1, 0.97, 1.03, 1],
          rotate: [0, 1, -1, 0],
          opacity: [1, 0.7, 1],
          filter: ['none', 'brightness(1.25)', 'none'],
          transition: {
            duration: 0.3,
            times: [0, 0.2, 0.5, 0.7],
          },
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

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Typography variant="h6" color="success">
              ~{gladiator.estimatedPower}
            </Typography>
          </Box>
        </CardContent>
      </motion.div>
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
