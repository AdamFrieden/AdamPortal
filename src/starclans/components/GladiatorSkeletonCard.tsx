import React from 'react';
import { Card, CardMedia, CardContent, Box, Skeleton } from '@mui/material';

export const GladiatorCardSkeleton: React.FC = () => {
  return (
    <Card sx={{ width: 300, height: 400, p: 1 }}>
      {/* Profile image skeleton */}
      <CardMedia>
        <Skeleton variant="rectangular" width={300} height={150} />
      </CardMedia>
      <CardContent>
        {/* Name skeleton */}
        <Skeleton variant="text" width="60%" height={30} />
        {/* Blurb skeleton */}
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
      </CardContent>
      <CardContent>
        {/* Stamina label */}
        <Skeleton variant="text" width="40%" />
        {/* Stamina bar skeleton */}
        <Skeleton variant="rectangular" width="100%" height={10} />
      </CardContent>
      <CardContent>
        {/* Traits skeleton */}
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      </CardContent>
      <CardContent>
        {/* Estimated power skeleton */}
        <Skeleton variant="text" width="50%" />
      </CardContent>
    </Card>
  );
};
