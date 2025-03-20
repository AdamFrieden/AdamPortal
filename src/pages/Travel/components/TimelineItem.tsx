import React from 'react';
import {
  TimelineItem as MUITimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { Typography } from '@mui/material';
import { Trip } from '../../TravelData';

interface TimelineItemProps {
  trip: Trip;
  isActive: boolean;
  onClick: () => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ trip, isActive, onClick }) => {
  return (
    <MUITimelineItem
      id={`timeline-${trip.id}`}
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        backgroundColor: isActive ? 'rgba(113, 168, 209, 0.2)' : 'inherit',
        borderRadius: 1,
        my: 1,
        '&:hover': { backgroundColor: 'rgba(200,200,200,0.2)' },
      }}
    >
      <TimelineOppositeContent sx={{ flex: 0.3, m: 'auto 0' }} color="primary">
        {trip.date}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="secondary" />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent sx={{ py: '10px', px: 2 }}>
        <Typography variant="h6" component="span">
          {trip.destination}
        </Typography>
        <Typography>{trip.description}</Typography>
      </TimelineContent>
    </MUITimelineItem>
  );
};

export default TimelineItem; 