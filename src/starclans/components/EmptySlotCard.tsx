import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface EmptySlotCardProps {
  onAdd: () => void;
}

export const EmptySlotCard: React.FC<EmptySlotCardProps> = ({ onAdd }) => {
  return (
    // <Card sx={{ width: '20rem', height: '26.67rem', p: 1 }}>
    <Card variant='outlined' sx={{ width: 300, height: 400, p: 1 }}>
      {/* <CardActionArea onClick={onAdd} sx={{ width: '100%', height: '100%' }}> */}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            color: 'text.secondary',
          }}
        >
          <IconButton onClick={onAdd} color="primary" size="large">
            <AddIcon sx={{ fontSize: 48 }} />
          </IconButton>
          <Typography variant="h6" sx={{ mt: 1 }}>
            Add Gladiator
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
};
