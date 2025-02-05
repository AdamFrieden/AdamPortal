// TravelPage.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import { Map as LeafletMap, LatLngExpression, Marker as LeafletMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { TravelData, Trip } from './TravelData';

const trips: Trip[] = TravelData;

// Create a Set of visited country names
const visitedCountries = new Set(trips.map(trip => trip.country));

const Travel: React.FC = () => {
  const [activeTripId, setActiveTripId] = useState<number | null>(null);
  // Use a ref to store the map instance
  const mapRef = useRef<LeafletMap | null>(null);
  // Ref to hold marker references, keyed by trip id
  const markerRefs = useRef<Record<number, LeafletMarker | null>>({});

  // State to hold the GeoJSON data for countries
  const [countriesGeoJson, setCountriesGeoJson] = useState<any>(null);

  // Fetch GeoJSON data for world countries on mount
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((res) => res.json())
      .then((data) => setCountriesGeoJson(data))
      .catch((err) => console.error('Error fetching countries GeoJSON', err));
  }, []);

  // Handler for when a marker is clicked: highlight the timeline entry.
  const handleMarkerClick = (tripId: number) => {
    setActiveTripId(tripId);
    const timelineElement = document.getElementById(`timeline-${tripId}`);
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handler for when a timeline entry is clicked: zoom in, center the map on the location, and open the marker popup.
  const handleTimelineClick = (trip: Trip) => {
    setActiveTripId(trip.id);
    if (mapRef.current) {

      const offsetLat = 3;
      // Cast to a number tuple
      const [lat, lng] = trip.position as [number, number];
      const newCenter: LatLngExpression = [lat + offsetLat, lng];

      // Fly to the trip's position with a higher zoom (e.g., zoom level 8)
      mapRef.current.flyTo(newCenter, 4, { duration: 1.5 });
    }
    const marker = markerRefs.current[trip.id];
    if (marker) {
      marker.openPopup();
    }
  };

  // Reset the map view to its starting location and zoom level
  const handleResetMap = () => {
    if (mapRef.current) {
      mapRef.current.setView(mapCenter, initialZoom);
      const marker = markerRefs.current[activeTripId ?? 0];
      if (marker) {
        marker.closePopup();
      }
    }
  };

  const mapCenter: LatLngExpression = [20, 0];
  const initialZoom = 1;

  // Style function for the GeoJSON layer: highlight visited countries.
  const geoJsonStyle = (feature: any) => {
    // Expecting the country name in feature.properties.ADMIN
    const countryName = feature.properties.ADMIN;
    if (visitedCountriesMemo.has(countryName)) {
      return {
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.15,
        weight: 1,
      };
    } else {
      return {
        color: 'gray',
        fillColor: 'white',
        fillOpacity: 0.1,
        weight: 1,
      };
    }
  };

  // Memoize the visited countries so that it doesn't recalculate on every render
  const visitedCountriesMemo = useMemo(() => visitedCountries, []);

  return (
      <Container sx={{ py: 0, my: 0 }}>
        {/* Map Section */}
        <Paper sx={{ py: 0, my: 0 }}>
        <Box 
          sx={{
            position: 'sticky',
            top: 0,
            height: '35vh', // fixed height
            zIndex: '10',      // ensure it stays on top of other content
            py: 0,
          }}
        >
          <Button variant="contained" color="primary" onClick={handleResetMap}
            sx={{ 
              position: 'absolute', // Absolute position for the button
              top: 16, // Adjust top and right according to your needs
              right: 16,
              zIndex: 1000, // Ensure the button is on top of all map layers
              width: '5vw',
              minWidth: '5vw'
            }}
          >
            X
          </Button>
          <MapContainer
            center={mapCenter}
            zoom={initialZoom}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef as any} // cast if necessary
          >
            {/* GeoJSON layer for country boundaries with visited shading */}
            {countriesGeoJson && (
              <GeoJSON data={countriesGeoJson} style={geoJsonStyle} />
            )}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              keepBuffer={4}
            />
            {trips.map((trip: Trip) => (
              <Marker
                key={trip.id}
                position={trip.position}
                ref={(ref) => {
                  markerRefs.current[trip.id] = ref;
                }}
                eventHandlers={{
                  click: () => {
                    handleMarkerClick(trip.id);
                  },
                }}
              >
              <Popup>
                <Typography variant="subtitle1" sx={{ margin: 0 }}>
                  {trip.destination}
                </Typography>

                {trip.photoUrls.length > 0 && (
                  <Box>
                    {trip.photoUrls.map((url, index) => (
                      // Override default Typography margin here
                      <Typography key={index} variant="body2" sx={{ margin: '0 !important', padding: 0 }}>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          Photos
                        </a>
                      </Typography>
                    ))}
                  </Box>
                )}
              </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
        </Paper>
        {/* Timeline Section */}
        <Box sx={{ overflowY: 'auto', my: 0, maxHeight: '50vh', mt: 2 }}>
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
            }}
            position="right">
            {[...trips].reverse().map((trip) => (
              <TimelineItem
                key={trip.id}
                id={`timeline-${trip.id}`}
                onClick={() => handleTimelineClick(trip)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: activeTripId === trip.id ? 'rgba(113, 168, 209, 0.2)' : 'inherit',
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
              </TimelineItem>
            ))}
          </Timeline>
        </Box>
      </Container>
  );
};

export default Travel;
