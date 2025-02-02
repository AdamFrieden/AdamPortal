// TravelPage.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
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
      // Fly to the trip's position with a higher zoom (e.g., zoom level 8)
      mapRef.current.flyTo(trip.position, 8, { duration: 1.5 });
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
    }
  };

  const mapCenter: LatLngExpression = [20, 0];
  const initialZoom = 2;

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
    <Container maxWidth="lg" sx={{ my: 4 }}>
      {/* <Typography variant="h3" gutterBottom>
        My Travels
      </Typography> */}

      {/* Reset Button */}



      {/* Map Section */}
      <Box 
        sx={{
          position: 'sticky',
          top: 0,
          height: '40vh', // fixed height
          zIndex: 'auto',      // ensure it stays on top of other content
          py: 2,
        }}
      >
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
          {trips.map((trip) => (
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
                <Typography variant="subtitle1">{trip.destination}</Typography>
                <Typography variant="body2">{trip.date}</Typography>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" onClick={handleResetMap}>
            Reset
          </Button>
        </Box>
      </Box>
      {/* Timeline Section */}
      <Box sx={{ maxHeight: '40vh', overflowY: 'auto', my: 5 }}>
        {/* <Typography variant="h4" gutterBottom>
          Trip Timeline
        </Typography> */}
        <Timeline position="right">
          {[...trips].reverse().map((trip) => (
            <TimelineItem
              key={trip.id}
              id={`timeline-${trip.id}`}
              onClick={() => handleTimelineClick(trip)}
              sx={{
                cursor: 'pointer',
                backgroundColor: activeTripId === trip.id ? 'rgba(255, 255, 0, 0.2)' : 'inherit',
                borderRadius: 1,
                my: 1,
                '&:hover': { backgroundColor: 'rgba(200,200,200,0.2)' },
              }}
            >
              {/* Dates always appear on the left side */}
              <TimelineOppositeContent sx={{ flex: 0.3, m: 'auto 0' }} color="text.secondary">
                {trip.date}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
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
