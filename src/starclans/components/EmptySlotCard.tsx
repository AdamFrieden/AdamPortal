import React from 'react';
import { Card, CardContent, Typography, IconButton, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface EmptySlotCardProps {
  onAdd: () => void;
  slotIndex: number;
}

export const EmptySlotCard: React.FC<EmptySlotCardProps> = ({ onAdd, slotIndex }) => {
  return (
    <Card variant='outlined' sx={{ width: '17.5rem', height: '24.5rem', p: 1 }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          color: 'text.secondary',
          position: 'relative'
        }}
      >
        <CircularProgress 
          size={40} 
          sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -2.5,
            marginLeft: -2.5
          }} 
        />
        <IconButton 
          onClick={onAdd} 
          color="primary" 
          size="large"
        >
          <AddIcon sx={{ fontSize: 48 }} />
        </IconButton>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Add Gladiator
        </Typography>
      </CardContent>
    </Card>
  );
};
