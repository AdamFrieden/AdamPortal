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

// Define a TypeScript interface for your trip data
interface Trip {
  id: number;
  destination: string;
  date: string;
  position: LatLngExpression;
  description: string;
}

// Sample trip data with 18 trips (10 original + 8 additional)
const trips: Trip[] = [
  { id: 1, destination: 'Paris, France', date: '2023-05-01', position: [48.8566, 2.3522], description: 'Visited the Eiffel Tower and Louvre Museum.' },
  { id: 2, destination: 'Tokyo, Japan', date: '2022-10-15', position: [35.6895, 139.6917], description: 'Explored Shibuya and enjoyed authentic sushi.' },
  { id: 3, destination: 'New York, USA', date: '2021-08-20', position: [40.7128, -74.0060], description: 'Saw a Broadway show and walked through Central Park.' },
  { id: 4, destination: 'London, UK', date: '2020-04-12', position: [51.5074, -0.1278], description: 'Visited the British Museum and Buckingham Palace.' },
  { id: 5, destination: 'Sydney, Australia', date: '2019-12-05', position: [-33.8688, 151.2093], description: 'Saw the Sydney Opera House and Bondi Beach.' },
  { id: 6, destination: 'Rome, Italy', date: '2018-09-18', position: [41.9028, 12.4964], description: 'Explored ancient ruins and tasted amazing Italian cuisine.' },
  { id: 7, destination: 'Cairo, Egypt', date: '2017-07-22', position: [30.0444, 31.2357], description: 'Visited the pyramids and the Egyptian Museum.' },
  { id: 8, destination: 'Rio de Janeiro, Brazil', date: '2016-03-30', position: [-22.9068, -43.1729], description: 'Enjoyed the beaches and the vibrant carnival culture.' },
  { id: 9, destination: 'Moscow, Russia', date: '2015-11-11', position: [55.7558, 37.6173], description: 'Admired the architecture and explored Red Square.' },
  { id: 10, destination: 'Cape Town, South Africa', date: '2014-06-14', position: [-33.9249, 18.4241], description: 'Visited Table Mountain and enjoyed the coastal views.' },
  { id: 11, destination: 'Berlin, Germany', date: '2013-03-20', position: [52.5200, 13.4050], description: 'Explored historical sites and vibrant culture in Berlin.' },
  { id: 12, destination: 'Barcelona, Spain', date: '2012-07-08', position: [41.3851, 2.1734], description: 'Enjoyed Gaudí’s architecture and delicious tapas.' },
  { id: 13, destination: 'Amsterdam, Netherlands', date: '2011-09-15', position: [52.3676, 4.9041], description: 'Cruised along canals and visited world-class museums.' },
  { id: 14, destination: 'Istanbul, Turkey', date: '2010-05-30', position: [41.0082, 28.9784], description: 'Explored the historic bazaars and majestic mosques.' },
  { id: 15, destination: 'San Francisco, USA', date: '2009-11-05', position: [37.7749, -122.4194], description: 'Walked the Golden Gate Bridge and enjoyed diverse neighborhoods.' },
  { id: 16, destination: 'Mumbai, India', date: '2008-08-19', position: [19.0760, 72.8777], description: 'Experienced the vibrant culture and bustling markets.' },
  { id: 17, destination: 'Dubai, UAE', date: '2007-04-25', position: [25.2048, 55.2708], description: 'Marveled at the skyscrapers and luxurious lifestyle.' },
  { id: 18, destination: 'Buenos Aires, Argentina', date: '2006-12-10', position: [-34.6037, -58.3816], description: 'Enjoyed tango, delicious steak, and lively streets.' },
];

// Helper: extract the country name from a destination string (assumes last comma-separated part is the country)
const getCountryFromDestination = (destination: string): string => {
  const parts = destination.split(',');
  return parts[parts.length - 1].trim();
};

// Create a Set of visited country names
const visitedCountries = new Set(trips.map(trip => getCountryFromDestination(trip.destination)));

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
      <Typography variant="h3" gutterBottom>
        My Travels
      </Typography>

      {/* Reset Button */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleResetMap}>
          Reset Map
        </Button>
      </Box>


      {/* Map Section */}
      <Box sx={{ height: '400px', mb: 4 }}>
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
      </Box>

      {/* Timeline Section */}
      <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Trip Timeline
        </Typography>
        <Timeline position="right">
          {trips.map((trip) => (
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
