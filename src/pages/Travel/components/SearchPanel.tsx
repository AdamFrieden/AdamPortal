import React, { useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  Button, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Collapse
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Trip } from '../../TravelData';

interface SearchPanelProps {
  isVisible: boolean;
  trips: Trip[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filteredTrips: Trip[];
  showSearchResults: boolean;
  onResultClick: (trip: Trip) => void;
}

const SearchPanel: React.FC<SearchPanelProps> = ({ 
  isVisible, 
  trips, 
  searchTerm,
  setSearchTerm,
  filteredTrips,
  showSearchResults,
  onResultClick 
}) => {
  // Create a ref for the input field
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input when panel becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isVisible]);

  return (
    <Collapse in={isVisible} timeout="auto">
      <Box 
        data-search-box
        sx={{ 
          position: 'relative', 
          zIndex: 1050, 
          py: 1, 
          width: '100%',
          boxShadow: 1,
          borderRadius: 1,
          mb: 1
        }}
      >
        <Box sx={{ pt: 1, px: 1 }}>
          <TextField
            fullWidth
            placeholder="Search destinations or countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <Button 
                    size="small" 
                    onClick={() => setSearchTerm('')}
                    sx={{ minWidth: 'unset', p: 0.5 }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 1 }}
            inputRef={inputRef}
          />
          <Collapse in={showSearchResults && filteredTrips.length > 0}>
            <Paper elevation={3} sx={{ maxHeight: '300px', overflow: 'auto', mt: 1, mb: 2 }}>
              <List dense>
                {filteredTrips.map(trip => (
                  <ListItem 
                    key={trip.id}
                    onClick={() => onResultClick(trip)}
                    sx={{ 
                      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                      '&:last-child': { borderBottom: 'none' },
                      cursor: 'pointer'
                    }}
                  >
                    <ListItemText
                      primary={trip.destination}
                      secondary={`${trip.country} - ${trip.date}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Collapse>
          {searchTerm && filteredTrips.length === 0 && showSearchResults && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
              No destinations found matching your search.
            </Typography>
          )}
        </Box>
      </Box>
    </Collapse>
  );
};

export default SearchPanel; 