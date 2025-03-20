import { useRef, useCallback } from 'react';
import { Map as LeafletMap, LatLngExpression, Marker as LeafletMarker } from 'leaflet';
import { Trip } from '../../TravelData';

export function useMapNavigation() {
  // Constants for map settings
  const mapCenter: LatLngExpression = [20, 0];
  const initialZoom = 1;

  // Refs for map and markers
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRefs = useRef<Record<number, LeafletMarker | null>>({});
  
  // Function to focus the map on a specific trip
  const focusMapTrip = useCallback((trip: Trip) => {
    // Fly to the trip's position on the map
    if (mapRef.current) {
      const offsetLat = 3;
      // Cast to a number tuple
      const [lat, lng] = trip.position as [number, number];
      const newCenter: LatLngExpression = [lat + offsetLat, lng];

      // Fly to the trip's position with a higher zoom
      mapRef.current.flyTo(newCenter, 4, { duration: 1.5 });
    }
    
    // Open the marker popup
    const marker = markerRefs.current[trip.id];
    if (marker) {
      marker.openPopup();
    }
  }, []);
  
  // Function to reset the map view
  const resetMap = useCallback((activeTripId: number | null = null) => {
    if (mapRef.current) {
      mapRef.current.setView(mapCenter, initialZoom);
      
      if (activeTripId !== null) {
        const marker = markerRefs.current[activeTripId];
        if (marker) {
          marker.closePopup();
        }
      }
    }
  }, []);
  
  return {
    mapRef,
    markerRefs,
    focusMapTrip,
    resetMap,
    mapCenter,
    initialZoom
  };
} 