import React from 'react';
import { Box, Paper } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Typography } from '@mui/material';
import { Map as LeafletMap, LatLngExpression, Marker as LeafletMarker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Trip } from '../../TravelData';
import MapControls from './MapControls';
import CountryHighlighter from './CountryHighlighter';

interface MapSectionProps {
  trips: Trip[];
  activeTripId: number | null;
  visitedCountries: Set<string>;
  mapRef: React.RefObject<LeafletMap>;
  markerRefs: React.MutableRefObject<Record<number, LeafletMarker | null>>;
  mapCenter: LatLngExpression;
  initialZoom: number;
  onMarkerClick: (tripId: number) => void;
  onResetMap: () => void;
  onToggleSearch: () => void;
  isSearchVisible: boolean;
}

const MapSection: React.FC<MapSectionProps> = ({
  trips,
  visitedCountries,
  mapRef,
  markerRefs,
  mapCenter,
  initialZoom,
  onMarkerClick,
  onResetMap,
  onToggleSearch,
  isSearchVisible
}) => {
  return (
    <Box sx={{ flexShrink: 0, width: '100%' }}>
      <Paper sx={{ py: 0, my: 1 }}>
        <Box 
          sx={{
            position: 'relative',
            height: '45vh',
            width: '100%',
            zIndex: 10,
            py: 0,
          }}
        >
          <MapControls 
            onResetMap={onResetMap}
            onToggleSearch={onToggleSearch}
            isSearchVisible={isSearchVisible}
          />
          
          <MapContainer
            center={mapCenter}
            zoom={initialZoom}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef as any}
          >
            <CountryHighlighter visitedCountries={visitedCountries} />
            
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
                    onMarkerClick(trip.id);
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
    </Box>
  );
};

export default MapSection; 