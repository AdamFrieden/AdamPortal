import React from 'react';
import { Box } from '@mui/material';
import {
  Timeline,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Trip } from '../../TravelData';
import TimelineItem from './TimelineItem';

interface TripTimelineProps {
  trips: Trip[];
  activeTripId: number | null;
  onTripClick: (trip: Trip) => void;
}

const TripTimeline: React.FC<TripTimelineProps> = ({ 
  trips, 
  activeTripId, 
  onTripClick 
}) => {
  return (
    <Box 
      data-timeline-container
      sx={{ 
        flexGrow: 1, 
        overflow: 'auto',
        my: 0,
        display: 'flex',
        flexDirection: 'column',
        height: 0,
        minHeight: 0,
        maxHeight: 'calc(55vh - 80px)'
      }}
    >
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
          flexGrow: 1
        }}
        position="right"
      >
        {[...trips].reverse().map((trip) => (
          <TimelineItem
            key={trip.id}
            trip={trip}
            isActive={trip.id === activeTripId}
            onClick={() => onTripClick(trip)}
          />
        ))}
      </Timeline>
    </Box>
  );
};

export default TripTimeline; 