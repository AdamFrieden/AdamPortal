import { useMemo } from 'react';
import { TravelData, Trip } from '../../TravelData';

export function useTripData() {
  // Get all trips from the data
  const trips = useMemo(() => TravelData, []);
  
  // Create a Set of visited country names
  const visitedCountries = useMemo(() => 
    new Set(trips.map(trip => trip.country)), 
    [trips]
  );
  
  return {
    trips,
    visitedCountries
  };
} 