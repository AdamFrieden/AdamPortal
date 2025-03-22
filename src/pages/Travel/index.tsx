import React, { useState, useCallback } from 'react';
import { Container, Box } from '@mui/material';
import { Trip } from '../TravelData';
import { useMapNavigation } from './hooks/useMapNavigation';
import { useSearchFeature } from './hooks/useSearchFeature';
import { useTripData } from './hooks/useTripData';
import SearchPanel from './components/SearchPanel';
import MapSection from './components/MapSection';
import TripTimeline from './components/TripTimeline';
import { useTimelineNavigation } from './hooks/useTimelineNavigation';

const Travel: React.FC = () => {
  // Get trip data
  const { trips, visitedCountries } = useTripData();
  
  // State for active trip
  const [activeTripId, setActiveTripId] = useState<number | null>(null);
  
  // Map navigation functionality
  const { 
    mapRef, 
    markerRefs, 
    focusMapTrip, 
    resetMap,
    mapCenter,
    initialZoom
  } = useMapNavigation();
  
  // Search functionality
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredTrips, 
    showSearchResults,
    isSearchVisible,
    toggleSearchVisibility,
    clearSearch 
  } = useSearchFeature(trips);
  
  // Timeline navigation functionality
  const { focusTimelineTrip } = useTimelineNavigation();
  
  // Handler for timeline item clicks
  const handleTripClick = useCallback((trip: Trip) => {
    setActiveTripId(trip.id);
    focusMapTrip(trip);
  }, [focusMapTrip]);
  
  // Handler for marker clicks
  const handleMarkerClick = useCallback((tripId: number) => {
    setActiveTripId(tripId);
    focusTimelineTrip(tripId);
  }, [focusTimelineTrip]);
  
  // Handler for search result clicks
  const handleSearchResultClick = useCallback((trip: Trip) => {
    handleTripClick(trip);
    focusTimelineTrip(trip.id);
    clearSearch();
  }, [handleTripClick, clearSearch]);
  
  // Handler for resetting the map
  const handleResetMap = useCallback(() => {
    resetMap(activeTripId);
  }, [resetMap, activeTripId]);
  
  return (
    <Container sx={{ 
      py: 0, 
      my: 0, 
      height: 'calc(100vh - 80px)', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        flexGrow: 1,
        height: '100%'  // Ensure this takes full height 
      }}>
        <SearchPanel 
          isVisible={isSearchVisible}
          trips={trips}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredTrips={filteredTrips}
          showSearchResults={showSearchResults}
          onResultClick={handleSearchResultClick}
        />
        
        <MapSection 
          trips={trips}
          activeTripId={activeTripId}
          visitedCountries={visitedCountries}
          mapRef={mapRef}
          markerRefs={markerRefs}
          mapCenter={mapCenter}
          initialZoom={initialZoom}
          onMarkerClick={handleMarkerClick}
          onResetMap={handleResetMap}
          onToggleSearch={toggleSearchVisibility}
          isSearchVisible={isSearchVisible}
        />
        
        <TripTimeline 
          trips={trips}
          activeTripId={activeTripId}
          onTripClick={handleTripClick}
        />
      </Box>
    </Container>
  );
};

export default Travel; 