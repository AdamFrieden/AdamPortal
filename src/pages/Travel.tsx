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
  country: string;
  date: string;
  position: LatLngExpression;
  description: string;
}

const trips: Trip[] = [
  {
    id: 1,
    destination: 'Auckland, New Zealand',
    country: 'New Zealand',
    date: '2015-03-19',
    position: [-36.8485, 174.7633],
    description: 'First trip to New Zealand, enjoyed scenic beaches and city life.',
  },
  {
    id: 2,
    destination: 'Amsterdam, The Netherlands',
    country: 'Netherlands',
    date: '2015-08-29',
    position: [52.3676, 4.9041],
    description: 'Explored the canals, museums, and vibrant city atmosphere.',
  },
  {
    id: 3,
    destination: 'Brussels, Belgium',
    country: 'Belgium',
    date: '2015-09-01',
    position: [50.8503, 4.3517],
    description: 'Enjoyed Belgian waffles, chocolate, and the famous Grand Place.',
  },
  {
    id: 4,
    destination: 'Paris, France',
    country: 'France',
    date: '2015-09-04',
    position: [48.8566, 2.3522],
    description: 'Visited the Eiffel Tower, the Louvre, and charming cafés.',
  },
  {
    id: 5,
    destination: 'Punta Cana, Dominican Republic',
    country: 'Dominican Republic',
    date: '2016-03-20',
    position: [18.5601, -68.3725],
    description: 'Relaxed on pristine beaches and enjoyed tropical weather.',
  },
  {
    id: 6,
    destination: 'New Orleans, USA',
    country: 'United States of America',
    date: '2016-05-06',
    position: [29.9511, -90.0715],
    description: 'Savored Creole cuisine, jazz music, and the French Quarter.',
  },
  {
    id: 7,
    destination: 'Orlando, USA',
    country: 'United States of America',
    date: '2016-09-30',
    position: [28.5383, -81.3792],
    description: 'Theme parks and endless sunshine in central Florida.',
  },
  {
    id: 8,
    destination: 'Miami, USA',
    country: 'United States of America',
    date: '2016-11-11',
    position: [25.7617, -80.1918],
    description: 'Beachfront skyline and vibrant nightlife in South Florida.',
  },
  {
    id: 9,
    destination: 'Las Vegas, USA',
    country: 'United States of America',
    date: '2016-12-07',
    position: [36.1699, -115.1398],
    description: 'The Entertainment Capital with dazzling shows and casinos.',
  },
  {
    id: 10,
    destination: 'Reykjavik, Iceland',
    country: 'Iceland',
    date: '2016-12-17',
    position: [64.1466, -21.9426],
    description: 'Chased the Northern Lights during the winter solstice.',
  },
  {
    id: 11,
    destination: 'Toronto, Canada',
    country: 'Canada',
    date: '2017-05-20',
    position: [43.6532, -79.3832],
    description: 'Enjoyed diverse neighborhoods, CN Tower, and Lake Ontario views.',
  },
  {
    id: 12,
    destination: 'Juneau, USA',
    country: 'United States of America',
    date: '2017-06-25',
    position: [58.3019, -134.4197],
    description: 'Alaska’s capital with stunning glaciers and mountainous terrain.',
  },
  {
    id: 13,
    destination: 'Skagway, USA',
    country: 'United States of America',
    date: '2017-06-26',
    position: [59.4583, -135.3139],
    description: 'Gateway to the Klondike Gold Rush with historic charm.',
  },
  {
    id: 14,
    destination: 'Icy Strait, USA',
    country: 'United States of America',
    date: '2017-06-27',
    position: [58.1336, -135.4437],
    description: 'Remote Alaskan inlet near Hoonah, rich in Native culture.',
  },
  {
    id: 15,
    destination: 'Ketchikan, USA',
    country: 'United States of America',
    date: '2017-06-28',
    position: [55.3422, -131.6461],
    description: 'Salmon capital of the world with rich Tlingit heritage.',
  },
  {
    id: 16,
    destination: 'Vancouver, Canada',
    country: 'Canada',
    date: '2017-06-30',
    position: [49.2827, -123.1207],
    description: 'Coastal seaport city surrounded by mountains and ocean.',
  },
  {
    id: 17,
    destination: 'Portland, USA',
    country: 'United States of America',
    date: '2017-07-01',
    position: [45.5051, -122.6750],
    description: 'Known for its food trucks, breweries, and “Keep Portland Weird.”',
  },
  {
    id: 18,
    destination: 'Sutton, Canada',
    country: 'Canada',
    date: '2017-07-20',
    position: [45.1092, -72.6084],
    description: 'Charming Quebec town near scenic mountains and vineyards.',
  },
  {
    id: 19,
    destination: 'Cincinnati, USA',
    country: 'United States of America',
    date: '2017-09-08',
    position: [39.1031, -84.5120],
    description: 'Historic Over-the-Rhine district and famous chili scene.',
  },
  {
    id: 20,
    destination: 'Dublin, Ireland',
    country: 'Ireland',
    date: '2017-11-04',
    position: [53.3498, -6.2603],
    description: 'Toured historic pubs and soaked in the city’s literary heritage.',
  },
  {
    id: 21,
    destination: 'Cape Town, South Africa',
    country: 'South Africa',
    date: '2018-02-18',
    position: [-33.9249, 18.4241],
    description: 'Saw Table Mountain, the Cape Peninsula, and local vineyards.',
  },
  {
    id: 22,
    destination: 'Mbabane, Swaziland',
    // Officially eSwatini; recognized in OSM as "Eswatini".
    country: 'Eswatini',
    date: '2018-02-23',
    position: [-26.3055, 31.1367],
    description: 'Visited the mountainous capital of eSwatini (formerly Swaziland).',
  },
  {
    id: 23,
    destination: 'Johannesburg, South Africa',
    country: 'South Africa',
    date: '2018-02-26',
    position: [-26.2041, 28.0473],
    description: 'Explored the largest city in South Africa and cultural hubs.',
  },
  {
    id: 24,
    destination: 'Nea Moudania, Greece',
    country: 'Greece',
    date: '2018-06-18',
    position: [40.2443, 23.2830],
    description: 'Enjoyed the beaches and fresh seafood on the Chalkidiki peninsula.',
  },
  {
    id: 25,
    destination: 'San Diego, USA',
    country: 'United States of America',
    date: '2018-12-04',
    position: [32.7157, -117.1611],
    description: 'Known for its zoo, beaches, and near-perfect weather.',
  },
  {
    id: 26,
    destination: 'Los Angeles, USA',
    country: 'United States of America',
    date: '2018-12-07',
    position: [34.0522, -118.2437],
    description: 'Hollywood, Santa Monica, and countless cultural neighborhoods.',
  },
  {
    id: 27,
    destination: 'Madrid, Spain',
    country: 'Spain',
    date: '2019-08-30',
    position: [40.4168, -3.7038],
    description: 'Experienced the capital’s art museums, parks, and tapas scene.',
  },
  {
    id: 28,
    destination: 'Barcelona, Spain',
    country: 'Spain',
    date: '2019-09-03',
    position: [41.3851, 2.1734],
    description: 'Admired Gaudí’s architecture and lively Catalan culture.',
  },
  {
    id: 29,
    destination: 'Honolulu, USA',
    country: 'United States of America',
    date: '2019-11-09',
    position: [21.3069, -157.8583],
    description: 'Capital of Hawaii, famed Waikiki Beach, and historic Pearl Harbor.',
  },
  {
    id: 30,
    destination: 'Maui, USA',
    country: 'United States of America',
    date: '2019-11-13',
    position: [20.7984, -156.3319],
    description: 'Beautiful beaches and scenic Road to Hana.',
  },
  {
    id: 31,
    destination: 'Hilo, USA',
    country: 'United States of America',
    date: '2019-11-18',
    position: [19.7297, -155.0907],
    description: 'Gateway to Volcanoes National Park and lush rainforests.',
  },
  {
    id: 32,
    destination: 'Miami, USA',
    country: 'United States of America',
    date: '2020-02-01',
    position: [25.7617, -80.1918],
    description: 'Beachfront skyline and vibrant nightlife in South Florida.',
  },
  {
    id: 33,
    destination: 'Denver, USA',
    country: 'United States of America',
    date: '2020-03-06',
    position: [39.7392, -104.9903],
    description: 'Mile-High City with Rocky Mountain views and craft breweries.',
  },
  {
    id: 34,
    destination: 'Columbia Falls, USA',
    country: 'United States of America',
    date: '2021-08-09',
    position: [48.3700, -114.1819],
    description: 'Gateway to Glacier National Park in Montana.',
  },
  {
    id: 35,
    destination: 'Noord, Aruba',
    country: 'Aruba',
    date: '2021-09-07',
    position: [12.5643, -70.0270],
    description: 'Relaxed in the Caribbean sunshine and explored local beaches.',
  },
  {
    id: 36,
    destination: 'San Diego, USA',
    country: 'United States of America',
    date: '2021-11-06',
    position: [32.7157, -117.1611],
    description: 'Return to San Diego for its sunny beaches and attractions.',
  },
  {
    id: 37,
    destination: 'Tucson, USA',
    country: 'United States of America',
    date: '2021-11-10',
    position: [32.2226, -110.9747],
    description: 'Desert city surrounded by scenic mountains and saguaro cacti.',
  },
  {
    id: 38,
    destination: 'Phoenix, USA',
    country: 'United States of America',
    date: '2021-11-14',
    position: [33.4484, -112.0740],
    description: 'Explored the Valley of the Sun with cultural and outdoor highlights.',
  },
  {
    id: 39,
    destination: 'Big Sky, USA',
    country: 'United States of America',
    date: '2022-02-02',
    position: [45.2850, -111.4014],
    description: 'Winter sports haven in the mountains of Montana.',
  },
  {
    id: 40,
    destination: 'Los Angeles, USA',
    country: 'United States of America',
    date: '2022-02-10',
    position: [34.0522, -118.2437],
    description: 'Another LA trip for Hollywood highlights and sun-soaked beaches.',
  },
  {
    id: 41,
    destination: 'Salt Lake City, USA',
    country: 'United States of America',
    date: '2022-02-28',
    position: [40.7608, -111.8910],
    description: 'Surrounded by mountains, home to Temple Square and ski resorts.',
  },
  {
    id: 42,
    destination: 'Playa del Carmen, Mexico',
    country: 'Mexico',
    date: '2022-08-23',
    position: [20.6274, -87.0799],
    description: 'Enjoyed vibrant nightlife, beaches, and nearby Mayan ruins.',
  },
  {
    id: 43,
    destination: 'Bangkok, Thailand',
    country: 'Thailand',
    date: '2022-11-26',
    position: [13.7563, 100.5018],
    description: 'Explored bustling markets and iconic temples.',
  },
  {
    id: 44,
    destination: 'Chiang Mai, Thailand',
    country: 'Thailand',
    date: '2022-11-29',
    position: [18.7061, 98.9817],
    description: 'Visited lush mountains and historic temples in northern Thailand.',
  },
  {
    id: 45,
    destination: 'Koh Phi Phi, Thailand',
    country: 'Thailand',
    date: '2022-12-03',
    position: [7.7396, 98.7784],
    description: 'Enjoyed crystal-clear waters and island nightlife.',
  },
  {
    id: 46,
    destination: 'Railay Beach, Thailand',
    country: 'Thailand',
    date: '2022-12-06',
    position: [8.0071, 98.8388],
    description: 'Rock climbing paradise with stunning limestone cliffs.',
  },
  {
    id: 47,
    destination: 'Salt Lake City, USA',
    country: 'United States of America',
    date: '2023-03-15',
    position: [40.7608, -111.8910],
    description: 'Return visit for more skiing, hiking, and city exploration.',
  },
  {
    id: 48,
    destination: 'Denver, USA',
    country: 'United States of America',
    date: '2023-04-05',
    position: [39.7392, -104.9903],
    description: 'Another Mile-High City adventure in the shadow of the Rockies.',
  },
  {
    id: 49,
    destination: 'Playa Junquillal, Costa Rica',
    country: 'Costa Rica',
    date: '2023-08-26',
    position: [10.1387, -85.7694],
    description: 'Surfing, lush jungles, and pura vida vibes.',
  },
  {
    id: 50,
    destination: 'Lima, Peru',
    country: 'Peru',
    date: '2023-11-11',
    position: [-12.0464, -77.0428],
    description: 'Tasted amazing Peruvian cuisine and explored historic downtown.',
  },
  {
    id: 51,
    destination: 'Cusco, Peru',
    country: 'Peru',
    date: '2023-11-14',
    position: [-13.5320, -71.9675],
    description: 'Gateway to Machu Picchu and rich Inca heritage.',
  },
  {
    id: 52,
    destination: 'Puerto Maldonado, Peru',
    country: 'Peru',
    date: '2023-11-19',
    position: [-12.5933, -69.1890],
    description: 'Amazon rainforest adventure with remarkable biodiversity.',
  },
  {
    id: 53,
    destination: 'Steamboat Springs, USA',
    country: 'United States of America',
    date: '2024-03-06',
    position: [40.4848, -106.8317],
    description: 'Famous for Champagne Powder skiing and hot springs.',
  },
  {
    id: 54,
    destination: 'Salt Lake City, USA',
    country: 'United States of America',
    date: '2024-03-20',
    position: [40.7608, -111.8910],
    description: 'Third trip to SLC, exploring new neighborhoods and ski resorts.',
  },
  {
    id: 55,
    destination: 'Prague, Czech Republic',
    // OSM often uses "Czechia" as the name, but "Czech Republic" is also recognized.
    country: 'Czechia',
    date: '2024-04-26',
    position: [50.0755, 14.4378],
    description: 'Admired medieval architecture and historic squares.',
  },
  {
    id: 56,
    destination: 'Munich, Germany',
    country: 'Germany',
    date: '2024-04-30',
    position: [48.1351, 11.5820],
    description: 'Bavarian culture, beer gardens, and a charming city center.',
  },
  {
    id: 57,
    destination: 'Cincinnati, USA',
    country: 'United States of America',
    date: '2024-09-07',
    position: [39.1031, -84.5120],
    description: 'Yet another Cincinnati visit, enjoying local fare and history.',
  },
  {
    id: 58,
    destination: 'Killarney, Ireland',
    country: 'Ireland',
    date: '2024-09-21',
    position: [52.0597, -9.5064],
    description: 'Explored the scenic lakes and mountains of County Kerry.',
  },
  {
    id: 59,
    destination: 'Galway, Ireland',
    country: 'Ireland',
    date: '2024-09-24',
    position: [53.2707, -9.0568],
    description: 'Coastal city known for live music and a vibrant arts scene.',
  },
  {
    id: 60,
    destination: 'Dublin, Ireland',
    country: 'Ireland',
    date: '2024-09-26',
    position: [53.3498, -6.2603],
    description: 'Second visit to Dublin, discovering more of its rich heritage.',
  },
];

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
