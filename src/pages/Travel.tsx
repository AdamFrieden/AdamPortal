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

// Updated trips array (28 total trips)
const trips: Trip[] = [
  {
    id: 1,
    destination: 'Auckland, New Zealand',
    date: '2015-03-19',
    position: [-36.8485, 174.7633],
    description: 'First trip to New Zealand, enjoyed scenic beaches and city life.',
  },
  {
    id: 2,
    destination: 'Amsterdam, The Netherlands',
    date: '2015-08-29',
    position: [52.3676, 4.9041],
    description: 'Explored the canals, museums, and vibrant city atmosphere.',
  },
  {
    id: 3,
    destination: 'Brussels, Belgium',
    date: '2015-09-01',
    position: [50.8503, 4.3517],
    description: 'Enjoyed Belgian waffles, chocolate, and the famous Grand Place.',
  },
  {
    id: 4,
    destination: 'Paris, France',
    // Approximating 2015-09-04 for the window Sept 2–6
    date: '2015-09-04',
    position: [48.8566, 2.3522],
    description: 'Visited the Eiffel Tower, the Louvre, and charming cafés.',
  },
  {
    id: 5,
    destination: 'Punta Cana, Dominican Republic',
    date: '2016-03-20',
    position: [18.5601, -68.3725],
    description: 'Relaxed on pristine beaches and enjoyed tropical weather.',
  },
  {
    id: 6,
    destination: 'Reykjavik, Iceland',
    date: '2016-12-17',
    position: [64.1466, -21.9426],
    description: 'Chased the Northern Lights during the winter solstice.',
  },
  {
    id: 7,
    destination: 'Dublin, Ireland',
    date: '2017-11-04',
    position: [53.3498, -6.2603],
    description: 'Toured historic pubs and soaked in the city’s literary heritage.',
  },
  {
    id: 8,
    destination: 'Cape Town, South Africa',
    date: '2018-02-18',
    position: [-33.9249, 18.4241],
    description: 'Saw Table Mountain, the Cape Peninsula, and local vineyards.',
  },
  {
    id: 9,
    destination: 'Mbabane, Swaziland',
    // Now eSwatini, but retaining "Swaziland" in the destination for clarity
    date: '2018-02-23',
    position: [-26.3055, 31.1367],
    description: 'Visited the mountainous capital of eSwatini (formerly Swaziland).',
  },
  {
    id: 10,
    destination: 'Johannesburg, South Africa',
    date: '2018-02-26',
    position: [-26.2041, 28.0473],
    description: 'Explored the largest city in South Africa and cultural hubs.',
  },
  {
    id: 11,
    destination: 'Nea Moudania, Greece',
    date: '2018-06-18',
    position: [40.2443, 23.2830],
    description: 'Enjoyed the beaches and fresh seafood on the Chalkidiki peninsula.',
  },
  {
    id: 12,
    destination: 'Madrid, Spain',
    date: '2019-08-30',
    position: [40.4168, -3.7038],
    description: 'Experienced the capital’s art museums, parks, and tapas scene.',
  },
  {
    id: 13,
    destination: 'Barcelona, Spain',
    date: '2019-09-03',
    position: [41.3851, 2.1734],
    description: 'Admired Gaudí’s architecture and enjoyed the lively Catalan culture.',
  },
  {
    id: 14,
    destination: 'Noord, Aruba',
    date: '2021-09-07',
    position: [12.5643, -70.0270],
    description: 'Relaxed in the Caribbean sunshine and explored local beaches.',
  },
  {
    id: 15,
    destination: 'Playa del Carmen, Mexico',
    date: '2022-08-23',
    position: [20.6274, -87.0799],
    description: 'Enjoyed the vibrant nightlife and nearby Mayan ruins.',
  },
  {
    id: 16,
    destination: 'Bangkok, Thailand',
    date: '2022-11-26',
    position: [13.7563, 100.5018],
    description: 'Explored bustling markets and iconic temples.',
  },
  {
    id: 17,
    destination: 'Chiang Mai, Thailand',
    date: '2022-11-29',
    position: [18.7061, 98.9817],
    description: 'Visited lush mountains and historic temples in northern Thailand.',
  },
  {
    id: 18,
    destination: 'Koh Phi Phi, Thailand',
    date: '2022-12-03',
    position: [7.7396, 98.7784],
    description: 'Enjoyed crystal-clear waters and island nightlife.',
  },
  {
    id: 19,
    destination: 'Railay Beach, Thailand',
    date: '2022-12-06',
    position: [8.0071, 98.8388],
    description: 'Rock climbing paradise with stunning limestone cliffs.',
  },
  {
    id: 20,
    destination: 'Playa Junquillal, Costa Rica',
    date: '2023-08-26',
    position: [10.1387, -85.7694],
    description: 'Surfing, lush jungles, and pura vida vibes.',
  },
  {
    id: 21,
    destination: 'Lima, Peru',
    date: '2023-11-11',
    position: [-12.0464, -77.0428],
    description: 'Tasted amazing Peruvian cuisine and explored historic downtown.',
  },
  {
    id: 22,
    destination: 'Cusco, Peru',
    date: '2023-11-14',
    position: [-13.5320, -71.9675],
    description: 'Gateway to Machu Picchu and rich Inca heritage.',
  },
  {
    id: 23,
    destination: 'Puerto Maldonado, Peru',
    date: '2023-11-19',
    position: [-12.5933, -69.1890],
    description: 'Amazon rainforest adventure with remarkable biodiversity.',
  },
  {
    id: 24,
    destination: 'Prague, Czech Republic',
    date: '2024-04-26',
    position: [50.0755, 14.4378],
    description: 'Admired medieval architecture and historic squares.',
  },
  {
    id: 25,
    destination: 'Munich, Germany',
    date: '2024-04-30',
    position: [48.1351, 11.5820],
    description: 'Bavarian culture, beer gardens, and a charming city center.',
  },
  {
    id: 26,
    destination: 'Killarney, Ireland',
    date: '2024-09-21',
    position: [52.0597, -9.5064],
    description: 'Explored the scenic lakes and mountains of County Kerry.',
  },
  {
    id: 27,
    destination: 'Galway, Ireland',
    date: '2024-09-24',
    position: [53.2707, -9.0568],
    description: 'Coastal city known for live music and a vibrant arts scene.',
  },
  {
    id: 28,
    destination: 'Dublin, Ireland',
    date: '2024-09-26',
    position: [53.3498, -6.2603],
    description: 'Second visit to Dublin, discovering more of its rich heritage.',
  },
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
