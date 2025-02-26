import React from 'react';
import { Card, CardMedia, CardContent, Box, Skeleton } from '@mui/material';

export const GladiatorCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ width: '17.5rem', height: '24.5rem', p: 1 }}>
      {/* Profile image skeleton */}
      <CardMedia>
        <Skeleton variant="rectangular" width={'16.5rem'} height={150} />
      </CardMedia>
      <CardContent>
        {/* Blurb skeleton */}
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
      </CardContent>
      <CardContent>
        {/* Stamina label */}
        <Skeleton variant="text" width="40%" />
        {/* Stamina bar skeleton */}
        <Skeleton variant="rectangular" width="100%" height={20} />
      </CardContent>
      <CardContent>
        {/* Traits skeleton */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      </CardContent>
    </Card>
  );
};
